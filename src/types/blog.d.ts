export interface BlogPost {
  slug: string;
  title: string;
  image?: { url: string; alt?: string } | null;
  previewContent?: string | null;
  content?: any[] | null;
  date?: string | null;
}
