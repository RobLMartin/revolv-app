import { Form, useLoaderData, redirect } from "react-router";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import {
  getProfile,
  updateProfile,
  addVinyl,
  expressInterest,
  type BuyerProfileType,
} from "../data/store";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../ui/card";

export async function loader(_args: LoaderFunctionArgs) {
  const profile = await getProfile();
  return profile;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "update-profile") {
    const name = formData.get("name") as string;
    const bio = formData.get("bio") as string;
    await updateProfile({ name, bio });
    return redirect("/buyer");
  }

  if (intent === "add-vinyl") {
    const title = formData.get("title") as string;
    const artist = formData.get("artist") as string;
    const year = Number(formData.get("year"));
    await addVinyl({ title, artist, year });
    return redirect("/buyer");
  }

  if (intent === "express-interest") {
    const vinylId = formData.get("vinylId") as string;
    const yourName = (formData.get("yourName") as string) || "Anonymous";
    await expressInterest(vinylId, yourName);
    return { ok: true };
  }

  return null;
}

export default function BuyerProfilePage() {
  const profile = useLoaderData() as BuyerProfileType;
  const wishlist = [
    { id: "w1", title: "Blue Train", artist: "John Coltrane" },
    { id: "w2", title: "In Rainbows", artist: "Radiohead" },
  ];
  const orders = [
    { id: "o1", title: "Kind of Blue", date: "2024-05-20", status: "Shipped" },
  ];

  return (
    <div className="container max-w-4xl space-y-8 py-8">
      <h1 className="text-3xl font-bold tracking-tight">Buyer Profile</h1>

      <Card>
        <Form method="post" className="space-y-4">
          <input type="hidden" name="intent" value="update-profile" />
          <div className="space-y-2">
            <label className="block text-sm font-medium" htmlFor="name">
              Name
            </label>
            <Input id="name" name="name" defaultValue={profile.name} />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium" htmlFor="bio">
              Bio
            </label>
            <Input id="bio" name="bio" defaultValue={profile.bio} />
          </div>
          <Button type="submit">Save Profile</Button>
        </Form>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Collection</h2>
        <ul className="space-y-4">
          {profile.collection.map((v) => (
            <Card key={v.id} className="space-y-2">
              <p className="font-medium">
                {v.title} - {v.artist} ({v.year})
              </p>
              <Form method="post" className="flex items-end gap-2">
                <input type="hidden" name="intent" value="express-interest" />
                <input type="hidden" name="vinylId" value={v.id} />
                <Input
                  name="yourName"
                  placeholder="Your name"
                  className="max-w-xs"
                />
                <Button type="submit">I'm Interested</Button>
              </Form>
            </Card>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold">Wishlist</h2>
        <ul className="space-y-2">
          {wishlist.map((w) => (
            <Card key={w.id} className="p-3 flex justify-between">
              <span>
                {w.title} - {w.artist}
              </span>
            </Card>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold">Order History</h2>
        <ul className="space-y-2">
          {orders.map((o) => (
            <Card key={o.id} className="p-3 flex justify-between">
              <span>{o.title}</span>
              <span className="text-sm text-gray-500">{o.date} - {o.status}</span>
            </Card>
          ))}
        </ul>

        <Card className="mt-8 p-4">
          <Form method="post" className="space-y-4">
            <input type="hidden" name="intent" value="add-vinyl" />
            <h3 className="text-lg font-medium">Add Vinyl</h3>
          <div className="space-y-2">
            <label className="block text-sm font-medium" htmlFor="title">
              Title
            </label>
            <Input id="title" name="title" required />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium" htmlFor="artist">
              Artist
            </label>
            <Input id="artist" name="artist" required />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium" htmlFor="year">
              Year
            </label>
            <Input id="year" name="year" type="number" required />
          </div>
            <Button type="submit">Add</Button>
          </Form>
        </Card>
      </section>
    </div>
  );
}
