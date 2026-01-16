import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // For now, we just set a dummy token
    localStorage.setItem("token", "dummy-token");
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl mb-6">Login</h1>
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-blue-500 rounded hover:bg-blue-600"
      >
        Login
      </button>
    </div>
  );
}
