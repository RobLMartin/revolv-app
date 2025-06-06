export interface Record {
  id: number;
  title: string;
  artist: string;
  cover: string;
}

export const records: Record[] = [
  {
    id: 1,
    title: "Kind of Blue",
    artist: "Miles Davis",
    price: 15.5,
    cover: "https://placehold.co/300x300?text=Kind+of+Blue",
  },
  {
    id: 2,
    title: "Abbey Road",
    artist: "The Beatles",
    price: 15.5,
    cover: "https://placehold.co/300x300?text=Abbey+Road",
  },
  {
    id: 3,
    title: "Back to Black",
    artist: "Amy Winehouse",
    price: 15.5,
    cover: "https://placehold.co/300x300?text=Back+to+Black",
  },
  {
    id: 4,
    title: "Dark Side of the Moon",
    artist: "Pink Floyd",
    price: 15.5,
    cover: "https://placehold.co/300x300?text=Dark+Side+of+the+Moon",
  },
];
