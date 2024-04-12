import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Grid
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
      <Button
  type="submit"
  color="secondary"
  variant="contained"
  style={{ marginRight: '10px', marginBottom: '-30px' }}
  onClick={handleOpenDialog}
>
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
      <Dialog open={open} onClose={handleCloseDialog} sx={{ "& .MuiDialog-paper": { width: "15cm", height: "10cm" } }}>
      <DialogTitle>
    <Box display="flex" justifyContent="center">
      <Typography variant="h2" component="div" fontWeight="bold">
        Create New Personnel
      </Typography>
    </Box>
  </DialogTitle>
  <DialogContent>
    <form style={{ width: "100%", height: "80%" }}>
      <Grid container spacing={1} style={{ height: "100%", marginTop: "20px" }}>
        <Grid item xs={6}>
          <Box height="100%">
          <Typography variant="h6" style={{ marginBottom: "10px" }}>Name</Typography>
            <input type="text" placeholder="Name" style={{ width: "90%", height: "40%" }} />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box height="100%">
          <Typography variant="h6" style={{ marginBottom: "10px" }}>e-mail</Typography>
            <input type="text" placeholder="dogo@gmail.com" style={{ width: "100%", height: "40%" }} />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box height="100%">
          <Typography variant="h6" style={{ marginBottom: "10px" }}>Phone number</Typography>
            <input type="text" placeholder="your phone number" style={{ width: "90%", height: "40%" }} />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box height="100%">
          <Typography variant="h6" style={{ marginBottom: "10px" }}>Signature</Typography>
            <input type="text" placeholder="XXXXXXXXXXXX" style={{ width: "100%", height: "40%" }} />
          </Box>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="flex-end" mt={1} style={{ width: "100%", marginBottom: "20px" }}>
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