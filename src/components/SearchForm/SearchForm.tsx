import React, { useState } from "react";
import buttonIcon from "../../assets/loupe.svg";
import { SearchParameters } from "../../types";

interface Props {
  onSearch: (searchParams: SearchParameters) => void;
}

const SearchForm: React.FC<Props> = ({ onSearch }) => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("all");
  const [sortingByValue, setSortingByValue] = useState("relevance");

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryValue(e.target.value);
  };

  const onSortingByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortingByValue(e.target.value);
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch({
      textToSearch: searchInputValue,
      category: categoryValue,
      sortingBy: sortingByValue,
    });
  };
  return (
      <header className="header">
        <form className="search-form" onSubmit={onFormSubmit}>
          <h1 className="search-form__title">Search for books</h1>
          <div className="search-form-input-wrapper">
            <input
              className="search-form-input-wrapper__input"
              type="text"
              value={searchInputValue}
              onChange={onSearchInputChange}
              placeholder="Enter a text to search"
            />
            <button type="submit" className="search-form-input-wrapper__button">
              <img src={buttonIcon} alt="" />
            </button>
          </div>
          <div className="search-form-selects">
            <div className="search-form-select-item">
              <label className="search-form-select-item__title">Categories</label>
              <select className="search-form-select-item__select" value={categoryValue} onChange={onCategoryChange}>
                <option value="all">all</option>
                <option value="art">art</option>
                <option value="biography">biography</option>
                <option value="computers">computers</option>
                <option value="history">history</option>
                <option value="medical">medical</option>
                <option value="poetry">poetry</option>
              </select>
            </div>
            <div className="search-form-select-item">
              <label className="search-form-select-item__title">Sorting by</label>
              <select className="search-form-select-item__select" value={sortingByValue} onChange={onSortingByChange}>
                <option value="relevance">relevance</option>
                <option value="newest">newest</option>
              </select>
            </div>
          </div>
        </form>
      </header>
  );
};

export { SearchForm };
