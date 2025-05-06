// import styles from './app.module.scss';

import { Grid } from "@mui/material";
import { JSX, useState } from "react";
import { AnimeList } from "../../list-db/anime-list.db";
import { IList } from "../../list-db/db.model";
import Details from "../details/Details";
import SearchableList from "../searchable-list/SearchableList";
import TopBar from "../top-bar/TopBar";
import { useLock } from "./../../hooks/useLockContext";

const Home = (): JSX.Element => {
  const { locked } = useLock();

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
        <Grid
          item
          xs={12}
          md={2}
          sx={{
            borderRight: { xs: 'none', md: '1px solid #c8d1e0' },
            borderBottom: { xs: '1px solid #c8d1e0', md: 'none' },
            height: { md: '92vh' },
            mb: { xs: 2, md: 0 }
          }}
        >
          <SearchableList onSelect={handleSelect} locked={locked} />
        </Grid>

        <Grid
          item
          xs={12}
          md={10}
          sx={{ px: { xs: 0, md: 2 } }}
        >
          <Details item={selected} type={type} handleRelated={handleRelated} />
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
