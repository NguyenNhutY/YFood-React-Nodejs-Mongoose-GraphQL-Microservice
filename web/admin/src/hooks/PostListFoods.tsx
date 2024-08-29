import React from "react";
import { useDataGrid, List, EditButton } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// Define the columns based on the provided data
const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", type: "string", width: 90 },
  { field: "name", headerName: "Name", minWidth: 200, flex: 1 },
  { field: "price", headerName: "Price", type: "number", width: 120 },
  { field: "category", headerName: "Category", minWidth: 150, flex: 1 },
  {
    field: "actions",
    headerName: "Actions",
    renderCell: (params) => (
      <EditButton size='small' recordItemId={params.row.id} />
    ),
    align: "center",
    headerAlign: "center",
    minWidth: 80,
  },
];

// Define the interface based on the provided data structure
interface IPost {
  id: number;
  name: string;
  price: number;
  category: string;
}

// Example data to use in the DataGrid
const posts: IPost[] = [
  // Add more data as needed
];

const PostListFoods: React.FC = () => {
  const { dataGridProps } = useDataGrid<IPost>();

  // You may want to use real data fetching logic here
  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} rows={posts} autoHeight />
    </List>
  );
};

export default PostListFoods;
