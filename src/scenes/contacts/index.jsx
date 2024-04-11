import React, { useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Menu, MenuItem } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { FormControl, FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const navigate = useNavigate(); 

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const handleActionClick = (action) => {
    if (action === "View Details") {
      navigate(`/VehicleDetail/${selectedRowId}`);
    } else if (action === "Vehicle Status") {
      setStatusDialogOpen(true);
    } else {
      console.log(`Clicked on ${action} for row with id: ${selectedRowId}`);
    }
    handleMenuClose();
  };
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Vehicle ID" },
    {
      field: "name",
      headerName: "Make",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Model",
      flex: 1,
    },
    {
      field: "address",
      headerName: "License Plate",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Car chassis Number",
      flex: 1,
      renderCell: (params) => (
        <>
          {params.value}
          <IconButton
            aria-label="more"
            aria-haspopup="true"
            style={{ marginLeft: "auto" }}
            onClick={(event) => handleMenuClick(event, params.id)}
          >
            <MoreVertIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="VEHICLES" subtitle="Vehicle list" />
      <Box display="flex" justifyContent="flex-end" mt="20px">
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          style={{ marginRight: "10px", marginBottom: "-30px" }}
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

<Dialog open={statusDialogOpen} onClose={() => setStatusDialogOpen(false)}>
  <DialogTitle>Vehicle Status</DialogTitle>
  <DialogContent>
    <FormControl>
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="Eau" />
        <FormControlLabel control={<Checkbox />} label="Lubrifiant" />
        <FormControlLabel control={<Checkbox />} label="Contrôle technique" />
        <FormControlLabel control={<Checkbox />} label="Freins" />
      </FormGroup>
    </FormControl>
  </DialogContent>
</Dialog>

        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Create New Vehicle</DialogTitle>
        <DialogContent>
          <form>
          <TextField
            fullWidth
            type="text"
            label="Make"
            onBlur={handleBlur}
            onChange={handleChange}
            name="Make"
            error={!!touched.Vehicle && !!errors.Vehicle}
            helperText={touched.Vehicle && errors.Vehicle}
            sx={{ gridColumn: "span 2",  marginTop: "20px"  }}
/>
              <TextField
                fullWidth
                type="text"
                label="Model"
                onBlur={handleBlur}
                onChange={handleChange}
                name="Model"
                sx={{ gridColumn: "span 2",  marginTop: "20px"  }}
              />
              <TextField
                fullWidth
                type="text"
                label="License plate"
                onBlur={handleBlur}
                onChange={handleChange}
                name="License plate"
                sx={{ gridColumn: "span 2",  marginTop: "30px"  }}
              />
              <TextField
                fullWidth
                type="text"
                label="Fuel"
                onBlur={handleBlur}
                onChange={handleChange}
                name="Fuel"
                sx={{ gridColumn: "span 2",  marginTop: "30px" }}
              />
              
              <TextField
                fullWidth
                type="text"
                label="Chassis number"
                onBlur={handleBlur}
                onChange={handleChange}
                name="Chassis number"
                sx={{ gridColumn: "span 2",  marginTop: "30px" }}
              />
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
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleActionClick("View Details")}>View Details</MenuItem>
        <MenuItem onClick={() => handleActionClick("Vehicle Status")}>Vehicle Status</MenuItem>
        <MenuItem onClick={() => handleActionClick("Rename")}>Rename</MenuItem>
        <MenuItem onClick={() => handleActionClick("Delete")}>Delete</MenuItem>
      </Menu>
      
    </Box>
  );
};

export default Contacts;













