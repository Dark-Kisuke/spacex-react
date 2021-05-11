import {FormControl, InputAdornment, TextField} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, {ChangeEvent} from 'react';

interface SearchBarProps {
  onChange: (value: string) => void;
}

const SearchBar = ({onChange}: SearchBarProps) => {

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value.trim());
  };

  return (
    <FormControl>
      <TextField
        id="launch-name"
        type="search"
        label="Launch name"
        onChange={handleOnChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon/>
            </InputAdornment>
          )
        }}
      />
    </FormControl>
  );
};

export default SearchBar;
