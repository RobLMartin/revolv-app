export type Vinyl = {
  id: string;
  title: string;
  artist: string;
  year: number;
};

export type BuyerProfileType = {
  name: string;
  bio: string;
  collection: Vinyl[];
};

const defaultProfile: BuyerProfileType = {
  name: "Vinyl Aficionado",
  bio: "A lover of all things analog.",
  collection: [
    { id: "1", title: "Kind of Blue", artist: "Miles Davis", year: 1959 },
    { id: "2", title: "Abbey Road", artist: "The Beatles", year: 1969 },
  ],
};

let profile: BuyerProfileType = { ...defaultProfile };

export async function getProfile() {
  return profile;
}

export async function updateProfile(data: Partial<BuyerProfileType>) {
  profile = { ...profile, ...data };
}

export async function addVinyl(vinyl: Omit<Vinyl, "id">) {
  const id = Date.now().toString();
  profile.collection.push({ ...vinyl, id });
}

export type Interest = {
  vinylId: string;
  name: string;
};

const interests: Interest[] = [];

export async function expressInterest(vinylId: string, name: string) {
  interests.push({ vinylId, name });
  console.log(`Interest from ${name} for vinyl ${vinylId}`);
}

export async function getInterests() {
  return interests;
}
