import { useState } from 'react';
import {
    DataGrid,
    type DataGridProps,
    type GridColDef,
    type GridValidRowModel,
    type GridPaginationModel,
} from '@mui/x-data-grid';

export type CenteredDataGridProps<R extends GridValidRowModel> =
    Omit<DataGridProps<R>, 'columns'> & {
        columns: GridColDef<R>[];
        rowHeight?: number;
        columnHeaderHeight?: number;
        embedPagination?: boolean;
        defaultPage?: number;
        defaultPageSize?: number;
        defaultPageSizeOptions?: number[];
    };

const CenteredDataGrid = <R extends GridValidRowModel>({
    columns,
    rowHeight = 52,
    columnHeaderHeight = 56,
    embedPagination = true,
    defaultPage = 0,
    defaultPageSize = 8,
    defaultPageSizeOptions = [5, 8, 12, 20],
    sx,
    ...rest
}: CenteredDataGridProps<R>) => {

    const {
        pagination: paginationProp,
        paginationModel: paginationModelProp,
        onPaginationModelChange: onPaginationModelChangeProp,
        pageSizeOptions: pageSizeOptionsProp,
        ...restProps
    } = rest;

    const isControlled = paginationModelProp !== undefined || onPaginationModelChangeProp !== undefined;

    const [internalPagination, setInternalPagination] = useState<GridPaginationModel>({
        page: defaultPage,
        pageSize: defaultPageSize,
    });

    return (
        <DataGrid
            columns={columns}
            rowHeight={rowHeight}
            columnHeaderHeight={columnHeaderHeight}
            disableRowSelectionOnClick
            pagination={paginationProp ?? (embedPagination || isControlled ? true : undefined)}
            pageSizeOptions={pageSizeOptionsProp ?? defaultPageSizeOptions}
            {...(isControlled
                ? {
                    paginationModel: paginationModelProp,
                    onPaginationModelChange: onPaginationModelChangeProp,
                }
                : embedPagination
                    ? {
                        paginationModel: internalPagination,
                        onPaginationModelChange: (m) => setInternalPagination(m),
                    }
                    : {})}
            {...restProps}
            sx={{
                '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
                    display: 'flex',
                    alignItems: 'center',
                },
                ...sx,
            }}
        />
    );
};

export default CenteredDataGrid;