export type SanityAsset = { _id?: string; _ref?: string; url?: string };

export type SanityImage = {
  alt?: string;
  asset?: SanityAsset;
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number; height: number; width: number };
};
