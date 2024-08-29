import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";

export const FoodsList = () => {
  const { dataGridProps } = useDataGrid({});

  const columns: GridColDef[] = React.useMemo(
    () => [
      {
        field: "_id",
        headerName: "ID",
        type: "string",
        minWidth: 50,
      },
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        minWidth: 200,
      },
      {
        field: "price",
        headerName: "Price",
        type: "number",
        minWidth: 100,
        valueFormatter: ({ value }) => `$${value.toFixed(2)}`, // Hiển thị giá dưới dạng tiền tệ
      },
      {
        field: "category",
        headerName: "Category",
        flex: 1,
        minWidth: 150,
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: ({ row }) => (
          <>
            <EditButton hideText recordItemId={row._id} />

            <ShowButton hideText recordItemId={row._id} />
            <DeleteButton hideText recordItemId={row._id} />
          </>
        ),
        align: "center",
        headerAlign: "center",
        minWidth: 150,
      },
    ],
    []
  );

  // Ensure to include getRowId prop
  return (
    <List>
      <DataGrid
        {...dataGridProps}
        columns={columns}
        autoHeight
        getRowId={(row) => row._id} // Specify the custom ID field
      />
    </List>
  );
};
