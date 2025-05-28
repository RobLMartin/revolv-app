import { Form, useLoaderData } from "react-router";
import type { Route } from "./+types/cart";
import { getCart, removeFromCart, clearCart, addToCart } from "~/utils/cart";
import { records } from "~/data/records";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card } from "~/ui/card";

export function loader() {
  return getCart();
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const intent = form.get("intent");
  if (intent === "add") {
    const record = records.find((r) => r.id === form.get("recordId"));
    if (record) addToCart(record);
  } else if (intent === "remove") {
    const id = form.get("recordId") as string;
    removeFromCart(id);
  } else if (intent === "checkout") {
    clearCart();
    return new Response(null, {
      status: 302,
      headers: { Location: "https://checkout.stripe.com/pay" },
    });
  }
  return null;
}

export default function Cart() {
  const items = useLoaderData() as Route.LoaderData;
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return (
    <main className="container max-w-4xl space-y-6 py-8">
      <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {items.map((item) => (
              <Card
                key={item.id}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <Form method="post">
                  <input type="hidden" name="intent" value="remove" />
                  <input type="hidden" name="recordId" value={item.id} />
                  <Button variant="outline" type="submit">
                    Remove
                  </Button>
                </Form>
              </Card>
            ))}
          </ul>
          <div className="text-right font-semibold">Total: ${total.toFixed(2)}</div>

          <div className="border rounded-md p-4 space-y-2">
            <h2 className="text-lg font-medium">Shipping</h2>
            <Input placeholder="Name" />
            <Input placeholder="Address" />
          </div>

          <div className="flex justify-between items-center mt-4">
            <a href="/app/records" className="text-sm text-blue-600 underline">
              Continue Shopping
            </a>
            <Form method="post">
              <input type="hidden" name="intent" value="checkout" />
              <Button type="submit">Checkout</Button>
            </Form>
          </div>
        </>
      )}
    </main>
  );
}
