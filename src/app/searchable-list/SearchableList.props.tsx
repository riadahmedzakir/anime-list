import { IList } from "src/list-db/db.model";

export interface SearchableListProps {
    onSelect: (item: IList, type: string) => void;
    locked: boolean;
}