import { IAnimeList } from "src/list-db/db.model";

export interface SearchableListProps {
    onSelect: (item: IAnimeList) => void;
}