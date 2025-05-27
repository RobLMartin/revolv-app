import {
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import { useLoaderData, Form } from "react-router";
import type { Route } from "./+types/vendors.$vendorId";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { json } from "node:stream/consumers";

interface RecordType {
  id: string;
  title: string;
  artist: string;
  price: number;
  cover: string;
}

interface Vendor {
  id: string;
  name: string;
  description: string;
  records: RecordType[];
}

const vendors: Record<string, Vendor> = {
  "vinyl-dreams": {
    id: "vinyl-dreams",
    name: "Vinyl Dreams",
    description: "Hand-picked vintage records from around the world.",
    records: [
      {
        id: "1",
        title: "Kind of Blue",
        artist: "Miles Davis",
        price: 25,
        cover: "https://via.placeholder.com/300x300.png?text=Kind+of+Blue",
      },
      {
        id: "2",
        title: "Abbey Road",
        artist: "The Beatles",
        price: 30,
        cover: "https://via.placeholder.com/300x300.png?text=Abbey+Road",
      },
      {
        id: "3",
        title: "Rumours",
        artist: "Fleetwood Mac",
        price: 28,
        cover: "https://via.placeholder.com/300x300.png?text=Rumours",
      },
    ],
  },
};

export async function loader({ params }: LoaderFunctionArgs) {
  const vendor = vendors[params.vendorId ?? ""];
  if (!vendor) {
    throw new Response("Not Found", { status: 404 });
  }
  return { vendor };
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const recordId = formData.get("recordId");
  if (typeof recordId !== "string") {
    return { error: "Invalid" };
  }
  // Normally we'd update the database here
  console.log(`Vendor ${params.vendorId} - liked record ${recordId}`);
  return redirect(`./${params.vendorId}?liked=${recordId}`);
}

export default function VendorStorefront() {
  const { vendor } = useLoaderData() as { vendor: Vendor };
  return (
    <main className="container mx-auto px-4 py-10 space-y-8">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">{vendor.name}</h1>
        <p className="text-gray-600 dark:text-gray-300 mx-auto max-w-xl">
          {vendor.description}
        </p>
      </header>
      <section className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
        {vendor.records.map((record) => (
          <Card
            key={record.id}
            className="flex flex-col items-center text-center gap-4"
          >
            <img
              src={record.cover}
              alt={record.title}
              className="w-full h-auto rounded-md"
            />
            <div className="space-y-1">
              <h3 className="font-semibold text-lg leading-none">
                {record.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {record.artist}
              </p>
              <p className="text-sm font-medium">${record.price.toFixed(2)}</p>
            </div>
            <Form method="post" replace className="mt-auto">
              <input type="hidden" name="recordId" value={record.id} />
              <Button type="submit" variant="outline">
                Favorite
              </Button>
            </Form>
          </Card>
        ))}
      </section>
    </main>
  );
}
