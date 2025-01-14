import Grid from '@mui/material/Grid2';
import BackgroundImage from "../components/BackgroundImage";
import EmailRecoverForm from '../components/EmailRecoverForm';

const EmailRecoverScreen = () => {
  return (
    <Grid>

      <Grid sx={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden'
      }}>

        <BackgroundImage />


        <Grid

          container
          justifyContent="center"
          alignItems="center"
          sx={{

            position: 'absolute',
            justifyContent: 'center',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 10, // Asegura que esté por encima del fondo
            padding: 5,
          }}
        >

          <EmailRecoverForm />

        </Grid>
      </Grid>
    </Grid>
  );
};

export default EmailRecoverScreen;
