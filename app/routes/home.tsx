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
    <main className="container max-w-6xl space-y-8 py-10">
      <h1 className="text-4xl font-bold tracking-tight text-center">
        Explore Records
      </h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {records.map((record) => (
          <div
            key={record.id}
            className="space-y-2 text-center rounded-lg border bg-white p-4 shadow"
          >
            <img
              src={record.cover}
              alt={`${record.title} cover`}
              className="rounded-md"
            />
            <p className="font-medium">{record.title}</p>
            <p className="text-sm text-gray-600">{record.artist}</p>
          </div>
        ))}
      </div>
      <div className="text-center space-x-4">
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
