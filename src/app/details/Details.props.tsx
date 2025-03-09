import { IAnimeList } from "src/list-db/db.model";

export interface DetailstProps {
    item?: IAnimeList;
    handleRelated: (title: string) => void
}