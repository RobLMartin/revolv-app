import { Form, useLoaderData } from "react-router";
import type { Route } from "./+types/records";
import { records } from "~/data/records";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card } from "~/ui/card";

export function loader() {
  return records;
}

export default function Records() {
  const data = useLoaderData() as Route.LoaderData;
  return (
    <main className="container max-w-6xl space-y-6 py-8">
      <h1 className="text-3xl font-bold tracking-tight">Records</h1>

      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <Input placeholder="Search records..." className="flex-1" />
        <select className="h-9 rounded-md border border-gray-300 bg-white px-3 text-sm shadow-sm">
          <option>Sort By</option>
          <option value="price">Price</option>
          <option value="artist">Artist</option>
        </select>
        <select className="h-9 rounded-md border border-gray-300 bg-white px-3 text-sm shadow-sm">
          <option>Genre</option>
          <option>Rock</option>
          <option>Jazz</option>
          <option>Soul</option>
        </select>
      </div>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {data.map((record) => (
          <Card key={record.id} className="space-y-2">
            <img src={record.cover} alt={record.title} className="w-full rounded-md" />
            <h2 className="font-semibold">{record.title}</h2>
            <p className="text-sm text-gray-500">{record.artist}</p>
            <p className="font-medium">${record.price.toFixed(2)}</p>
            <Form method="post" action="/cart">
              <input type="hidden" name="intent" value="add" />
              <input type="hidden" name="recordId" value={record.id} />
              <Button type="submit" className="mt-2 w-full">
                Add to Cart
              </Button>
            </Form>
          </Card>
        ))}
      </ul>
    </main>
  );
}
