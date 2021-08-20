import { makeAutoObservable, runInAction } from "mobx";
import { VolumeData } from "../types";

class BookInfoStore {
  loading = false;
  error: null | string = null;
  bookInfo: null | VolumeData = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loadBookInfo(id: string) {
    try {
      this.loading = true;
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
      const responseData = await response.json();
      runInAction(() => {
        this.bookInfo = {
          id: responseData.id,
          title: responseData.volumeInfo.title,
          authors: responseData.volumeInfo?.authors,
          description: responseData.volumeInfo?.description,
          categories: responseData.volumeInfo?.categories,
          imageLinks: {
            small: responseData.volumeInfo.imageLinks?.small,
            thumbnail: responseData.volumeInfo.imageLinks?.thumbnail,
          },
        };
      });
    } catch (e) {
      runInAction(() => {
        console.log('fuck');
        this.error = "Failed to load book data";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

const bookInfoStore = new BookInfoStore();
export { bookInfoStore };
