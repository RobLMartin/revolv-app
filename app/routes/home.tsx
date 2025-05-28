import type { Route } from "./+types/home";
import type { LoaderFunctionArgs } from "react-router";
import { Link, useLoaderData } from "react-router";
import {
  SignedIn,
  SignedOut,
  SignOutButton,
} from "@clerk/clerk-react";
import { Button } from "../components/ui/button";
import { Card } from "../ui/card";
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

  const curated = [
    {
      id: "jazz",
      title: "Jazz Essentials",
      image: "https://placehold.co/300x300?text=Jazz",
    },
    {
      id: "rock",
      title: "Classic Rock Gems",
      image: "https://placehold.co/300x300?text=Rock",
    },
    {
      id: "soul",
      title: "Soul Deep Cuts",
      image: "https://placehold.co/300x300?text=Soul",
    },
  ];

  return (
    <main className="container max-w-6xl space-y-10 py-10">
      <section className="space-y-4 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight">Find Your Next Spin</h1>
        <p className="text-gray-600">Curated selections from collectors around the world.</p>
        <Link to="/app/records">
          <Button>Browse Records</Button>
        </Link>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-center">Trending Records</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {records.map((record) => (
            <Card key={record.id} className="space-y-2 text-center">
              <img
                src={record.cover}
                alt={`${record.title} cover`}
                className="rounded-md"
              />
              <p className="font-medium">{record.title}</p>
              <p className="text-sm text-gray-600">{record.artist}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-center">Curated Collections</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {curated.map((c) => (
            <Card key={c.id} className="space-y-2 text-center">
              <img src={c.image} alt={c.title} className="rounded-md" />
              <p className="font-medium">{c.title}</p>
            </Card>
          ))}
        </div>
      </section>

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
