import { SignIn } from "@clerk/clerk-react";

export default function SignInRoute() {
  return (
    <main className="flex min-h-[calc(100vh_-_56px)] items-center justify-center p-6">
      <SignIn />
    </main>
  );
}
