import React from "react";
import { graphql } from "@apollo/client/react/hoc";
import { getBookQuery } from "../queries/queries";

const BookDetails = ({ data: { book } }) => {
    
  const displayBookDetails = () => {
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by the author:</p>
          <ul>
            {book.author.books.map(({ id, name }) => (
              <li key={id}>{name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected</div>;
    }
  };

  return <div id="book-details">{displayBookDetails()}</div>;
};

export default graphql(getBookQuery, {
  options: ({ bookId }) => ({
    variables: {
      id: bookId,
    },
  }),
})(BookDetails);
