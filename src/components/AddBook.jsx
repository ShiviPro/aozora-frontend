import { Fragment, useState } from "react";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState();
  const [bookGenre, setBookGenre] = useState([]);
  const [language, setLanguage] = useState("");
  const [country, setCountry] = useState("");
  const [rating, setRating] = useState();
  const [summary, setSummary] = useState("");
  const [coverImgUrl, setCoverImgUrl] = useState("");

  const availableGenres = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Thriller",
    "Science Fiction",
    "Fantasy",
    "Romance",
    "Historical",
    "Biography",
    "Autobiography",
    "Business",
    "Self-help",
    "Other",
  ];

  const addBook = async (event) => {
    event.preventDefault();

    const formData = {
      title: title.trim(),
      author: author.trim(),
      publishedYear: parseInt(publishedYear),
      genre: bookGenre,
      language: language.trim(),
      country: country.trim() || "United States",
      rating: Number.isNaN(parseFloat(rating)) ? 0 : parseFloat(rating),
      summary: summary.trim(),
      coverImageUrl: coverImgUrl.trim(),
    };

    if (
      formData.title &&
      formData.author &&
      formData.publishedYear &&
      formData.language
    ) {
      try {
        const response = await fetch("https://aozora-three.vercel.app/books", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw "An error occurred while adding book";
        }

        const bookAdded = await response.json();
        console.log("Book Added:", bookAdded);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section>
      <h2>Add Book</h2>
      <form onSubmit={addBook}>
        <div>
          <label htmlFor="titleInput">Title:</label>
          <br />
          <input
            id="titleInput"
            required
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <br />
        <div>
          <label htmlFor="authorInput">Author:</label>
          <br />
          <input
            id="authorInput"
            required
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <br />
        <div>
          <label htmlFor="publishedYearInput">Published Year:</label>
          <br />
          <input
            type="number"
            id="publishedYearInput"
            required
            onChange={(event) => setPublishedYear(event.target.value)}
          />
        </div>
        <br />
        <div>
          <p style={{ marginBottom: "7px" }}>Select applicable genre(s):</p>
          {availableGenres.map((genre) => (
            <Fragment key={genre}>
              <label htmlFor={`${genre.toLowerCase()}GenreCheckbox`}>
                <input
                  type="checkbox"
                  id={`${genre.toLowerCase()}GenreCheckbox`}
                  value={genre}
                  onChange={(event) => {
                    const { checked, value } = event.target;
                    checked
                      ? setBookGenre([...bookGenre, value])
                      : setBookGenre(
                          bookGenre.filter((eachGenre) => eachGenre != value)
                        );
                  }}
                />{" "}
                {genre}
              </label>
              <br />
            </Fragment>
          ))}
        </div>
        <br />
        <div>
          <label htmlFor="langInput">Language:</label>
          <br />
          <input
            id="langInput"
            required
            onChange={(event) => setLanguage(event.target.value)}
          />
        </div>
        <br />
        <div>
          <label htmlFor="countryInput">Country:</label>
          <br />
          <input
            id="countryInput"
            onChange={(event) => setCountry(event.target.value)}
          />
        </div>
        <br />
        <div>
          <label htmlFor="ratingInput">Rating:</label>
          <br />
          <input
            type="number"
            id="ratingInput"
            min={0}
            max={10}
            step={0.01}
            onChange={(event) => setRating(event.target.value)}
          />
        </div>
        <br />
        <div>
          <label htmlFor="summaryTextarea">Summary:</label>
          <br />
          <textarea
            id="summaryTextarea"
            rows="6"
            cols="40"
            onChange={(event) => setSummary(event.target.value)}
          ></textarea>
        </div>
        <br />
        <div>
          <label htmlFor="coverUrlInput">Cover Image Url:</label>
          <br />
          <input
            id="coverUrlInput"
            onChange={(event) => setCoverImgUrl(event.target.value)}
          />
        </div>
        <br />
        <input type="submit" />
      </form>
    </section>
  );
};

export default AddBook;
