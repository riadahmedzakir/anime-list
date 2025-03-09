import { JSX } from "react";
import { DetailstProps } from "./Details.props";
import { Avatar, Card, CardActionArea, CardContent, CardMedia, Divider, Grid, Typography } from "@mui/material";
import Episodes from "../episodes/Episodes";

const Details = (props: DetailstProps): JSX.Element => {
    const { item, handleRelated } = props;

    return (
        <>
            {
                item ?
                    <>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Typography variant="h4">
                                    {item.Title}

                                </Typography>
                            </Grid>
                            {
                                item.IsAdultRated ?
                                    <Grid item>
                                        <Avatar sx={{ width: 30, height: 30 }} src="18-plus.svg" />
                                    </Grid> : null
                            }
                        </Grid>
                        <Typography variant="subtitle2">
                            Alternate Title : {item.AlternateTitles.join(', ')}
                        </Typography>

                        <Divider />

                        <Grid container>
                            <Grid item>
                                <Typography variant="h6" fontStyle={"italic"} sx={{ my: 1 }}>
                                    Synopsis
                                </Typography>

                                {
                                    item.Descriptions.map(x => (
                                        <Typography key={x} variant="body1" sx={{ mb: 2 }}>
                                            {x}
                                        </Typography>
                                    ))
                                }
                            </Grid>

                            <Grid item xs={12} sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
                                <Divider sx={{ width: '70%' }} />
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container alignItems={'start'} spacing={2}>
                                    <Grid item xs={2}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Card sx={{ maxWidth: 345 }}>
                                                    <CardActionArea>
                                                        <CardMedia
                                                            component="img"
                                                            height="100%"
                                                            width="100%"
                                                            image={`./${import.meta.env.BASE_URL}/${item.Cover}.jpg`}
                                                        />
                                                    </CardActionArea>
                                                </Card>
                                            </Grid>

                                            <Grid item xs={12} sx={{ mt: 2 }}>
                                                <Grid container>
                                                    <Grid item xs={4}>
                                                        <Typography variant="body2">
                                                            <b>Episodes</b> :
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={8}>
                                                        <Typography variant="body2">
                                                            {item.Episodes}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>

                                                <Grid container>
                                                    <Grid item xs={4}>
                                                        <Typography variant="body2">
                                                            <b>Aired</b> :
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={8}>
                                                        <Typography variant="body2">
                                                            {item.Aired}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>

                                                <Grid container>
                                                    <Grid item xs={4}>
                                                        <Typography variant="body2">
                                                            <b>Studios</b> :
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={8}>
                                                        <Typography variant="body2">
                                                            {item.Studios.join(", ")}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>

                                                <Grid container>
                                                    <Grid item xs={4}>
                                                        <Typography variant="body2">
                                                            <b>Genre</b> :
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={8}>
                                                        <Typography variant="body2">
                                                            {item.Genre.join(", ")}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>

                                                <Grid container>
                                                    <Grid item xs={4}>
                                                        <Typography variant="body2">
                                                            <b>Theme</b> :
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={8}>
                                                        <Typography variant="body2">
                                                            {item.Theme.length ? item.Theme.join(", ") : 'None'}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={8}>
                                        <Episodes title={item.Title} />
                                    </Grid>

                                    {
                                        item.Related.length ?
                                            <Grid item xs={2}>
                                                <Typography variant="button">
                                                    Related items
                                                </Typography>


                                                {
                                                    item.Related.map(x => (
                                                        <Card key={x.Title} sx={{ mb: 1 }} onClick={() => handleRelated(x.Title)}>
                                                            <CardActionArea>
                                                                <CardContent sx={{ height: '100%' }}>
                                                                    <Typography variant="caption" component="div">
                                                                        {x.Type}
                                                                    </Typography>

                                                                    <Typography variant="subtitle1" component="div">
                                                                        {x.Title}
                                                                    </Typography>
                                                                </CardContent>
                                                            </CardActionArea>
                                                        </Card>
                                                    ))
                                                }

                                            </Grid> : <Grid item xs={3}></Grid>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </>
                    : null
            }
        </>
    );
}

export default Details;
