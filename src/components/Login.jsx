import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch user tasks from a local JSON file or backend
      fetch('/path/to/user-tasks.json')
        .then(response => response.json())
        .then(data => setTasks(data))
        .catch(error => console.error('Error fetching tasks:', error));
    }
  }, [isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginWithRedirect({
      redirectUri: window.location.origin,
      appState: {
        targetUrl: window.location.pathname
      }
    });
  };

  return (
    <div className="flex justify-center w-[70%] mx-auto mt-10 min-h-screen">
      <div className="flex flex-col items-center space-y-12">
        {isAuthenticated && (
          <div className="flex flex-col items-center">
            <img className="user-photo h-10 w-10 rounded-full" src={user.picture} alt={user.name} />
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <div className="mt-4">
              <h2 className="text-2xl font-bold">Your Tasks</h2>
              <ul className="mt-2">
                {tasks.map((task, index) => (
                  <li key={index} className="text-lg">
                    {task.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {!isAuthenticated && (
          <p className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-700 text-transparent bg-clip-text my-8 text-center">
            <h1>Welcome to TaskiFy!</h1> Please log in to manage your tasks efficiently.
          </p>
        )}
        {isAuthenticated ? (
          <button
            className="user-logout py-2 px-4 border rounded-md text-white focus:bg-gray-500"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </button>
        ) : (
          <button
            className="login-button py-2 px-4 border rounded-md text-white focus:bg-gray-500"
            onClick={() => loginWithRedirect()}
          >
            Log In
          </button>
        )}
        <form onSubmit={handleSubmit}></form>
      </div>
    </div>
  );
};

export default Login;