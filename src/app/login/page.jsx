"use client";
import Link from "next/link";

function Login() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-xs">
        <h2 className="text-lg font-semibold text-zinc-900 mb-1.5">Login Disabled</h2>
        <p className="text-[13px] text-zinc-500 mb-5">
          Auth is disabled for this demo. All features are publicly accessible.
        </p>
        <Link href="/" className="btn btn-primary text-[13px]">
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default Login;
