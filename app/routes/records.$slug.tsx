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
  const intent = formData.get("intent");
  if (intent === "wishlist") {
    return { message: "Added to wishlist" };
  }
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
  const tracks = [
    "Wesley's Theory",
    "For Free?",
    "King Kunta",
    "Institutionalized",
  ];
  return (
    <main className="container max-w-4xl space-y-6 py-8">
      <h1 className="text-3xl font-bold tracking-tight">
        {album.artist} – {album.title}
      </h1>
      <p className="text-gray-600">
        Explore offers from different stores and find the best deal.
      </p>

      <section>
        <h2 className="font-semibold mb-2">Tracklist</h2>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          {tracks.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ol>
        <Form method="post" className="mt-4">
          <input type="hidden" name="intent" value="wishlist" />
          <Button type="submit">Add to Wishlist</Button>
        </Form>
      </section>
      <div className="overflow-x-auto">
        <table className="w-full text-sm rounded-md border shadow">
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
