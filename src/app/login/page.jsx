"use client";
import Link from "next/link";

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center max-w-sm mx-auto p-6">
        <h2 className="text-lg font-semibold text-zinc-900 mb-2">Login Disabled</h2>
        <p className="text-sm text-zinc-500 mb-6">
          This is a public version. No login required.
        </p>
        <Link href="/" className="btn btn-primary">
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default Login;
