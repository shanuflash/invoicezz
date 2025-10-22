"use client";
import { useState } from "react";
import styles from "@/styles/page.module.css";
import { useRouter } from "next/navigation";

function App() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Auth is disabled - login page kept for reference only
    alert("Authentication is disabled. This app is now public.");
    router.push("/");
  };
  return (
    <form className={styles["form"]} onSubmit={handleSubmit}>
      <div className={styles["form-item"]}>
        <label>Email:</label>
        <input
          type="text"
          placeholder="User Id"
          onChange={(e) => setUser(e.target.value)}
          required
        />
      </div>
      <div className={styles["form-item"]}>
        <label>Password:</label>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Log In</button>
    </form>
  );
}

export default App;
