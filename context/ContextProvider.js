"use client";
import { createContext, useContext, useEffect, useState } from "react";
import "dotenv/config";
import { options } from "@/utils";

const BookmarkContext = createContext();

export function useBookmarkContext() {
  return useContext(BookmarkContext);
}

export function BookmarkProvider({ children }) {
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [mediaType, setMediaType] = useState("movie");
  const [page, setPage] = useState(1);

  useEffect(() => {
    mediaType === "movie"
      ? fetch(
          `https://api.themoviedb.org/3/search/movie?query=${searchInput}&include_adult=false&language=en-US&page=${page}`,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            setFilteredData(response);
          })
          .catch((err) => console.error(err))
      : fetch(
          `https://api.themoviedb.org/3/search/tv?query=${searchInput}&include_adult=false&language=en-US&page=${page}`,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            setFilteredData(response);
          })
          .catch((err) => console.error(err));
  }, [searchInput, page, mediaType]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(e.target.search.value);
    e.target.search.value = "";
  };

  const resetSearch = () => {
    setSearchInput("");
  };

  const [favoritedMovies, setFavoritedMovies] = useState(() => {
    // localStorage.clear();
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("bookmarkedMovies") !== null
    ) {
      return JSON.parse(localStorage.getItem("bookmarkedMovies"));
    } else {
      return [];
    }
  });

  const [favoritedTvs, setFavoritedTvs] = useState(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("bookmarkedTvs") !== null
    ) {
      return JSON.parse(localStorage.getItem("bookmarkedTvs"));
    } else {
      return [];
    }
  });

  const handleMoviesBookmarkClick = (item) => {
    if (favoritedMovies?.filter((obj) => obj.id === item.id).length === 0) {
      const updatedBookmark = [...favoritedMovies, item];
      setFavoritedMovies(updatedBookmark);
      localStorage.setItem("bookmarkedMovies", JSON.stringify(updatedBookmark));
    } else {
      const updatedBookmark = favoritedMovies?.filter(
        (obj) => obj.id !== item.id
      );
      setFavoritedMovies(updatedBookmark);
      localStorage.setItem("bookmarkedMovies", JSON.stringify(updatedBookmark));
    }
  };

  const handleTvsBookmarkClick = (item) => {
    if (favoritedTvs?.filter((obj) => obj.id === item.id).length === 0) {
      const updatedBookmark = [...favoritedTvs, item];
      setFavoritedTvs(updatedBookmark);
      localStorage.setItem("bookmarkedTvs", JSON.stringify(updatedBookmark));
    } else {
      const updatedBookmark = favoritedTvs?.filter((obj) => obj.id !== item.id);
      setFavoritedTvs(updatedBookmark);
      localStorage.setItem("bookmarkedTvs", JSON.stringify(updatedBookmark));
    }
  };

  const contextValue = {
    favoritedMovies,
    handleMoviesBookmarkClick,
    favoritedTvs,
    handleTvsBookmarkClick,
    searchInput,
    setSearchInput,
    handleSearch,
    resetSearch,
    mediaType,
    setMediaType,
    filteredData,
    setFilteredData,
    page,
    setPage,
  };

  return (
    <BookmarkContext.Provider value={contextValue}>
      {children}
    </BookmarkContext.Provider>
  );
}
