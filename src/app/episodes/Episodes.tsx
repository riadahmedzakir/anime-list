import { styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { JSX, useEffect, useState } from "react";
import { EpisodesProps } from "./Episodes.props";
import { EpisodeList } from "./../..//list-db/episode.list.db";

const StyledDataGrid = styled(DataGrid)(() => ({
    '& .episode-list-table-row-last': {
        background: '#F2F1ED'
    },
    '& .episode-list-table-row': {
        background: '#F2F1ED'
    },
    '& .episode-list-header': {
        backgroundColor: '#000000',
        color: '#FFFFFF'
    },
    '& .MuiDataGrid-cellEmpty': {
        padding: "0px"
    },
    "& .MuiDataGrid-cell:nth-of-type(1)": {
        width: '10px'
    },
    "& .MuiDataGrid-cell": {
        borderLeft: "1px solid #e0e0e0",
    }
}));

const Episodes = (props: EpisodesProps): JSX.Element => {
    const { title } = props;

    const [columns, setColumns] = useState<any>([]);
    const [rows, setRows] = useState<any>([]);

    useEffect(() => {
        const headers = [
            { name: 'Episode', width: 100 },
            { name: 'Title', width: undefined },
            { name: 'Aired', width: 200 },
        ]
        const columns = headers.map(x => (
            {
                field: x.name,
                headerName: x.name,
                width: x.width,
                headerClassName: 'scoreboard-header',
                headerAlign: 'center',
                align: "center",
                display: 'flex',
                editable: false,
                flex: x.width ? undefined : 1
            }
        ));

        const rows = EpisodeList[title]?.map((x, index) => (
            {
                id: index,
                ...x
            }
        )) ?? [];

        setColumns(columns);
        setRows(rows);
    }, [title]);

    return <StyledDataGrid
        sx={{
            width: '100%',
            '& .super-app-theme--header': {
                backgroundColor: '#000000',
                color: '#ffffff'
            },
            '& .MuiDataGrid-cell': {
                fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                padding: { xs: '4px', sm: '8px' },
            },
        }}
        rows={rows}
        columns={columns}
        initialState={{
            pagination: {
                paginationModel: {
                    pageSize: 13
                },
            },
        }}
        getRowHeight={() => 'auto'}
        disableRowSelectionOnClick
        disableColumnSorting
        disableColumnResize
        disableColumnMenu
        hideFooterSelectedRowCount
        density={"compact"}
        isCellEditable={(params) => params.row.id !== rows.length}
        getRowClassName={(params) =>
            params.row.id === rows.length ? 'episode-list-table-row-last' : 'episode-list-table-row'
        }
    />
}

export default Episodes;
