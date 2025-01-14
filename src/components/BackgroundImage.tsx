
import Box from '@mui/material/Box';
import Background from "../assets/backgroundImages/Background.jpg"

const BackgroundImage = () => {

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh', // Full viewport height
        display: 'flex',
        // backgroundImage: 'url("https://cdn.pixabay.com/photo/2023/04/17/10/31/tennis-7932066_1280.jpg")', // Path to your image
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover', // Cover the entire area
        backgroundPosition: 'center', // Center the image
      }}
    >
    </Box>

  );
};

export default BackgroundImage;
