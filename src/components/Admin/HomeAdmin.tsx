import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const HomeAdmin = () => {

    return (
        <Box>
            <Typography
                variant="h2"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                    mr: 3,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'white',
                    textDecoration: 'none',
                }}
            >
                Home Admin
            </Typography>
        </Box>

    );
};

export default HomeAdmin;
