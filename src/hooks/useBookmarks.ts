import { useEffect, useState } from "react";
import { Bookmark } from "../interfaces";

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const value = window.localStorage.getItem("bookmarks");
    if (value) {
      return JSON.parse(value);
    } else {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (newBookmark: Bookmark) => {
    if (bookmarks.find(({ url }) => newBookmark.url === url)) {
      alert("Bookmark already exists");
      return;
    }
    setBookmarks([...bookmarks, newBookmark]);
  };

  const deleteBookmark = ({ url }: Bookmark) => {
    const filteredBookmarks = bookmarks.filter(
      (bookmark) => bookmark.url !== url
    );
    setBookmarks(filteredBookmarks);
  };

  return { bookmarks, setBookmarks, addBookmark, deleteBookmark };
};
