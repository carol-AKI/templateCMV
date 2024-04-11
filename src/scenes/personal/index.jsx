import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

const Personal = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "PersonalId", headerName: "Personal ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "signature",
      headerName: "Signature",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="PERSONAL" subtitle="Personal list" />
      <Box display="flex" justifyContent="flex-end" mt="10px">
      <Button type="submit" color="secondary" variant="contained" style={{ marginRight: '10px', marginBottom: '-30px' }}>
        Create
      </Button>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            cursor: "pointer",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Create new Personal</DialogTitle>
        <DialogContent>
          <form>
            <Box mb={2}>
              <input type="text" placeholder="Name" />
            </Box>
            <Box mb={2}>
              <input type="text" placeholder="Email" />
            </Box>
            <Box mb={2}>
              <input type="text" placeholder="Address" />
            </Box>
            <Box mb={2}>
              <input type="text" placeholder="Phone Number" />
            </Box>
            <Box mb={2}>
              <input type="text" placeholder="Signature" />
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <IconButton onClick={handleCloseDialog}>
                <CloseIcon />
              </IconButton>
              <IconButton onClick={handleCloseDialog}>
                <CheckIcon />
              </IconButton>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Personal;