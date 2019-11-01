import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import useStyles from "./styles";

export interface ISearchProps {
    search: string;
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({search, handleSearch}: ISearchProps) => {
    const classes = useStyles();

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{'aria-label': 'search'}}
                value={search}
                onChange={handleSearch}
            />
        </div>
    );
};

export default Search;