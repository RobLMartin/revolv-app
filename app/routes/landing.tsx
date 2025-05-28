import { Link } from "react-router";
import { Button } from "../components/ui/button";

export default function Landing() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center space-y-6 p-6 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight">Welcome to Revolv</h1>
      <p className="max-w-md text-gray-600">
        Buy and sell vinyl records from collectors around the world.
      </p>
      <div className="space-x-4">
        <Link to="/signin">
          <Button>Sign In</Button>
        </Link>
        <Link to="/signup">
          <Button>Sign Up</Button>
        </Link>
      </div>
    </main>
  );
}
