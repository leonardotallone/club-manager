import Grid from '@mui/material/Grid2';
import BackgroundImage from "../../components/BackgroundImage";
import Navbar from '../../components/Navbar';
import UsersList from '../../components/Admin/UsersList';

const UsersListScreen = () => {
    return (
        <Grid>
            <Grid sx={{
                position: 'relative',
                height: '100vh',
                // minHeight: '100vh',
                overflow: 'scroll'
            }}>

                <BackgroundImage />
                <Navbar />

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

                    <UsersList />

                </Grid>
            </Grid>
        </Grid>
    );
};

export default UsersListScreen;
