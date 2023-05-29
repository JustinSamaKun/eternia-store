import React from "react";
import { ISearchContext, SearchContext } from "~/context/SearchContext";
import {Modal} from "~/components/Modal";

export const Search = () => {
    const { searchItems, openSearch, openSearchModal, items } = React.useContext(SearchContext) as ISearchContext;
    const [search, setSearch] = React.useState<string>("");

    return (
        <Modal
            open={openSearch}
            onClose={() => openSearchModal(false)}
        >
            <section className="relative w-full h-full mx-auto max-w-2xl flex justify-center items-center">
                <div className="relative bg-theme-color-500 rounded-2xl shadow p-20">
                    <h1 className="background-clip font-display text-custom-gray-300 w-full text-m-h1 sm:text-d-h2 text-3xl md:text-5xl text-light-gray-500 lg:text-[length:64px] xl:text-d-j font-black">Search</h1>
                    <div className="h-5" />
                    <form>
                        <label form="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input type="search" id="default-search" onChange={(e) => setSearch(e.target.value)} className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Products..." required />
                        </div>
                    </form>
                    {searchItems(search).map((item) => {
                        return (
                            <>
                                <div className="h-3" />
                                <div className="p-5 rounded-2xl bg-card-background-500 border border-custom-purple-500 flex flex-row">
                                    <img
                                        className="object-contain h-5 w-5"
                                        src={item.image ?? "https://cdn.agoramp.com/static/209/assets/blank_product.png"}
                                        alt={item.title}
                                    />
                                    <h2 className="pl-3 font-bold">{item.title}</h2>
                                    <button className="button-hover text-custom-gray-100 button-background focus:outline-none focus:ring-4 font-black rounded-full text-sm px-3 py-1.5 text-center mr-2 mb-2">Go To</button>
                                </div>
                            </>
                        )
                    })}
                </div>
            </section>
        </Modal>
    )
}
