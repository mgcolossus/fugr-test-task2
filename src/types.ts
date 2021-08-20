export interface SearchParameters {
  textToSearch: string;
  category: string;
  sortingBy: string;
}

export interface VolumeData {
  id: string;
  title: string;
  authors?: string[];
  description?: string;
  categories?: string[];
  imageLinks?: {
    small?: string;
    thumbnail?: string;
  };
}

export interface FetchedVolumeData {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    categories?: string[];
    imageLinks?: {
      small?: string;
      thumbnail?: string;
    };
  };
}

export interface CreateQueryURL extends SearchParameters {
  startIndex?: number;
}
