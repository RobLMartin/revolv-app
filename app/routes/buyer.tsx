import { Form, useLoaderData, redirect, json } from "react-router";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import {
  getProfile,
  updateProfile,
  addVinyl,
  expressInterest,
  BuyerProfile,
} from "../data/store";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export async function loader(_args: LoaderFunctionArgs) {
  const profile = await getProfile();
  return json(profile);
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
    return json({ ok: true });
  }

  return null;
}

export default function BuyerProfile() {
  const profile = useLoaderData() as BuyerProfile;

  return (
    <div className="container mx-auto space-y-8 p-4">
      <h1 className="text-3xl font-bold">Buyer Profile</h1>

      <Form method="post" className="space-y-4 rounded-md border p-4">
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

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Collection</h2>
        <ul className="space-y-4">
          {profile.collection.map((v) => (
            <li key={v.id} className="rounded-md border p-4 space-y-2">
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
            </li>
          ))}
        </ul>

        <Form method="post" className="mt-8 space-y-4 rounded-md border p-4">
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
      </section>
    </div>
  );
}
