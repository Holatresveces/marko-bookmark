export interface Bookmark {
  url: string;
  title: string | null;
  description: string | null;
  image: string | null;
}

export interface AsyncMetadataState {
  data: Bookmark;
  status: "idle" | "loading" | "resolved" | "rejected";
  error: string | null;
}
