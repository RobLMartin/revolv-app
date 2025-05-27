export type RecordItem = {
  id: string;
  title: string;
  price: number;
  description: string;
};

const records: RecordItem[] = [];

export function getRecords() {
  return records;
}

export function addRecord(item: RecordItem) {
  records.push(item);
}
