export interface RecordData {
  id: string;
  title: string;
  artist: string;
  price: number;
  cover: string;
}

export const records: RecordData[] = [
  {
    id: '1',
    title: 'Revolver',
    artist: 'The Beatles',
    price: 19.99,
    cover: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    title: 'Back in Black',
    artist: 'AC/DC',
    price: 17.5,
    cover: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    title: 'Thriller',
    artist: 'Michael Jackson',
    price: 21.0,
    cover: 'https://via.placeholder.com/150',
  },
];
