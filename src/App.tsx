import { useEffect, useState } from "react";
import { Bookmark } from "./interfaces";
import BookmarkList from "./components/BookmarkList";
import AddBookmarkDialog from "./components/AddBookmarkDialog";

const initialBookmarks: Bookmark[] = [
  {
    url: "https://bedu.org",
    title: "Cursos de Programación, Tecnología, Negocios, Inglés | BEDU",
    description:
      "Somos una compañía de educación en línea en español que ofrece cursos de programación, cursos de negocios y cursos de inglés en un esquema acelerado y flexible.",
    image: "http://assets.bedu.org/images/hero-image.jpg",
  },
  {
    url: "https://www.youtube.com",
    title: "YouTube",
    description:
      "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
    image: "http://www.youtube.com/img/desktop/yt_1200.png",
  },
  {
    url: "https://www.instagram.com",
    title: "Instagram",
    description:
      "Create an account or log in to Instagram - A simple, fun & creative way to capture, edit & share photos, videos & messages with friends & family.",
    image: null,
  },
];

const App = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [showAddBookmarkDialog, setShowAddBookmarkDialog] = useState(false);

  useEffect(() => {
    setBookmarks(initialBookmarks);
  }, []);

  const toggleAddBookmarkDialog = () => {
    setShowAddBookmarkDialog(!showAddBookmarkDialog);
  };

  return (
    <>
      <h1>Marko</h1>
      <h2>My bookmarks</h2>
      <button onClick={toggleAddBookmarkDialog}>Add new bookmark</button>
      <BookmarkList bookmarks={bookmarks} />
      {showAddBookmarkDialog && (
        <AddBookmarkDialog toggleDialog={toggleAddBookmarkDialog} />
      )}
    </>
  );
};

export default App;
