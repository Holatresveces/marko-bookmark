import axios from "axios";
import { useReducer } from "react";
import { AsyncFormState } from "../interfaces";
import { asyncFormReducer } from "../reducers/asyncFormReducer";

const INITIAL_STATE: AsyncFormState = {
  data: {
    description: null,
    image: null,
    title: null,
    url: "",
  },
  status: "idle",
  error: null,
};

export const useAsyncForm = (initialState: AsyncFormState = INITIAL_STATE) => {
  const [asyncFormState, dispatch] = useReducer(asyncFormReducer, initialState);
  const { status, data } = asyncFormState;
  const { url } = data;

  const updateInput = (payload: { name: string; value: string }) => {
    dispatch({ type: "update-input-value", payload });
  };

  const fetchMetadata = () => {
    if (status === "loading") return;

    if (!url.trim()) {
      alert("Insert a valid URL!");
      return;
    }

    dispatch({ type: "fetch-metadata" });

    const baseUrl = "/api/metadata";

    axios
      .get(`${baseUrl}?url=${url}`)
      .then(({ data }) => {
        console.log("metadata fetched successfully");
        console.log(data);
        dispatch({ type: "set-metadata", payload: data });
      })
      .catch((err) => {
        console.log("metadata fetching failed");
        console.log(err);
        alert("Whoops! Something went wrong...");
        dispatch({ type: "set-error", payload: { error: err } });
      });
  };

  return { asyncFormState, fetchMetadata, updateInput };
};
