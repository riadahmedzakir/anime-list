import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import FilterListIcon from '@mui/icons-material/FilterList';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Button, ButtonGroup, Chip, Divider, Fade, Grid, IconButton, Paper, Popper, Typography } from "@mui/material";
import { JSX, useEffect, useState } from "react";
import { EdList } from '../../list-db/3d-list.db';
import { AnimeList } from '../../list-db/anime-list.db';
import { AnimationList } from '../../list-db/animation-list.db';
import { HentaiList } from '../../list-db/hentai-list.db';
import { PopOverFilterProps } from './PopOverFilter.props';

const PopOverFilter = (props: PopOverFilterProps): JSX.Element => {
    const alphabetGroup1 = Array.from({ length: 8 }, (_, i) => String.fromCharCode(65 + i));
    const alphabetGroup2 = Array.from({ length: 8 }, (_, i) => String.fromCharCode(73 + i));
    const alphabetGroup3 = Array.from({ length: 8 }, (_, i) => String.fromCharCode(81 + i));
    const alphabetGroup4 = Array.from({ length: 2 }, (_, i) => String.fromCharCode(89 + i));

    const { type, onFilter } = props;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selected, setSelected] = useState<{ type: string, value: string }>();
    const [genres, setGenres] = useState([...new Set(AnimeList.flatMap(anime => anime.Genre))].sort());
    const [themes, setThemes] = useState([...new Set(AnimeList.flatMap(anime => anime.Theme))].sort());

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFilter = (type: string, value: string) => {
        setSelected({ type, value });
        onFilter(type, value);
        setAnchorEl(null);
    }

    const handleReset = () => {
        setSelected({ type: '', value: '' });
        onFilter('', '')
    }

    useEffect(() => {
        switch (type) {
            case 'anime':
                setGenres([...new Set(AnimeList.flatMap(anime => anime.Genre))].sort());
                setThemes([...new Set(AnimeList.flatMap(anime => anime.Theme))].sort());
                break;
            case 'hentai':
                setGenres([...new Set(HentaiList.flatMap(anime => anime.Genre))].sort());
                setThemes([...new Set(HentaiList.flatMap(anime => anime.Theme))].sort());
                break;
            case '3d':
                setGenres([...new Set(EdList.flatMap(anime => anime.Genre))].sort());
                setThemes([...new Set(EdList.flatMap(anime => anime.Theme))].sort());
                break;
            case 'animation':
                setGenres([...new Set(AnimationList.flatMap(anime => anime.Genre))].sort());
                setThemes([...new Set(AnimationList.flatMap(anime => anime.Theme))].sort());
                break;
            default:
                setGenres([...new Set(AnimeList.flatMap(anime => anime.Genre))].sort());
                setThemes([...new Set(AnimeList.flatMap(anime => anime.Theme))].sort());
                break;
        }
    }, [type])

    return (
        <Grid container justifyContent={'space-between'} alignItems={'center'} sx={{ px: 1.8 }}>

            <Grid item>
                {
                    selected?.type ?
                        <IconButton color="error" onClick={handleReset}>
                            <RestartAltIcon />
                        </IconButton> : null
                }
            </Grid>

            <Grid item>
                <Button
                    size="small"
                    variant="outlined"
                    endIcon={<FilterListIcon />}
                    onClick={handleClick}
                >
                    Filter
                </Button>
                <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} transition placement={'right-end'}
                    sx={{ width: "500px" }}
                    modifiers={[
                        {
                            name: 'arrow',
                            enabled: true,
                            options: {
                                element: anchorEl,
                            },
                        }
                    ]}>
                    {({ TransitionProps }) => (
                        <ClickAwayListener onClickAway={handleClose}>
                            <Fade {...TransitionProps}>
                                <Paper sx={{ p: 2 }} >
                                    <Typography variant='body2' fontWeight={'bold'}>
                                        Starts With
                                    </Typography>
                                    <Divider sx={{ mb: 1 }} />

                                    <Grid container gap={1} justifyContent={'center'}>
                                        <Grid item>
                                            <ButtonGroup size='small' variant='text'>
                                                {alphabetGroup1.map((letter) => (
                                                    <Button key={letter} onClick={() => handleFilter(`alphabet`, letter)}>
                                                        {letter}
                                                    </Button>
                                                ))}
                                            </ButtonGroup>

                                        </Grid>

                                        <Grid item>
                                            <ButtonGroup size='small' variant='text'>
                                                {alphabetGroup2.map((letter) => (
                                                    <Button key={letter} onClick={() => handleFilter(`alphabet`, letter)}>
                                                        {letter}
                                                    </Button>
                                                ))}
                                            </ButtonGroup>
                                        </Grid>

                                        <Grid item>
                                            <ButtonGroup size='small' variant='text'>
                                                {alphabetGroup3.map((letter) => (
                                                    <Button key={letter} onClick={() => handleFilter(`alphabet`, letter)}>
                                                        {letter}
                                                    </Button>
                                                ))}
                                            </ButtonGroup>
                                        </Grid>

                                        <Grid item xs={8.15}>
                                            <ButtonGroup size='small' variant='text'>
                                                {alphabetGroup4.map((letter) => (
                                                    <Button key={letter} onClick={() => handleFilter(`alphabet`, letter)}>
                                                        {letter}
                                                    </Button>
                                                ))}
                                            </ButtonGroup>
                                        </Grid>
                                    </Grid>

                                    {
                                        type == 'anime' || type == 'hentai' ?
                                            <>
                                                <Typography variant='body2' fontWeight={'bold'} sx={{ mt: 1 }}>
                                                    Filter by Genre
                                                </Typography>
                                                <Divider sx={{ mb: 1 }} />

                                                <Grid container spacing={1}>
                                                    {
                                                        genres.map(x => (
                                                            <Grid key={x} item>
                                                                <Chip
                                                                    size="small"
                                                                    label={x}
                                                                    variant="outlined"
                                                                    sx={{
                                                                        height: 30,
                                                                        minWidth: 60,
                                                                        borderRadius: 0,
                                                                        fontSize: '0.875rem',
                                                                    }}
                                                                    onClick={() => handleFilter(`genre`, x)}
                                                                />
                                                            </Grid>
                                                        ))
                                                    }
                                                </Grid>
                                            </> : null
                                    }

                                    {
                                        type == 'anime' ?
                                            <>
                                                <Typography variant='body2' fontWeight={'bold'} sx={{ mt: 1 }}>
                                                    Filter by Themes
                                                </Typography>
                                                <Divider sx={{ mb: 1 }} />

                                                <Grid container spacing={1}>
                                                    {
                                                        themes.map(x => (
                                                            <Grid key={x} item>
                                                                <Chip
                                                                    size="small"
                                                                    label={x}
                                                                    variant="outlined"
                                                                    sx={{
                                                                        height: 30,
                                                                        minWidth: 60,
                                                                        borderRadius: 0,
                                                                        fontSize: '0.875rem',
                                                                    }}
                                                                    onClick={() => handleFilter(`theme`, x)}
                                                                />
                                                            </Grid>
                                                        ))
                                                    }
                                                </Grid>
                                            </> : null
                                    }
                                </Paper>
                            </Fade>
                        </ClickAwayListener>
                    )}
                </Popper>
            </Grid>
        </Grid>
    )
}

export default PopOverFilter;