import React from "react";
import {IProduct} from "~/utils/graphql";

export interface ISearchContext {
    items: Set<IProduct>;
    openSearch: boolean;
    openSearchModal: (set: boolean) => void;
    updateItems: (item: IProduct) => void;
    searchItems: (query: string) => IProduct[];
}

export const SearchContext = React.createContext<ISearchContext | null>(null)

const SearchProvider = ({ children }: any) => {
    const [items, setItems] = React.useState<Set<IProduct>>(new Set());
    const [openSearch, setOpenSearch] = React.useState<boolean>(false);

    const updateItems = (item: IProduct) => {
        setItems(new Set(items.add(item)));
    }

    const searchItems = (query: string): IProduct[] => {
        if (query === "") {
            return [];
        }
        return Array.from(items).filter((item: IProduct) => item.handle.includes(query));
    }

    const openSearchModal = (set: boolean) => {
        setOpenSearch(set);
    }

    return (
        <SearchContext.Provider value={{ items, openSearch, updateItems, searchItems, openSearchModal}}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchProvider;
