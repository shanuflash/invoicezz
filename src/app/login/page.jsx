"use client";
import Link from "next/link";

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center max-w-md mx-auto p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Login Disabled</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          This app has been converted to a public version. 
          No login is required - everyone can access all features directly!
        </p>
        <Link 
          href="/" 
          className="btn btn-primary inline-block"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default Login;
