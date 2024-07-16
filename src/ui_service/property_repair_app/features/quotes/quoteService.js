import axios from "axios";

const API_URL = "http://127.0.0.1:8080";

export const getQuote = async (id) => {
  try {
    const request = {
      project_id: id,
    };
    const response = await axios.get(API_URL + "/get_quote", request);
    return response.data;
  } catch (error) {
    // Handle errors or return default data as needed.
    console.error("Error fetching quote:", error);
    return null;
  }
};

export const submitQuote = async (id, quoteData) => {
  try {
    const request = {
      project_id: id,
      total_amount: quoteData.total_amount,
      quote_entries: quoteData.quote_entries,
    };
    const response = await axios.post("/submit_quote", request);
    return response.data;
  } catch (error) {
    // Handle errors or return an error message.
    console.error("Error submitting quote:", error);
    throw new Error("Failed to submit quote.");
  }
};
