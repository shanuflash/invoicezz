"use client";
import { useState } from "react";

function App() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user, password);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>USER ID:</label>

      <input
        type="text"
        placeholder="User Id"
        onChange={(e) => setUser(e.target.value)}
        required
      />
      <label>PASSWORD:</label>

      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Log In</button>
    </form>
  );
}

export default App;
