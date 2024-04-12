import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import React, { useEffect, useState } from "react";

const Insurance = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const [background, setBackground] = useState("#e8e8e8");

useEffect(() => {
  const mode = theme.palette.mode;
  const newBackground = mode === "dark" ? "#333333" : "#e8e8e8";
  setBackground(newBackground);
}, [theme.palette.mode]);

  return (
    <Box m="20px" sx={{ backgroundColor :  background,  
    width: "90%", height: "80vh", 
    marginTop: "90px", borderRadius: "10px",}}>
    <Box m="20px">
     <Header
 
  subtitle={
    <Typography variant="h3" sx={{ textAlign: "center", marginTop: "70px"}}>
      Operation done
    </Typography>
  }
/>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
                 <TextField
                fullWidth
                type="text"
                label="Vehicle"
                onBlur={handleBlur}
                onChange={handleChange}
                name="Vehicule"
                error={!!touched.Driver && !!errors.Driver}
                helperText={touched.Driver && errors.Driver}
                sx={{ gridColumn: "span 2",  marginTop: "60px" }}
              />
             <TextField
            fullWidth
            type="text"
            label="Panne"
            onBlur={handleBlur}
            onChange={handleChange}
            name="Panne"
            error={!!touched.Vehicle && !!errors.Vehicle}
            helperText={touched.Vehicle && errors.Vehicle}
            sx={{ gridColumn: "span 2",  marginTop: "60px"  }}
/>

              <TextField
                fullWidth
                type="text"
                label="operation"
                onBlur={handleBlur}
                onChange={handleChange}
                name="operation"
                error={!!touched.Requester && !!errors.Requester}
                helperText={touched.Requester && errors.Requester}
                sx={{ gridColumn: "span 2",  marginTop: "60px"  }}
              />
              <TextField
                fullWidth
                type="text"
                label="Price for labor"
                onBlur={handleBlur}
                onChange={handleChange}
                name="Price for labor"
                error={!!touched.Destination && !!errors.Destination}
                helperText={touched.Destination && errors.Destination}
                sx={{ gridColumn: "span 2",  marginTop: "60px" }}
              />
               
               <TextField
                fullWidth
                type="text"
                label="Spare part"
                onBlur={handleBlur}
                onChange={handleChange}
                name="Spare part"
                error={!!touched.Destination && !!errors.Destination}
                helperText={touched.Destination && errors.Destination}
                sx={{ gridColumn: "span 2",  marginTop: "60px" }}
              />

               <TextField
                fullWidth
                type="text"
                label="Price"
                onBlur={handleBlur}
                onChange={handleChange}
                name="Price"
                error={!!touched.Destination && !!errors.Destination}
                helperText={touched.Destination && errors.Destination}
                sx={{ gridColumn: "span 2",  marginTop: "60px" }}
              />

               <TextField
                fullWidth
                type="text"
                label="Garage"
                onBlur={handleBlur}
                onChange={handleChange}
                name="Garage"
                error={!!touched.Destination && !!errors.Destination}
                helperText={touched.Destination && errors.Destination}
                sx={{ gridColumn: "span 2",  marginTop: "60px" }}
              />
               
            
                <TextField
                fullWidth
                type="text"
                label="Total Price"
                onBlur={handleBlur}
                onChange={handleChange}
                name="Total Price"
                error={!!touched.Destination && !!errors.Destination}
                helperText={touched.Destination && errors.Destination}
                sx={{ gridColumn: "span 2",  marginTop: "60px" }}
              />
               
                
            </Box>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '60px' }}>
      <Button type="submit" color="secondary" variant="contained" style={{ marginRight: '40px' }}>
        Save
      </Button>
      <Button type="submit" color="secondary" variant="contained">
        Cancel
      </Button>
    </div>
          </form>
        )}
      </Formik>
    </Box>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

export default Insurance;
