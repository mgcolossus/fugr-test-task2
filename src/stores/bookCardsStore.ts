import { makeAutoObservable, runInAction } from "mobx";
import { SearchParameters, VolumeData, FetchedVolumeData, CreateQueryURL } from "../types";

const API_KEY = "AIzaSyAzf2xp0kEDq2VrJIeuUb-4Ogkw3Pyd6BI";
const MAX_RESULTS = 30;

function createQueryURL(queryParams: CreateQueryURL) {
  const subject = queryParams.category !== "all" ? `+subject:${queryParams.category}` : "";
  const queryTextToSearch = `q=${queryParams.textToSearch + subject}`;
  const orderBy = `&orderBy=${queryParams.sortingBy}`;
  const maxResults = `&maxResults=${MAX_RESULTS}`;
  const apiKey = `&key=${API_KEY}`;
  const startIndex = queryParams!.startIndex ? `&startIndex=${queryParams.startIndex}` : "";

  return `https://www.googleapis.com/books/v1/volumes/?${queryTextToSearch}${orderBy}${maxResults}${startIndex}${apiKey}`;
}

const extractBookData = (bookItem: FetchedVolumeData) => {
  return {
    id: bookItem.id,
    title: bookItem.volumeInfo.title,
    authors: bookItem.volumeInfo.authors,
    description: bookItem.volumeInfo.description,
    categories: bookItem.volumeInfo.categories,
    imageLinks: {
      small: bookItem.volumeInfo.imageLinks?.small,
      thumbnail: bookItem.volumeInfo.imageLinks?.thumbnail,
    },
  };
};

class BookCardsStore {
  loading = false;
  error: string | null = null;
  searchParameters: SearchParameters | null = null;
  currentChunkIndex: number | null = null;
  booksData: null | VolumeData[] = null;
  totalCount: null | number = null;
  itemToScrollToIndex: null | number = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loadBooksData(searchParams: SearchParameters) {
    if (searchParams.textToSearch.length > 0 && searchParams.category.length > 0 && searchParams.sortingBy.length > 0) {
      this.searchParameters = searchParams;
      try {
        this.loading = true;
        const response = await fetch(createQueryURL(searchParams));
        const responseData = await response.json();
        runInAction(() => {
          this.totalCount = responseData.totalItems;
          this.currentChunkIndex = 1;
          this.itemToScrollToIndex = null;
          if (responseData.items) {
            this.booksData = responseData.items.map(extractBookData);
          } else {
            this.booksData = [];
          }
        });
      } catch (e) {
        runInAction(() => {
          this.error = "Failed to load books data";
        });
      } finally {
        runInAction(() => {
          this.loading = false;
        });
      }
    }
  }

  get isLoadMoreAvailable() {
    if (this.totalCount !== null && this.currentChunkIndex !== null) {
      return this.totalCount > this.currentChunkIndex * MAX_RESULTS;
    } else {
      return false;
    }
  }

  async loadMore() {
    if (this.isLoadMoreAvailable && this.searchParameters && this.currentChunkIndex !== null) {
      try {
        this.loading = true;
        const response = await fetch(
          createQueryURL({
            ...this.searchParameters,
            startIndex: this.currentChunkIndex * MAX_RESULTS,
          })
        );
        const responseData = await response.json();
        runInAction(() => {
          if (this.currentChunkIndex !== null) {
            this.currentChunkIndex++;
          } else {
            throw new Error("this.currentChunkIndex is null");
          }
          if (this.booksData) {
            this.itemToScrollToIndex = this.booksData.length - 1;
            if (responseData.items) {
              const mappedData = responseData.items.map(extractBookData);
              this.booksData = [...this.booksData, ...mappedData];
            }
          } else {
            throw new Error("this.booksData is null");
          }
        });
      } catch (e) {
        console.log(e);
        runInAction(() => {
          this.error = "Failed to load books data";
        });
      } finally {
        runInAction(() => {
          this.loading = false;
        });
      }
    }
  }
}

const bookCardsStore = new BookCardsStore();
export { bookCardsStore };
