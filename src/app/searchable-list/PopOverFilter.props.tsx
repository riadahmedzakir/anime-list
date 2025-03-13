export interface PopOverFilterProps {
    type: string;
    onFilter: (type: string, value: string) => void;
}