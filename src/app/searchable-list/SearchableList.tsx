// import styles from './app.module.scss';

import SearchIcon from '@mui/icons-material/Search';
import { Chip, FormControl, IconButton, InputAdornment, InputLabel, List, ListItem, ListItemButton, ListItemText, OutlinedInput, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { JSX, useState } from "react";
import { IList } from "../../list-db/db.model";
import { AnimeList } from "../../list-db/anime-list.db";
import { HentaiList } from "../../list-db/hentai-list.db";
import { GameList } from "../../list-db/games-list.db";
import { EdList } from "../../list-db/3d-list.db";
import { SearchableListProps } from './SearchableList.props';
import PopOverFilter from './PopOverFilter';

const SearchableList = (props: SearchableListProps): JSX.Element => {
    const { onSelect } = props;

    const [selectedList, setSelectedList] = useState<Array<IList>>(AnimeList);
    const [list, setList] = useState<Array<IList>>(selectedList);
    const [listType, setListType] = useState<string>('anime');

    const handleSearch = (event: any) => {
        const searchTerm = event.target.value.trim();

        if (!searchTerm) {
            setList(selectedList);
            return;
        }

        const regex = new RegExp(searchTerm, "i");
        const result = selectedList.filter(x => regex.test(x.Title) || x.AlternateTitles.some(title => regex.test(title)));

        setList(result);
    }

    const handleSelect = (item: IList) => {
        onSelect(item, listType);
    }

    const handleFilter = (type: string, value: string) => {
        switch (type) {
            case 'alphabet':
                const alphabeticalResult = selectedList.filter(x => x.Title.startsWith(value));
                setList(alphabeticalResult);
                break;
            case 'genre':
                const genreFilteredList = selectedList.filter(x => x.Genre.some(g => g === value));
                setList(genreFilteredList);
                break;
            case 'theme':
                const themeFilteredList = selectedList.filter(x => x.Theme.some(g => g === value));
                setList(themeFilteredList);
                break;
            default:
                setList(selectedList);
                break;
        }
    }

    const handleListTypeChange = (event: React.MouseEvent<HTMLElement>, type: string | null,) => {
        switch (type) {
            case 'anime':
                setSelectedList(AnimeList);
                setList(AnimeList);
                setListType(`anime`);
                break;
            case 'hentai':
                setSelectedList(HentaiList);
                setList(HentaiList);
                setListType(`hentai`);
                break;
            case '3d':
                setSelectedList(EdList);
                setList(EdList);
                setListType(`3d`);
                break;
            case 'games':
                setSelectedList(GameList);
                setList(GameList);
                setListType(`games`);
                break;
            default:
                setSelectedList(AnimeList);
                setList(AnimeList);
                setListType(`anime`);
                break;
        }
    };

    return (
        <>
            <PopOverFilter type={listType} onFilter={handleFilter} />

            <ToggleButtonGroup exclusive size="small" color="primary" sx={{ width: '95%', m: 1 }} value={listType} onChange={handleListTypeChange}>
                <ToggleButton value="anime" sx={{ flex: 1 }}>
                    Anime
                </ToggleButton>
                <ToggleButton value="hentai" sx={{ flex: 1 }}>
                    Hentai
                </ToggleButton>
                <ToggleButton value="3d" sx={{ flex: 1 }}>
                    3D
                </ToggleButton>
                <ToggleButton value="games" sx={{ flex: 1 }}>
                    Games
                </ToggleButton>
            </ToggleButtonGroup>

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
