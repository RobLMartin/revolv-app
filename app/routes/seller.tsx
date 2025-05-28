import { Form, redirect, useLoaderData } from "react-router";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { addRecord, getRecords, type RecordItem } from "../seller/store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";

export async function loader(_: LoaderFunctionArgs) {
  return { records: getRecords() };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const record: RecordItem = {
    id: Date.now().toString(),
    title: String(formData.get("title")),
    price: parseFloat(String(formData.get("price"))),
    description: String(formData.get("description")),
  };
  addRecord(record);
  return redirect("/seller");
}

export default function Seller() {
  const { records } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const stats = { sales: 12, pending: 3 };
  const pendingOrders = [
    { id: "p1", title: "Blue Train", buyer: "Alice" },
    { id: "p2", title: "Abbey Road", buyer: "Bob" },
  ];

  return (
    <main className="container max-w-4xl space-y-8 py-8">
      <h1 className="text-3xl font-bold tracking-tight">Seller Dashboard</h1>

      <section className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center">
          <p className="text-sm text-gray-500">Total Sales</p>
          <p className="text-2xl font-semibold">{stats.sales}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-sm text-gray-500">Pending Orders</p>
          <p className="text-2xl font-semibold">{stats.pending}</p>
        </Card>
      </section>
      <Card>
        <Form method="post" className="space-y-4">
          <div>
            <Label htmlFor="title">Record Title</Label>
            <Input id="title" name="title" required />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input id="price" name="price" type="number" min="0" step="0.01" required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input id="description" name="description" />
          </div>
          <Button type="submit">Add Record</Button>
        </Form>
      </Card>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Records</h2>
        {records.length === 0 ? (
          <p>No records added yet.</p>
        ) : (
          <ul className="space-y-2">
            {records.map((record) => (
              <Card key={record.id}>
                <p className="font-medium">{record.title}</p>
                <p className="text-sm text-gray-600">${record.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500">{record.description}</p>
              </Card>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Pending Orders</h2>
        {pendingOrders.length === 0 ? (
          <p>No pending orders.</p>
        ) : (
          <ul className="space-y-2">
            {pendingOrders.map((o) => (
              <Card key={o.id} className="flex justify-between p-3">
                <span>{o.title}</span>
                <span className="text-sm text-gray-500">{o.buyer}</span>
              </Card>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
