// import styles from './app.module.scss';

import { Grid } from "@mui/material";
import { JSX, useState } from "react";
import SearchableList from "../searchable-list/SearchableList";
import TopBar from "../top-bar/TopBar";
import Details from "../details/Details";
import { IList } from "../../list-db/db.model";
import { AnimeList } from "../../list-db/anime-list.db";

const Home = (): JSX.Element => {
  const [selected, setSelected] = useState<IList>();
  const [type, setType] = useState<string>('anime');

  const handleSelect = (item: IList, type: string) => {
    setSelected(item);
    setType(type);
  }

  const handleRelated = (title: string) => {
    const selected = AnimeList.find(x => x.Title === title);

    setSelected(selected);
  }

  return (
    <>
      <TopBar />

      <Grid container sx={{ p: 2 }}>
        <Grid item xs={2} sx={{ borderRight: '1px solid #c8d1e0', height: '92vh' }}>
          <SearchableList onSelect={handleSelect} />
        </Grid>
        <Grid item xs={10} sx={{ px: 2 }}>
          <Details item={selected} type={type} handleRelated={handleRelated} />
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
