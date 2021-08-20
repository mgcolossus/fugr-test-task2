import "./styles/App.scss";
import { SearchForm } from "./components/SearchForm/SearchForm";
import { SearchParameters } from "./types";
import { BookCards } from "./components/BookCards/BookCards";
import { observer } from "mobx-react-lite";
import { Switch, Route, useHistory } from "react-router-dom";
import { BookInfo } from "./components/BookInfo/BookInfo";
import { ErrorBlock } from "./components/ErrorBlock/ErrorBlock";
import { useRootStore } from "./hooks/useRootStore";

function App() {
  const history = useHistory();
  const { bookCardsStore, bookInfoStore } = useRootStore();

  const searchBooks = (searchParams: SearchParameters) => {
    history.push("/books");
    bookCardsStore.loadBooksData(searchParams);
  };

  const onLoadMoreButtonClick = () => {
    bookCardsStore.loadMore();
  };

  return (
    <>
      <SearchForm onSearch={searchBooks} />
      <Switch>
        <Route exact path="/books">
          <BookCards
            loading={bookCardsStore.loading}
            error={bookCardsStore.error}
            booksData={bookCardsStore.booksData}
            totalCount={bookCardsStore.totalCount}
            isLoadMoreAvailable={bookCardsStore.isLoadMoreAvailable}
            onLoadMoreButtonClick={onLoadMoreButtonClick}
            itemToScrollIndex={bookCardsStore.itemToScrollToIndex}
          />
        </Route>
        <Route exact path="/books/:id">
          <BookInfo loading={bookInfoStore.loading} error={bookInfoStore.error} bookInfo={bookInfoStore.bookInfo} />
        </Route>
        <Route exact path="/"></Route>
        <Route path="*">
          <ErrorBlock>Error 404: page not found</ErrorBlock>
        </Route>
      </Switch>
    </>
  );
}

export default observer(App);
