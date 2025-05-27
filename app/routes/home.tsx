import type { Route } from "./+types/home";
import type { LoaderFunctionArgs } from "react-router";
import { Link, useLoaderData } from "react-router";
import {
  SignedIn,
  SignedOut,
  SignOutButton,
} from "@clerk/clerk-react";
import { Button } from "../components/ui/button";
import type { Record } from "../data/records";
import { records as sampleRecords } from "../data/records";

export async function loader({}: LoaderFunctionArgs) {
  return { records: sampleRecords };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Revolv" },
    { name: "description", content: "Buy and sell vinyl records" },
  ];
}

export default function Home() {
  const { records } = useLoaderData() as { records: Record[] };

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Explore Records</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {records.map((record) => (
          <div key={record.id} className="space-y-2 text-center">
            <img
              src={record.cover}
              alt={`${record.title} cover`}
              className="rounded-md shadow"
            />
            <p className="font-medium">{record.title}</p>
            <p className="text-sm text-gray-600">{record.artist}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center space-x-4">
        <SignedOut>
          <Link to="/signin">
            <Button>Sign In to Buy or Sell</Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <SignOutButton />
        </SignedIn>
      </div>
    </main>
  );
}
