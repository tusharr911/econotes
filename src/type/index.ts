export interface Note {
  id: string;
  title: string;
  tagline: string;
  body: string;
  date: string;
  pinned: boolean;
  pinnedDate: string | null;
}
