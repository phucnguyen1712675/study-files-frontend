import React from 'react';
import { InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import './headerStyle.css';

export function Header() {
  return (
    <>
      <div>
        <h1 className="menu">Study Files</h1>
        <p className="menu">Category</p>
        <div className="menu">
          <TextField
            id="searchStr"
            size="medium"
            style={{
              borderRadius: 12,
              border: '2px solid black',
            }}
            fullWidth={true}
            placeholder="Search for courses"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          ></TextField>
        </div>
        <ul className="menu">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
    </>
  );
}
