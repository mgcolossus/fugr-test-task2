import React from "react";
import { RootStoreContext } from "../contexts/rootStoreContext";

export const useRootStore = () => React.useContext(RootStoreContext);
