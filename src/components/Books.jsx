import { Fragment, useState } from "react";
import useFetch from "../useFetch";

const Books = () => {
  const [deleteSuccessMsg, setDeleteSuccessMsg] = useState("");

  const {
    data: allBooks,
    loading,
    error,
  } = useFetch("https://aozora-three.vercel.app/books");

  const deleteBook = async (bookId) => {
    try {
      const response = await fetch(
        `https://aozora-three.vercel.app/books/${bookId}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw "An error occurred while deleting book!";
      }

      const data = await response.json();
      if (data) {
        setDeleteSuccessMsg("Book Deleted Successfully.");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <h2>All Books</h2>
      {loading && <p>Loading...</p>}
      {error && <p>An error occurred while fetching books!</p>}
      <p style={{ color: "red" }}>
        <strong>{deleteSuccessMsg}</strong>
      </p>
      <ul>
        {allBooks?.map((book) => (
          <Fragment key={book._id}>
            <li>
              {book.title}{" "}
              <button onClick={() => deleteBook(book._id)}>Delete</button>
            </li>
            <br />
          </Fragment>
        ))}
      </ul>
    </section>
  );
};

export default Books;
