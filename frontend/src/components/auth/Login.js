import React from "react";
//react router
import { useNavigate } from "react-router-dom";
//styles material UI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Avatar, CssBaseline, Grid, Paper } from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
//formik
import { useFormik } from "formik";
import * as yup from "yup";

//form validation
const validationSchema = yup.object({
  email: yup
    .string("Ingresa tu email")
    .email("Email invalido")
    .required("Se requiere email"),
  password: yup
    .string("Ingresa tu contraseña")
    .min(5, "minimo 5 caracteres")
    .required("Se requiere contraseña"),
});

const Login = () => {
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://raw.githubusercontent.com/DiegoRodriguez-sc/todo_app-frontend/master/src/assets/batleship.png)",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#E2E2E2",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        sx={{ background: "#E2E2E2", color: "#050038" }}
        component={Paper}
        elevation={6}
        square
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <SportsEsportsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ingresa a Game-Team-05
          </Typography>
          <Box margin={3} />
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              sx={{ color: "#050038" }}
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <Box margin={3} />
            <TextField
              sx={{ color: "#050038" }}
              fullWidth
              id="password"
              name="password"
              label="Contraseña"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                background: "#050038",
                color: "#E2E2E2",
                "&:hover": {
                  background: "#050040",
                },
              }}
            >
              Ingresar
            </Button>
            <Button
              fullWidth
              onClick={() => navigate("/register")}
              sx={{
                color: "#9096B2",
                fontSize: "15px",
                textTransform: "capitalize",
                "&:hover": {
                  color: "#050038",
                },
              }}
              type="button"
            >
              No tienes cuenta? Registrate!
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
