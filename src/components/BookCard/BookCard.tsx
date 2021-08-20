import React from "react";
import { Link } from "react-router-dom";
import { VolumeData } from "../../types";
import noImageAvailable from "../../assets/no-image-available.png";

interface Props {
  bookData: VolumeData;
}

export const BookCard = React.forwardRef<HTMLDivElement, Props>(({ bookData }, ref) => (
  <div className="book-card" key={bookData.id} ref={ref}>
    <div className="book-card__content">
      <Link to={`/books/${bookData.id}`} className="book-card__thumbnail-wrapper">
        <img
          src={bookData?.imageLinks?.thumbnail || noImageAvailable}
          className="book-card__thumbnail"
          alt="thumbnail"
        />
      </Link>
      {bookData.categories && bookData?.categories.length > 0 ? (
        <div className="book-card__category">{bookData.categories[0]}</div>
      ) : null}
      <Link to={`/books/${bookData.id}`} className="book-card__title">
        {bookData.title}
      </Link>
      {bookData.authors && bookData?.authors.length > 0 ? (
        <div className="book-card__authors">{bookData.authors.join(", ")}</div>
      ) : null}
    </div>
  </div>
));
