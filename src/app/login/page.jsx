"use client";
import { useState } from "react";
import styles from "@/styles/page.module.css";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

function App() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createClientComponentClient();
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: user,
      password: password,
    });
    if (error) console.log(error);
    else router.push("/");
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
