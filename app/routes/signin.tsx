import { SignIn } from "@clerk/clerk-react";

export default function SignInRoute() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <SignIn />
    </main>
  );
}
