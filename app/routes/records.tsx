import { Form, useLoaderData } from "react-router";
import type { Route } from "./+types/records";
import { records } from "~/data/records";
import { Button } from "~/components/ui/button";

export function loader() {
  return records;
}

export default function Records() {
  const data = useLoaderData() as Route.LoaderData;
  return (
    <main className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Records</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((record) => (
          <li key={record.id} className="border rounded-lg p-4 space-y-2">
            <img src={record.cover} alt={record.title} className="w-full" />
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
          </li>
        ))}
      </ul>
    </main>
  );
}
