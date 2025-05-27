import { Form, useLoaderData, useActionData } from "react-router";
import type { Route } from "./+types/records.$slug";
import { Button } from "~/components/ui/button";

export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;
  const offers = [
    { store: "Vinyl Vault", condition: "New", price: 26.99 },
    { store: "Beats & Grooves", condition: "Used - VG+", price: 22.49 },
    { store: "Spin City Records", condition: "Used - VG", price: 19.99 },
  ];
  return { album: { artist: "Kendrick Lamar", title: "To Pimp A Butterfly", slug }, offers };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const store = formData.get("store");
  return { message: `Contacting ${store}` };
}

export function meta({ data }: Route.MetaArgs) {
  const title = `${data?.album.artist} - ${data?.album.title} Deals`;
  return [
    { title },
    { name: "description", content: `Compare prices for ${data?.album.title}.` },
  ];
}

export default function RecordOffers() {
  const { album, offers } = useLoaderData() as Route.LoaderData;
  const actionData = useActionData() as Route.ActionData | undefined;
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">
        {album.artist} – {album.title}
      </h1>
      <p className="mb-6 text-gray-600">
        Explore offers from different stores and find the best deal.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Store</th>
              <th className="px-4 py-2 text-left">Condition</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer.store} className="border-t">
                <td className="px-4 py-2 font-medium">{offer.store}</td>
                <td className="px-4 py-2">{offer.condition}</td>
                <td className="px-4 py-2">${offer.price.toFixed(2)}</td>
                <td className="px-4 py-2 text-right">
                  <Form method="post">
                    <input type="hidden" name="store" value={offer.store} />
                    <Button type="submit" className="h-8 px-3">Select</Button>
                  </Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {actionData?.message && (
        <p className="mt-4 text-green-600">{actionData.message}</p>
      )}
    </main>
  );
}
