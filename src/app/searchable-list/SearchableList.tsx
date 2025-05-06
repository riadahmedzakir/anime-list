// import styles from './app.module.scss';

import SearchIcon from '@mui/icons-material/Search';
import { Box, Chip, FormControl, IconButton, InputAdornment, InputLabel, ListItem, ListItemButton, ListItemText, OutlinedInput, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from "@mui/material";
import { JSX, useState } from "react";
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { EdList } from "../../list-db/3d-list.db";
import { AnimeList } from "../../list-db/anime-list.db";
import { IList } from "../../list-db/db.model";
import { GameList } from "../../list-db/games-list.db";
import { HentaiList } from "../../list-db/hentai-list.db";
import { useContainerHeight } from './../../hooks/useContainerHeight';
import PopOverFilter from './PopOverFilter';
import { SearchableListProps } from './SearchableList.props';

const SearchableList = (props: SearchableListProps): JSX.Element => {
    const { locked, onSelect } = props;

    const [selectedList, setSelectedList] = useState<Array<IList>>(AnimeList);
    const [list, setList] = useState<Array<IList>>(selectedList);
    const [listType, setListType] = useState<string>('anime');
    const [selectedItem, setSelectedItem] = useState<IList | null>(null);
    const [containerRef, containerHeight] = useContainerHeight();

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
        setSelectedItem(item);
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

    const renderRow = (props: ListChildComponentProps) => {
        const { index, style, data } = props;
        const item = data[index]

        return (
            <ListItem style={style} key={index} component="div" disablePadding>
                <Tooltip title={item?.Title || ''} placement='top-start' arrow>
                    <ListItemButton
                        selected={selectedItem?.Title === item?.Title}
                        onClick={() => handleSelect(item)}

                    >

                        <ListItemText primary={<Typography
                            noWrap
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                maxWidth: '100%',
                            }}
                        >
                            {item?.Title}
                        </Typography>} />

                        {
                            item?.OnDvd ?
                                <Chip size='small' label="DVD" color="primary" variant="outlined" /> : null
                        }

                    </ListItemButton>
                </Tooltip>
            </ListItem>
        );
    }

    return (
        <>
            <PopOverFilter type={listType} onFilter={handleFilter} />

            <ToggleButtonGroup
                exclusive
                size="small"
                color="primary"
                value={listType}
                onChange={handleListTypeChange}
                sx={{
                    width: '96.5%',
                    my: 1,
                    flexWrap: 'wrap',
                    '& .MuiToggleButton-root': {
                        flex: 1,
                        minWidth: '25%',
                    },
                }}
            >
                {
                    !locked ?
                        <>
                            <ToggleButton value="anime">Anime</ToggleButton>
                            <ToggleButton value="hentai">Hentai</ToggleButton>
                            <ToggleButton value="3d">3D</ToggleButton>
                            <ToggleButton value="games">Games</ToggleButton>
                        </> : null
                }

            </ToggleButtonGroup>

            <FormControl
                variant="outlined"
                size="small"
                sx={{ width: '96.5%', my: 1 }}
            >
                <InputLabel htmlFor="anime-search">Search</InputLabel>
                <OutlinedInput
                    id="anime-search"
                    type="text"
                    onChange={handleSearch}
                    startAdornment={
                        <InputAdornment position="start">
                            <IconButton edge="end">
                                <SearchIcon fontSize="small" />
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Search"
                />
            </FormControl>

            <Typography sx={{ width: '96%', display: 'block' }} variant='caption' align='right'>
                Total {list.length} items found
            </Typography>

            <Box
                ref={containerRef}
                sx={{
                    height: { xs: 'calc(100vh - 500px)', md: '80vh' },
                    width: '100%',
                    mt: 1,
                    overflow: 'auto',
                    bgcolor: 'background.paper',
                }}
            >
                {containerHeight > 0 && (
                    <FixedSizeList
                        height={containerHeight}
                        width="96.5%"
                        itemSize={60}
                        itemCount={list.length}
                        itemData={list}
                        overscanCount={5}
                    >
                        {renderRow}
                    </FixedSizeList>
                )}
            </Box>
        </>
    );
}

export default SearchableList;
