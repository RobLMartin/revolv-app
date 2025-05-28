import { SignUp } from "@clerk/clerk-react";

export default function SignUpRoute() {
  return (
    <main className="flex min-h-[calc(100vh_-_56px)] items-center justify-center p-6">
      <SignUp />
    </main>
  );
}
