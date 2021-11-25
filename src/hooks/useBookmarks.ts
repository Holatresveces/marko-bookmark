import { useEffect, useState } from "react";
import { Bookmark } from "../interfaces";

export const useBookmarks = () => {
  // Lazy initialization
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const value = window.localStorage.getItem("bookmarks");
    if (value) {
      return JSON.parse(value);
    } else {
      return [];
    }
  });

  // Store bookmarks on localStorage each time the bookmarks array gets updated
  useEffect(() => {
    window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (newBookmarkData: Bookmark) => {
    setBookmarks([...bookmarks, newBookmarkData]);
  };

  const deleteBookmark = ({ url }: Bookmark) => {
    const filteredBookmarks = bookmarks.filter(
      (bookmark) => bookmark.url !== url
    );
    setBookmarks(filteredBookmarks);
  };

  return { bookmarks, setBookmarks, addBookmark, deleteBookmark };
};
