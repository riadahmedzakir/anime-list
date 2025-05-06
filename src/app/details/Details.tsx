import { JSX } from "react";
import { DetailstProps } from "./Details.props";
import { Avatar, Box, Card, CardActionArea, CardContent, CardMedia, Divider, Grid, Typography } from "@mui/material";
import Episodes from "../episodes/Episodes";

const Details = (props: DetailstProps): JSX.Element => {
    const { item, type, handleRelated } = props;

    return (
        <>
            {item && (
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm="auto">
                            <Typography variant="h4">{item.Title}</Typography>
                        </Grid>
                        {item.IsAdultRated && (
                            <Grid item>
                                <Avatar sx={{ width: 30, height: 30 }} src="18-plus.svg" />
                            </Grid>
                        )}
                    </Grid>

                    <Typography variant="subtitle2" sx={{ mt: 1 }}>
                        Alternate Title: {item.AlternateTitles.join(', ')}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" fontStyle="italic" sx={{ mb: 1 }}>
                        Synopsis
                    </Typography>

                    {item.Descriptions.map((x, idx) => (
                        <Typography key={idx} variant="body1" sx={{ mb: 2 }}>
                            {x}
                        </Typography>
                    ))}

                    <Divider sx={{ width: '70%', mx: 'auto', my: 4 }} />

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={2}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image={`./${import.meta.env.BASE_URL}/${item.Cover}.jpg`}
                                        alt={item.Title || 'Image'}
                                        sx={{
                                            width: '100%',
                                            height: 450,
                                            objectFit: 'cover',
                                            borderRadius: 2,
                                        }}
                                    />
                                </CardActionArea>
                            </Card>

                            <Box sx={{ mt: 2 }}>
                                {[
                                    ['Episodes', item.Episodes],
                                    ['Aired', item.Aired],
                                    ['Studios', item.Studios.join(', ')],
                                    ['Genre', item.Genre.join(', ')],
                                    ['Theme', item.Theme.length ? item.Theme.join(', ') : 'None'],
                                ].map(([label, value]) => (
                                    <Grid container key={label} sx={{ mb: 1 }}>
                                        <Grid item xs={4}>
                                            <Typography variant="body2" fontWeight="bold">
                                                {label}:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography variant="body2">{value}</Typography>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={8} sx={{ order: { xs: 2, md: 1 } }}>
                            <Episodes title={item.Title} type={type} />
                        </Grid>

                        {item.Related.length ? (
                            <Grid item xs={12} md={2} sx={{ order: { xs: 1, md: 2 } }}>
                                <Typography variant="button" display="block" gutterBottom>
                                    Related items
                                </Typography>
                                {
                                    item.Related.map((x) => (
                                        <Card key={x.Title} sx={{ mb: 1 }} onClick={() => handleRelated(x.Title)}>
                                            <CardActionArea>
                                                <CardContent>
                                                    <Typography variant="caption">{x.Type}</Typography>
                                                    <Typography variant="subtitle1">{x.Title}</Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    ))
                                }
                            </Grid>
                        ) : (
                            <Grid item xs={false} md={3} sx={{ order: { xs: 1, md: 2 } }}></Grid>
                        )}
                    </Grid>
                </>
            )}
        </>

    );
}

export default Details;
