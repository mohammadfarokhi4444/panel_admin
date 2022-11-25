import FormLogin from "../../components/Login/FormLogin";
import { Grid, Container } from "@mui/material";
import "../../assets/style/login.css";
import Logo from "../../components/Login/Logo";

const Index = () => {
  return (
    <Container disableGutters maxWidth={false}>
      <Grid container>
        <Grid
          item
          md={6}
          sm={4}
          xs={12}
          bgcolor="primary.main"
          className="loginLogo"
        >
          <Logo />
        </Grid>
        <Grid item md={6} sm={8} xs={12}>
          <FormLogin />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Index;
