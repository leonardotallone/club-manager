// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Grid from '@mui/material/Grid2';
// import { Box, Container, Typography, Button } from "@mui/material";

// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Footer from '../../components/Footer';
// import Advertising from '../../components/Advertising';

// import Avatar from '@mui/material/Avatar';

// import Select, { SelectChangeEvent } from '@mui/material/Select';


// import LockOpenIcon from '@mui/icons-material/LockOpen';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
// import DeleteIcon from '@mui/icons-material/Delete';
// import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
// import ManOutlinedIcon from '@mui/icons-material/ManOutlined';
// import FamilyRestroomOutlinedIcon from '@mui/icons-material/FamilyRestroomOutlined';
// import Pagination from '@mui/material/Pagination';

// import { getAllJoinUpContext } from '../../Context/GetAllJoinUpContext';
// import { joinUpContext } from '../../Context/JoinUpContext';


// const ApplicationsList = () => {
//     const [selectedCategory, setSelectedCategory] = React.useState('');
//     const [page, setPage] = useState(1);
//     const { allApplications } = useContext(getAllJoinUpContext);
//     const { setDeleteApplication, deleteSuccess, deleteError, loadingDelete } = useContext(joinUpContext);

//     console.log("Solicitudes UI", allApplications)

//     const navigate = useNavigate();

//     const applicationsPerPage = 4;

//     const startIndex = (page - 1) * applicationsPerPage;
//     const endIndex = startIndex + applicationsPerPage;
//     const paginatedApplications = allApplications?.slice(startIndex, endIndex);
//     const totalPages = Math.ceil((allApplications?.length || 0) / applicationsPerPage);

//     const category = [
//         'Fecha',
//         'Apellido',
//     ];

//     const handleDelete = (id: string) => {
//         setDeleteApplication(id); // Pass the document ID to context
//     };

//     return (
//         <>
//             <Box
//                 sx={{
//                     mb: 3,
//                     // position: "fixed", // Asegura que ocupe toda la pantalla
//                     width: '100%', // Asegura que tome todo el ancho del viewport
//                     // minHeight: '100vh',
//                 }}
//             >
   
//             </Box>

//             <Container maxWidth="xl">
//                 <Grid container>
//                     {/* {allApplications?.map((application: any, index: any) => ( */}
//                     {paginatedApplications?.map((application: any, index: any) => (
//                         <Grid key={index} size={{ xs: 12, sm: 6, md: 6, lg: 12 }} sx={{ mb: 1.5 }}>
//                             <Box
//                                 sx={{
//                                     bgcolor: "#eeeeee",
//                                     height: 65,
//                                     borderRadius: 2,
//                                     borderWidth: 1,
//                                     borderColor: "#ffab91",
//                                     borderStyle: 'solid',
//                                     width: '100%',
//                                     boxShadow: 2,
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                 }}
//                             >
//                                 <Grid container sx={{ width: '100%' }} >
//                                     <Grid size={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 0.7 }} sx={{ ml: 1 }}>
//                                         <Avatar alt="Avatar" src={application.avatar} sx={{ width: 50, height: 50 }} />
//                                     </Grid>
//                                     <Grid size={{ xs: 1.5, sm: 1.5, md: 1.5, lg: 1.5, xl: 1.5 }} direction="column">
//                                         <Typography sx={{ fontWeight: 800, fontSize: 11, color: '#616161', textDecoration: 'none' }}>
//                                             NOMBRE Y APELLIDO
//                                         </Typography>
//                                         <Typography sx={{ fontWeight: 600, fontSize: 14, color: 'black', textDecoration: 'none' }}>
//                                             {application.lastName} {application.name}
//                                         </Typography>
//                                     </Grid>

//                                     <Grid size={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }} direction="column">
//                                         <Typography sx={{ fontWeight: 800, fontSize: 11, color: '#616161', textDecoration: 'none' }}>
//                                             DNI
//                                         </Typography>
//                                         <Typography sx={{ fontWeight: 600, fontSize: 14, color: 'black', textDecoration: 'none' }}>
//                                             {application.dni}
//                                         </Typography>
//                                     </Grid>

//                                     <Grid size={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }} direction="column">
//                                         <Typography sx={{ fontWeight: 800, fontSize: 11, color: '#616161', textDecoration: 'none' }}>
//                                             TELEFONO
//                                         </Typography>
//                                         <Typography sx={{ fontWeight: 600, fontSize: 14, color: 'black', textDecoration: 'none' }}>
//                                             {application.contactNumber}
//                                         </Typography>
//                                     </Grid>

//                                     <Grid size={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }} direction="column">
//                                         <Typography sx={{ fontWeight: 800, fontSize: 11, color: '#616161', textDecoration: 'none' }}>
//                                             FECHA DE SOLICITUD
//                                         </Typography>
//                                         <Typography sx={{ fontWeight: 600, fontSize: 14, color: 'black', textDecoration: 'none' }}>
//                                             {application.applicationDate ? new Date(application.applicationDate.seconds * 1000).toLocaleDateString() : ''}
//                                         </Typography>
//                                     </Grid>
//                                     <Grid size={{ xs: 1, sm: 3, md: 3, lg: 3, xl: 3 }} direction="column" sx={{
//                                         display: 'flex',
//                                         flexDirection: 'column',
//                                         alignItems: 'flex-end',
//                                         justifyContent: 'center',
//                                         fontSize: 24,
//                                         color: 'black',
//                                     }}>
//                                         <Button
//                                             startIcon={<DeleteIcon sx={{ fontSize: 24, color: "black" }} />}
//                                             onClick={() => handleDelete(application.id)}
//                                         >
//                                             <Typography sx={{ fontWeight: 800, fontSize: 11, color: '#616161', textDecoration: 'none', mr: 1 }}>
//                                                 ELIMINAR SOLICITUD
//                                             </Typography>
//                                         </Button>
//                                     </Grid>
//                                     <Grid size={{ xs: 1, sm: 3, md: 3, lg: 3, xl: 3 }} direction="column" sx={{
//                                         display: 'flex',
//                                         flexDirection: 'column',
//                                         alignItems: 'flex-end',
//                                         justifyContent: 'center',
//                                         fontSize: 24,
//                                         color: 'black',

//                                     }}>
//                                         <Button
//                                             startIcon={<RemoveRedEyeOutlinedIcon sx={{ fontSize: 24, color: "black" }} />}
//                                             onClick={() => navigate(`/admin-display-application/${application}`, { state: application })}
//                                         >
//                                             <Typography sx={{ fontWeight: 800, fontSize: 11, color: '#616161', textDecoration: 'none', mr: 1 }}>
//                                                 VER SOLICITUD
//                                             </Typography>
//                                         </Button>
//                                     </Grid>
//                                 </Grid>
//                             </Box>
//                         </Grid>
//                     ))}



//                 </Grid>
            
//             </Container>
         
         
//         </>
//     );
// };

// export default ApplicationsList;



import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Avatar,
  Stack,
  useMediaQuery,
  Pagination,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import { getAllJoinUpContext } from '../../Context/GetAllJoinUpContext';
import { joinUpContext } from '../../Context/JoinUpContext';

const RejectedApplicationsList = () => {
  const [page, setPage] = useState(1);
  const { allRejectedApplications } = useContext(getAllJoinUpContext);
  const { setDeleteApplication } = useContext(joinUpContext);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const applicationsPerPage = 4;
  const startIndex = (page - 1) * applicationsPerPage;
  const endIndex = startIndex + applicationsPerPage;
  const displayedApplications = allRejectedApplications?.slice(startIndex, endIndex) || [];
  const totalPages = Math.ceil((allRejectedApplications?.length || 0) / applicationsPerPage);

  const handleDelete = (id: string) => {
    setDeleteApplication(id);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 3, mb: 4 }}>
      <Typography
        variant="h6"
        sx={{ mb: 2, fontWeight: 600, color: '#444', textAlign: { xs: 'center', sm: 'left' } }}
      >
        Lista de Solicitudes Rechazadas
      </Typography>

      {/* Encabezado de columnas */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          px: 1.5,
          py: 1,
          color: '#888',
          fontSize: 12,
          borderBottom: '1px solid #e0e0e0',
          fontWeight: 600,
        }}
      >
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>Usuario / DNI</Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            minWidth: isSmallScreen ? 120 : 200,
          }}
        >
          Acciones
        </Box>
      </Box>

      {/* Lista plana */}
      <Stack spacing={0} sx={{ width: '100%' }}>
        {displayedApplications.map((app: any, index: number) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              py: 1,
              px: 1.5,
              borderBottom: '1px solid #f0f0f0',
              minHeight: 48,
              transition: 'background-color 0.15s ease',
              '&:hover': { backgroundColor: '#fafafa' },
            }}
          >
            {/* Avatar + Nombre + DNI */}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1 }}>
              <Avatar src={app.avatar} sx={{ width: 34, height: 34 }} />
              <Box sx={{ overflow: 'hidden' }}>
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {app.lastName} {app.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 11.5,
                    color: '#777',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  DNI: {app.dni}
                </Typography>
              </Box>
            </Stack>

            {/* Teléfono / Fecha de solicitud */}
            {!isSmallScreen && (
              <Box
                sx={{
                  flex: 1.5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  pl: 0.5,
                  gap: 0.5,
                }}
              >
                {/* Títulos */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography
                    sx={{ fontSize: 12, fontWeight: 600, color: '#888', minWidth: 120 }}
                  >
                    Teléfono
                  </Typography>
                  <Typography
                    sx={{ fontSize: 12, fontWeight: 600, color: '#888', minWidth: 120 }}
                  >
                    Fecha de solicitud
                  </Typography>
                </Box>

                {/* Valores */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#333', minWidth: 120 }}>
                    {app.contactNumber}
                  </Typography>
                  <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#333', minWidth: 120 }}>
                    {app.applicationDate
                      ? new Date(app.applicationDate.seconds * 1000).toLocaleDateString()
                      : ''}
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Acciones */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={1.5}
              sx={{ flexShrink: 0, justifyContent: 'flex-end', minWidth: isSmallScreen ? 100 : 200 }}
            >
              <Button
                startIcon={<DeleteIcon sx={{ fontSize: 18, color: '#666' }} />}
                onClick={() => handleDelete(app.id)}
                sx={{
                  minWidth: 0,
                  p: 0.5,
                  '&:hover': { color: 'primary.main', background: 'transparent' },
                }}
              >
         
              </Button>

              <Button
                startIcon={<RemoveRedEyeOutlinedIcon sx={{ fontSize: 18, color: '#666' }} />}
                onClick={() => navigate(`/admin-display-application/${app}`, { state: app })}
                sx={{
                  minWidth: 0,
                  p: 0.5,
                  '&:hover': { color: 'primary.main', background: 'transparent' },
                }}
              >

              </Button>
            </Stack>
          </Box>
        ))}
      </Stack>

      {/* Paginación */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={totalPages || 1}
          page={page}
          onChange={(_, value) => setPage(value)}
          variant="outlined"
          size="small"
        />
      </Box>
    </Container>
  );
};

export default RejectedApplicationsList;




