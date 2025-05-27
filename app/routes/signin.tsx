import { SignIn } from "@clerk/clerk-react";

export default function SignInRoute() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <SignIn />
    </main>
  );
}
