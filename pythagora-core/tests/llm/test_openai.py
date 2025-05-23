from unittest.mock import AsyncMock, MagicMock, call, patch

import openai
import pytest

from core.config import LLMConfig
from core.llm.base import APIError
from core.llm.convo import Convo
from core.llm.openai_client import OpenAIClient
from core.state.state_manager import StateManager


async def mock_response_generator(*content):
    for item in content:
        chunk = MagicMock()
        chunk.choices = [MagicMock(delta=MagicMock(content=item))]
        yield chunk


@pytest.mark.asyncio
@patch("core.cli.helpers.StateManager")
@patch("core.llm.openai_client.AsyncOpenAI")
async def test_openai_calls_gpt(mock_AsyncOpenAI, mock_state_manager):
    cfg = LLMConfig(model="gpt-4-turbo")
    convo = Convo("system hello").user("user hello")

    # Create AsyncMock for the chat.completions.create method
    stream = AsyncMock(return_value=mock_response_generator("hello", None, "world"))

    # Set up the complete mock chain
    mock_chat = AsyncMock()
    mock_completions = AsyncMock()
    mock_completions.create = stream
    mock_chat.completions = mock_completions

    # Configure the AsyncOpenAI mock
    mock_client = AsyncMock()
    mock_client.chat = mock_chat
    mock_AsyncOpenAI.return_value = mock_client

    sm = StateManager(mock_state_manager)
    llm = OpenAIClient(cfg, state_manager=sm)
    response, req_log = await llm(convo, json_mode=True)
    assert response == "helloworld"

    assert req_log.model == cfg.model
    assert req_log.provider == cfg.provider
    assert req_log.temperature == cfg.temperature
    assert req_log.response == response
    assert req_log.status == "success"

    stream.assert_awaited_once_with(
        model="gpt-4-turbo",
        messages=[
            {"role": "system", "content": "system hello"},
            {"role": "user", "content": "user hello"},
        ],
        temperature=0.5,
        stream=True,
        stream_options={"include_usage": True},
        response_format={"type": "json_object"},
    )


@pytest.mark.asyncio
@patch("core.cli.helpers.StateManager")
@patch("core.llm.openai_client.AsyncOpenAI")
async def test_openai_stream_handler(mock_AsyncOpenAI, mock_state_manager):
    cfg = LLMConfig(model="gpt-4-turbo")
    convo = Convo("system hello").user("user hello")

    stream_handler = AsyncMock()

    # Create AsyncMock for the chat.completions.create method
    stream = AsyncMock(return_value=mock_response_generator("hello", None, "world"))

    # Set up the complete mock chain
    mock_chat = AsyncMock()
    mock_completions = AsyncMock()
    mock_completions.create = stream
    mock_chat.completions = mock_completions

    # Configure the AsyncOpenAI mock
    mock_client = AsyncMock()
    mock_client.chat = mock_chat
    mock_AsyncOpenAI.return_value = mock_client

    sm = StateManager(mock_state_manager)
    llm = OpenAIClient(cfg, stream_handler=stream_handler, state_manager=sm)
    await llm(convo)

    stream_handler.assert_has_awaits([call("hello"), call("world")])


@pytest.mark.asyncio
@patch("core.cli.helpers.StateManager")
@patch("core.llm.openai_client.AsyncOpenAI")
async def test_openai_parser_with_retries(mock_AsyncOpenAI, mock_state_manager):
    cfg = LLMConfig(model="gpt-4-turbo")
    convo = Convo("system").user("user")

    parser = MagicMock()
    parser.side_effect = [ValueError("Try again"), "world"]

    # Create AsyncMock for the chat.completions.create method with side effects
    stream = AsyncMock(
        side_effect=[
            mock_response_generator("hello"),
            mock_response_generator("world"),
        ]
    )

    # Set up the complete mock chain
    mock_chat = AsyncMock()
    mock_completions = AsyncMock()
    mock_completions.create = stream
    mock_chat.completions = mock_completions

    # Configure the AsyncOpenAI mock
    mock_client = AsyncMock()
    mock_client.chat = mock_chat
    mock_AsyncOpenAI.return_value = mock_client

    # Create StateManager instance
    sm = StateManager(mock_state_manager)
    llm = OpenAIClient(cfg, state_manager=sm)
    response, req_log = await llm(convo, parser=parser)

    assert response == "world"
    assert stream.await_count == 2
    assert req_log.status == "success"

    assert req_log.messages == [
        {"role": "system", "content": "system"},
        {"role": "user", "content": "user"},
        {"role": "assistant", "content": "hello"},
        {
            "role": "user",
            "content": "Error parsing response: Try again. Please output your response EXACTLY as requested.",
        },
    ]


@pytest.mark.asyncio
@patch("core.cli.helpers.StateManager")
@patch("core.llm.openai_client.AsyncOpenAI")
async def test_openai_parser_fails(mock_AsyncOpenAI, mock_state_manager):
    cfg = LLMConfig(model="gpt-4-turbo")
    convo = Convo("system").user("user")

    parser = MagicMock()
    parser.side_effect = [ValueError("Try again")]

    # Create AsyncMock for the chat.completions.create method
    stream = AsyncMock(return_value=mock_response_generator("hello"))

    # Set up the complete mock chain
    mock_chat = AsyncMock()
    mock_completions = AsyncMock()
    mock_completions.create = stream
    mock_chat.completions = mock_completions

    # Configure the AsyncOpenAI mock
    mock_client = AsyncMock()
    mock_client.chat = mock_chat
    mock_AsyncOpenAI.return_value = mock_client

    # Create state manager
    sm = StateManager(mock_state_manager)
    llm = OpenAIClient(cfg, state_manager=sm)

    with pytest.raises(APIError, match="Error parsing response"):
        await llm(convo, parser=parser, max_retries=1)


@pytest.mark.asyncio
@patch("core.cli.helpers.StateManager")
@patch("core.llm.openai_client.AsyncOpenAI")
async def test_openai_error_handler_success(mock_AsyncOpenAI, mock_state_manager):
    """
    Test that LLM client auto-retries up to max_retries, then calls
    the error handler to decide what next.
    """
    cfg = LLMConfig(model="gpt-4-turbo")
    convo = Convo("system hello").user("user hello")

    expected_errors = [
        "Error connecting to the LLM: API connection error: second",
        "Error connecting to the LLM: LLM had an error processing our request: fourth",
    ]

    async def error_handler(error, message):
        assert message == expected_errors.pop(0)
        return True

    # Set up the complete mock chain
    mock_chat = AsyncMock()
    mock_completions = AsyncMock()
    mock_chat.completions = mock_completions

    # Configure the AsyncOpenAI mock
    mock_client = AsyncMock()
    mock_client.chat = mock_chat
    mock_AsyncOpenAI.return_value = mock_client

    # Create StateManager instance
    sm = StateManager(mock_state_manager)

    llm = OpenAIClient(cfg, error_handler=error_handler, state_manager=sm)
    llm._make_request = AsyncMock(
        side_effect=[
            openai.APIConnectionError(message="first", request=None),  # auto-retried
            openai.APIConnectionError(message="second", request=None),  # defer to error handler
            openai.APIError("third", None, body=None),  # auto-retried
            openai.APIError("fourth", None, body=None),  # defer to error handler
            ("Hello", 0, 0),  # success
        ]
    )
    response, _ = await llm(convo, max_retries=2)
    assert response == "Hello"


@pytest.mark.asyncio
@patch("core.cli.helpers.StateManager")
@patch("core.llm.openai_client.AsyncOpenAI")
async def test_openai_error_handler_failure(mock_AsyncOpenAI, mock_state_manager):
    """
    Test that LLM client raises an API error if error handler decides
    not to retry.
    """
    cfg = LLMConfig(model="gpt-4-turbo")
    convo = Convo("system hello").user("user hello")

    # Set up error handler mock
    error_handler = AsyncMock(return_value=False)

    # Set up the complete mock chain
    mock_chat = AsyncMock()
    mock_completions = AsyncMock()
    mock_completions.create = AsyncMock(side_effect=[openai.APIError("test error", None, body=None)])
    mock_chat.completions = mock_completions

    # Configure the AsyncOpenAI mock
    mock_client = AsyncMock()
    mock_client.chat = mock_chat
    mock_AsyncOpenAI.return_value = mock_client

    # Create state manager
    sm = StateManager(mock_state_manager)

    llm = OpenAIClient(cfg, error_handler=error_handler, state_manager=sm)

    with pytest.raises(APIError, match="test error"):
        await llm(convo, max_retries=1)

    error_handler.assert_awaited_once()


@pytest.mark.parametrize(
    ("remaining_tokens", "reset_tokens", "reset_requests", "expected"),
    [
        (0, "1h1m1s", "", 3661),
        (0, "1h1s", "", 3601),
        (0, "1m", "", 60),
        (0, "", "1h1m1s", 0),
        (1, "", "1h1m1s", 3661),
    ],
)
@patch("core.cli.helpers.StateManager")
@patch("core.llm.openai_client.AsyncOpenAI")
def test_openai_rate_limit_parser(
    mock_AsyncOpenAI, mock_state_manager, remaining_tokens, reset_tokens, reset_requests, expected
):
    headers = {
        "x-ratelimit-remaining-tokens": remaining_tokens,
        "x-ratelimit-reset-tokens": reset_tokens,
        "x-ratelimit-reset-requests": reset_requests,
    }
    err = MagicMock(response=MagicMock(headers=headers))

    sm = StateManager(mock_state_manager)
    llm = OpenAIClient(LLMConfig(model="gpt-4"), state_manager=sm)
    assert int(llm.rate_limit_sleep(err).total_seconds()) == expected
