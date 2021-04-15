import React, { useState } from "react";
import { Paper, TextField } from "@material-ui/core";

const SearchBar = ({ getSearchTerm }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    getSearchTerm(searchTerm);
    setSearchTerm("");
  };
  
  return (
    <Paper elevation={6} style={{ padding: "25px" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Search..."
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </form>
    </Paper>
  );
};

export default SearchBar;
