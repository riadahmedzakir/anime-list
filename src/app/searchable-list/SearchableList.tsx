// import styles from './app.module.scss';

import SearchIcon from '@mui/icons-material/Search';
import { Chip, FormControl, IconButton, InputAdornment, InputLabel, List, ListItem, ListItemButton, ListItemText, OutlinedInput } from "@mui/material";
import { JSX, useState } from "react";
import { IAnimeList } from "../../list-db/db.model";
import { AnimeList } from "./../../list-db/list.db";
import { SearchableListProps } from './SearchableList.props';
import PopOverFilter from './PopOverFilter';

const SearchableList = (props: SearchableListProps): JSX.Element => {
    const { onSelect } = props;

    const [list, setList] = useState<Array<IAnimeList>>(AnimeList);

    const handleSearch = (event: any) => {
        const searchTerm = event.target.value.trim();

        if (!searchTerm) {
            setList(AnimeList);
            return;
        }

        const regex = new RegExp(searchTerm, "i");
        const result = AnimeList.filter(x => regex.test(x.Title) || x.AlternateTitles.some(title => regex.test(title)));

        setList(result);
    }

    const handleSelect = (item: IAnimeList) => {
        onSelect(item);
    }

    const handleFilter = (type: string, value: string) => {
        console.log(value);
        switch (type) {
            case 'alphabet':
                const alphabeticalResult = AnimeList.filter(x => x.Title.startsWith(value));
                setList(alphabeticalResult);
                break;
            case 'genre':
                const genreFilteredList = AnimeList.filter(x => x.Genre.some(g => g === value));
                setList(genreFilteredList);
                break;
            case 'theme':
                const themeFilteredList = AnimeList.filter(x => x.Theme.some(g => g === value));
                setList(themeFilteredList);
                break;
            default:
                setList(AnimeList);
                break;
        }
    }

    return (
        <>
            <PopOverFilter onFilter={handleFilter} />

            <FormControl sx={{ m: 1, width: '95%' }} variant="outlined">
                <InputLabel htmlFor="anime-search">Search</InputLabel>
                <OutlinedInput
                    id="anime-search"
                    type={'text'}
                    size="small"
                    onChange={handleSearch}
                    startAdornment={
                        <InputAdornment position="start">
                            <IconButton
                                edge="end"
                            >
                                <SearchIcon fontSize="small" />
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Search"
                />
            </FormControl>
            <List dense sx={{ overflowX: `hidden`, overflowY: `scroll`, height: `95%` }}>
                {
                    list.map(x => (
                        <ListItem key={x.Title}>
                            <ListItemButton
                                onClick={() => handleSelect(x)}

                            >
                                <ListItemText primary={x.Title} />

                                {
                                    x.OnDvd ?
                                        <Chip size='small' label="DVD" color="primary" variant="outlined" /> : null
                                }
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </>
    );
}

export default SearchableList;
