import { IList } from "src/list-db/db.model";

export interface DetailstProps {
    item?: IList;
    type: string;
    handleRelated: (title: string) => void
}