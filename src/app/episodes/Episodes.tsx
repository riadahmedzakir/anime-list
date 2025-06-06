import { Box, styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { JSX, useEffect, useState } from "react";
import { IEpisodeList } from "src/list-db/db.model";
import { AnimeEpisodeList } from "../../list-db/anime-episode.list.db";
import { HentaiEpisodeList } from "../../list-db/hentai-episode.list.db";
import { EpisodesProps } from "./Episodes.props";

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
    const { title, type } = props;

    const [columns, setColumns] = useState<any>([]);
    const [rows, setRows] = useState<any>([]);
    const [selectedList, setSelectedList] = useState<{ [key: string]: Array<IEpisodeList> }>();

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
                headerClassName: 'episode-list-header',
                headerAlign: 'center',
                align: "center",
                display: 'flex',
                editable: false,
                flex: x.width ? undefined : 1
            }
        ));

        const rows = selectedList?.[title]?.map((x, index) => (
            {
                id: index,
                ...x
            }
        )) ?? [];

        setColumns(columns);
        setRows(rows);
    }, [title, selectedList]);

    useEffect(() => {
        switch (type) {
            case 'anime':
                setSelectedList(AnimeEpisodeList);
                break;
            case 'hentai':
                setSelectedList(HentaiEpisodeList);
                break;
            default:
                setSelectedList(AnimeEpisodeList);
                break;
        }
    }, [type])

    return (
        <Box
            sx={{
                width: '100%',
                overflowX: { xs: 'auto', md: 'visible' },
                overflowY: { xs: 'auto', md: 'visible' },
            }}
        >
            <StyledDataGrid
                autoHeight
                sx={{
                    width: '100%',
                    minWidth: '600px', // optional: sets a baseline for scroll
                    '& .super-app-theme--header': {
                        backgroundColor: '#000000',
                        color: '#ffffff',
                        fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                    },
                    '& .MuiDataGrid-cell': {
                        fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                        padding: { xs: '4px', sm: '6px', md: '8px' },
                        wordBreak: 'break-word',
                        whiteSpace: 'normal',
                    },
                    '& .MuiDataGrid-row': {
                        maxHeight: 'none !important',
                    },
                }}
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 13,
                        },
                    },
                }}
                getRowHeight={() => 'auto'}
                disableRowSelectionOnClick
                disableColumnSorting
                disableColumnResize
                disableColumnMenu
                hideFooterSelectedRowCount
                density="compact"
                isCellEditable={(params) => params.row.id !== rows.length}
                getRowClassName={(params) =>
                    params.row.id === rows.length
                        ? 'episode-list-table-row-last'
                        : 'episode-list-table-row'
                }
            />
        </Box>

    )
}

export default Episodes;
