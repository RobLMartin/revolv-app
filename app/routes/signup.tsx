import { SignUp } from "@clerk/clerk-react";

export default function SignUpRoute() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <SignUp />
    </main>
  );
}
