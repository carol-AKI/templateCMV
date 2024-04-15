import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import React, { useEffect, useState } from "react";
import { Api_client } from "../../data/Api";
const Form = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [vehicle, setVehicle] = useState();
  const [demandeur, setDemandeur] = useState();
  const [conducteur, setConducteur] = useState();
  const [kilometrage , setKilometrage] = useState();
  const [destination , setDestination] = useState();
  const [objet, setObjet] = useState();
  const [heure_depart  , setHeureDepart] = useState();
  const [heure_retour , setHeureRetour] = useState();
  const [observation , setObservation] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [data, SetData] = useState([]);

  const [background, setBackground] = useState("#e8e8e8");  

  useEffect(() => {
    const mode = theme.palette.mode;
    const newBackground = mode === "dark" ? "#333333" : "#e8e8e8";
    setBackground(newBackground);
  }, [theme.palette.mode]);

  const handleFormSubmit = async (formData) => {
    try {
      Api_client.post("course/mouvement/",
        formData
      );
    } catch (error) {
      console.error(error);
    }
  };

  const formData = {
    vehicle: vehicle,
    demandeur: demandeur,
    conducteur: conducteur,
    kilometrage: kilometrage,
    destination : destination ,
    objet: objet,
    heure_depart: heure_depart,
    heure_retour: heure_retour,
    observation: observation,
  };

  return (
    <Box m="20px" sx={{ backgroundColor :  background,  
      width: "100%", height: "80vh", 
      marginTop: "90px", borderRadius: "10px",}}>
      <Header title="CREATE RUNNING" subtitle="Create a New Running" />

      <Form
        onSubmit={handleFormSubmit}
       
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
            name="Vehicle"
            error={!!touched.Vehicle && !!errors.Vehicle}
            helperText={touched.Vehicle && errors.Vehicle}
            sx={{ gridColumn: "span 2",  marginTop: "20px", marginLeft:"10px" }}
/>
              <TextField
                fullWidth
                type="text"
                label="Object"
                onBlur={handleBlur}
                onChange={handleChange}
                name="Object"
                error={!!touched.Objet && !!errors.Objet}
                helperText={touched.Objet && errors.Objet}
                sx={{ gridColumn: "span 2",  marginTop: "20px"}}
              />
              <TextField
                fullWidth
                type="text"
                label="Requester"
                onBlur={handleBlur}
                onChange={handleChange}
                name="Requester"
                error={!!touched.Requester && !!errors.Requester}
                helperText={touched.Requester && errors.Requester}
                sx={{ gridColumn: "span 2",  marginTop: "30px",marginLeft:"10px"  }}
              />
              <TextField
                fullWidth
                type="text"
                label="Driver"
                onBlur={handleBlur}
                onChange={handleChange}
                name="Driver"
                error={!!touched.Driver && !!errors.Driver}
                helperText={touched.Driver && errors.Driver}
                sx={{ gridColumn: "span 2",  marginTop: "30px" }}
              />
              
              <TextField
                fullWidth
                type="text"
                label="Destination"
                onBlur={handleBlur}
                onChange={handleChange}
                name="Destination"
                error={!!touched.Destination && !!errors.Destination}
                helperText={touched.Destination && errors.Destination}
                sx={{ gridColumn: "span 2",  marginTop: "30px",marginLeft:"10px" }}
              />

               <TextField
                fullWidth
                type="text"
                label="Mileage"
                onBlur={handleBlur}
                onChange={handleChange}
                name="Mileage"
                error={!!touched.Destination && !!errors.Destination}
                helperText={touched.Destination && errors.Destination}
                sx={{ gridColumn: "span 2",  marginTop: "30px" }}
              />
               <TextField
                fullWidth
                type="text"
                label="Start time"
                onBlur={handleBlur}
                onChange={handleChange}
                name="Start time"
                error={!!touched.TimeTaken && !!errors.TimeTaken}
                helperText={touched.TimeTaken && errors.TimeTaken}
                sx={{ gridColumn: "span 2",  marginTop: "30px",marginLeft:"10px" }}
              />
                 <TextField
                fullWidth
                type="text"
                label="Arriving time"
                onBlur={handleBlur}
                onChange={handleChange}
                name="Arriving time"
                error={!!touched.TimeTaken && !!errors.TimeTaken}
                helperText={touched.TimeTaken && errors.TimeTaken}
                sx={{ gridColumn: "span 2",  marginTop: "30px" }}
              />
                
              <TextField
                fullWidth
                type="text"
                label="Observation"
                onBlur={handleBlur}
                onChange={handleChange}
                name="Observation"
                error={!!touched.Observation && !!errors.Observation}
                helperText={touched.Observation && errors.Observation}
                sx={{ gridColumn: "span 4",  marginTop: "30px",marginLeft:"10px" }}
              />
            </Box>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '60px' }}>
      <Button type="submit" color="secondary" variant="contained" style={{ marginRight: '80px' }}>
        Create
      </Button>
      <Button type="submit" color="secondary" variant="contained"style={{ marginRight: '40px' }}>
        Cancel
      </Button>
    </div>
          </form>
        )}
      </Form>
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

export default Form;
