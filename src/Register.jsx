import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  function getUsers() {
    return JSON.parse(localStorage.getItem("bf_users") || "[]");
  }

  function saveUsers(users) {
    localStorage.setItem("bf_users", JSON.stringify(users));
  }

  const handleRegister = () => {
    setShowError(true);

    const emailValid = isEmailValid(email);
    const passwordValid = password.length >= 8;

    if (!email || !password || !emailValid || !passwordValid) {
      setMessage(" Validation error");
      return;
    }

    let users = getUsers();
    const exists = users.find((u) => u.email === email);
    if (exists) {
      setMessage(" Email already registered");
      return;
    }

    
    users.push({ email, password });
    saveUsers(users);

    setMessage(" Registration successful!");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-amber-100 rounded-xl p-6">

        <h1 className="font-bold text-2xl text-center">Register</h1>
        <div className="p-10 grid gap-3">
          <div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-72 h-8 border border-amber-400 px-3"
              required
            />
          </div>
          {showError && !email && (
            <p className="text-red-400">Please enter your email</p>
          )}
          {showError && email && !isEmailValid(email) && (
            <p className="text-red-400">Please enter a valid email</p>
          )}

          <div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password (min 8 chars)"
              className="w-72 h-8 border border-amber-400 px-3"
              required
            />
          </div>
          {showError && !password && (
            <p className="text-red-400">Please enter your password</p>
          )}
          {showError && password && password.length < 8 && (
            <p className="text-red-400">must be at least 8 characters</p>
          )}

          {message && <p className="text-center text-sm">{message}</p>}

          <button
            onClick={handleRegister}
            className="h-10 bg-green-600 text-white rounded-lg"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
