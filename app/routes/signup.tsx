import { SignUp } from "@clerk/clerk-react";

export default function SignUpRoute() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <SignUp />
    </main>
  );
}
