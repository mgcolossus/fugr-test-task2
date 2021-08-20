import React, { useEffect } from "react";
import noImageAvailable from "../../assets/no-image-available.png";
import { useParams } from "react-router-dom";
import { VolumeData } from "../../types";
import { Preloader } from "../Preloader/Preloader";
import { useRootStore } from "../../hooks/useRootStore";
import { ErrorBlock } from "../ErrorBlock/ErrorBlock";

interface Props {
  loading: boolean;
  error: string | null;
  bookInfo: null | VolumeData;
}

export const BookInfo: React.FC<Props> = ({ loading, error, bookInfo }) => {
  const { id } = useParams<{ id: string }>();
  const { bookInfoStore } = useRootStore();

  useEffect(() => {
    bookInfoStore.loadBookInfo(id);
  }, [id, bookInfoStore]);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <ErrorBlock>{error}</ErrorBlock>;
  }

  if (!bookInfo) {
    return null;
  }

  return (
    <div className="book-info">
      <div className="book-info__book-cover-wrapper">
        <img
          className="book-info__book-cover-img"
          src={bookInfo.imageLinks?.small ? bookInfo.imageLinks.small : noImageAvailable}
          alt="book-cover"
        />
      </div>
      <div className="book-info__text-content">
        {bookInfo?.categories && bookInfo.categories.length > 0 ? (
          <div className="book-info__categories">{bookInfo.categories.join(", ")}</div>
        ) : null}
        <div className="book-info__title">{bookInfo.title}</div>
        {bookInfo?.authors && bookInfo.authors.length > 0 ? (
          <div className="book-info__authors">{bookInfo.authors!.join(", ")}</div>
        ) : null}
        {bookInfo?.description ? (
          <div
            className="book-info__description"
            dangerouslySetInnerHTML={{
              __html: bookInfo.description,
            }}></div>
        ) : null}
      </div>
    </div>
  );
};
