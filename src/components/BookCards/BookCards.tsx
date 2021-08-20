import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { VolumeData } from "../../types";
import { Preloader } from "../Preloader/Preloader";
import { Button } from "../Button/Button";
import { ErrorBlock } from "./../ErrorBlock/ErrorBlock";
import { BookCard } from "../BookCard/BookCard";

interface Props {
  loading: boolean;
  error: string | null;
  booksData: null | VolumeData[];
  totalCount: null | number;
  isLoadMoreAvailable: boolean;
  onLoadMoreButtonClick: () => void;
  itemToScrollIndex: number | null;
}

export const BookCards: React.FC<Props> = observer(
  ({ loading, error, booksData, totalCount, isLoadMoreAvailable, onLoadMoreButtonClick, itemToScrollIndex }) => {
    const elementToScrollTo = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      elementToScrollTo.current = null;
    }, [])

    useEffect(() => {
      elementToScrollTo.current?.scrollIntoView({ behavior: "smooth" });
    }, [loading]);

    if (loading) {
      return <Preloader />;
    }

    if (error) {
      return <ErrorBlock>{error}</ErrorBlock>;
    }

    if (!booksData || totalCount === null) {
      return null;
    }

    return (
      <div className="book-cards">
        <div className="book-cards-total">Found {totalCount} results</div>
        <div className="book-cards-items">
          {booksData.map((bookData, i) => {
            return <BookCard bookData={bookData} ref={itemToScrollIndex === i ? elementToScrollTo : null} />;
          })}
        </div>
        {isLoadMoreAvailable ? (
          <div className="book-cards__load-more-button-wrapper">
            <Button onClick={onLoadMoreButtonClick}>load more</Button>
          </div>
        ) : null}
      </div>
    );
  }
);
