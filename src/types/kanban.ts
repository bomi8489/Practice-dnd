export type ItemStatus = 'todo' | 'doing' | 'done';

export type ItemType = {
  id: string,
  content: string,
  status: ItemStatus,
};

export type ItemTypes = {
  [key in ItemStatus]: ItemType[];
};
