import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import video1 from "../assets/video1.mp4";

const Login = () => {
  const { loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently, user, isLoading, error } = useAuth0();
  const [tasks, setTasks] = useState([]);

  console.log("isLoading:", isLoading);
  console.log("isAuthenticated:", isAuthenticated);
  console.log("user:", user);
  console.log("error:", error);

  useEffect(() => {
    const restoreSession = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          console.log("Restored Token:", token);
        } catch (error) {
          console.error("Session Restoration Error:", error);
        }
      }
    };
    restoreSession();
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) {
    return <div className="text-center text-xl font-semibold mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl font-semibold mt-10 text-red-600">Error: {error.message}</div>;
  }

  return (
    <div className="flex justify-center w-[70%] mx-auto mt-10 min-h-screen">
      <div className="flex flex-col items-center space-y-12">
        {isAuthenticated ? (
          <div className="flex flex-col items-center">
            <img className="user-photo h-10 w-10 rounded-full" src={user?.picture} alt={user?.name} />
            <h3 className="text-lg font-semibold">{user?.name}</h3>
            <div className="mt-4">
              <h2 className="text-2xl font-bold">Your Tasks</h2>
              <ul className="mt-2">
                {tasks.length > 0 ? (
                  tasks.map((task, index) => <li key={index} className="text-lg">{task.title}</li>)
                ) : (
                  <p className="text-gray-500">No tasks available.</p>
                )}
              </ul>
            </div>
            <button
              className="py-2 px-4 border rounded-md text-white bg-red-500 hover:bg-red-700 transition"
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            >
              Log Out
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-700 text-transparent bg-clip-text my-8 text-center">
              Welcome to TaskiFy!
            </h1>
            <p className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text text-center">
              Please log in to manage your tasks efficiently.
            </p>
            <video
              autoPlay
              loop
              muted
              className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-1 my-1"
            >
              <source src={video1} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button onClick={() => loginWithRedirect()} className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-800">
              Log In
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;