import React from "react";
import { bookCardsStore, bookInfoStore } from "../stores";

const rootStore = {
  bookCardsStore,
  bookInfoStore,
};

type RootStore = typeof rootStore;

export const RootStoreContext = React.createContext<RootStore>(rootStore);

export const RootStoreProvider: React.FC = (props) => (
  <RootStoreContext.Provider value={rootStore}>{props.children}</RootStoreContext.Provider>
);
