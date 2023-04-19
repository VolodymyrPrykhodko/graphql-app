import React, { useReducer } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { flowRight as compose } from "lodash";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

const SET_DATA = "SET_DATA";

const primaryState = {
  name: "",
  genre: "",
  authorId: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_DATA:
      return { ...state, ...action.payload };
    default:
      return primaryState;
  }
};

const AddBook = (props) => {
  const [state, dispatch] = useReducer(reducer, primaryState);

  const displayAuthors = () => {
    const data = props.getAuthorsQuery;
    if (data.loading) {
      <option disabled>Loading...</option>;
    } else {
      return data.authors.map((author) => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ));
    }
  };

  const submit = (e) => {
    e.preventDefault();
    props.addBookMutation({
      variables: { ...state },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  return (
    <form id="add-book" onSubmit={submit}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          onChange={(e) =>
            dispatch({ type: SET_DATA, payload: { name: e.target.value } })
          }
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          onChange={(e) =>
            dispatch({ type: SET_DATA, payload: { genre: e.target.value } })
          }
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select
          onChange={(e) =>
            dispatch({
              type: SET_DATA,
              payload: { authorId: e.target.value },
            })
          }
        >
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
