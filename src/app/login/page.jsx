"use client";
import styles from "@/styles/page.module.css";
import Link from "next/link";

function App() {
  
  return (
    <div className={styles["form"]}>
      <div style={{ 
        padding: "2rem", 
        textAlign: "center",
        maxWidth: "500px",
        margin: "0 auto"
      }}>
        <h2 style={{ marginBottom: "1rem" }}>Login Disabled</h2>
        <p style={{ marginBottom: "2rem", lineHeight: "1.6" }}>
          This app has been converted to a public version. 
          No login is required - everyone can access all features directly!
        </p>
        <Link href="/" style={{
          padding: "0.75rem 2rem",
          background: "#0070f3",
          color: "white",
          borderRadius: "5px",
          textDecoration: "none",
          display: "inline-block"
        }}>
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default App;
