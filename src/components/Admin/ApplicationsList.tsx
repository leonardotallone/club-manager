import React, { useState, useContext } from 'react';
import {
  Fade,
  Box,
  Container,
  Typography,
  Button,
  Avatar,
  Stack,
  useMediaQuery,
  Pagination,
  Modal,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { useTheme } from "@mui/material/styles";

import { getAllJoinUpContext } from '../../Context/GetAllJoinUpContext';
import { joinUpContext } from '../../Context/JoinUpContext';
import SignUpForm from './SignUpForm';

const ApplicationsList = () => {

  const { allApplications } = useContext(getAllJoinUpContext);
  const { setDeleteApplication } = useContext(joinUpContext);

  const [page, setPage] = useState(1);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<any>(null); // ✅ nuevo estado

  const theme = useTheme();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const applicationsPerPage = 4;
  const startIndex = (page - 1) * applicationsPerPage;
  const endIndex = startIndex + applicationsPerPage;
  const displayedApplications = allApplications?.slice(startIndex, endIndex) || [];
  const totalPages = Math.ceil((allApplications?.length || 0) / applicationsPerPage);

  const handleDelete = (id: string) => {
    setDeleteApplication(id);
  };
  const handleOpenEditForm = (app: any) => {
    setSelectedApplication(app); // ✅ guardamos el usuario seleccionado
    setOpenEditForm(true);
  };

  const handleCloseEditForm = () => {
    setOpenEditForm(false);
    setSelectedApplication(null); // ✅ limpiamos al cerrar
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 3, mb: 4 }}>
      <Typography
        variant="h6"
        sx={{ mb: 2, fontWeight: 600, color: '#444', textAlign: { xs: 'center', sm: 'left' } }}
      >
        Lista de Solicitudes
      </Typography>

      {/* Encabezado */}
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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', minWidth: isSmallScreen ? 120 : 200 }}>
          Acciones
        </Box>
      </Box>

      {/* Lista */}
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
            <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1 }}>
              <Avatar src={app.avatar} sx={{ width: 34, height: 34 }} />
              <Box sx={{ overflow: 'hidden' }}>
                <Typography sx={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {app.lastName} {app.name}
                </Typography>
                <Typography sx={{ fontSize: 11.5, color: '#777' }}>DNI: {app.dni}</Typography>
              </Box>
            </Stack>

            {!isSmallScreen && (
              <Box sx={{ flex: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', pl: 0.5, gap: 0.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#888', minWidth: 120 }}>Teléfono</Typography>
                  <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#888', minWidth: 120 }}>Fecha de solicitud</Typography>
                </Box>
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
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ flexShrink: 0, justifyContent: 'flex-end', minWidth: isSmallScreen ? 100 : 200 }}>
              <Button
                startIcon={<DeleteIcon sx={{ fontSize: 18, color: '#666' }} />}
                onClick={() => handleDelete(app.id)}
                sx={{ minWidth: 0, p: 0.5, '&:hover': { color: 'primary.main', background: 'transparent' } }}
              />
              <Button
                startIcon={<RemoveRedEyeOutlinedIcon sx={{ fontSize: 18, color: '#666' }} />}
                onClick={() => handleOpenEditForm(app)} // ✅ pasamos la aplicación
                sx={{ minWidth: 0, p: 0.5, '&:hover': { color: 'primary.main', background: 'transparent' } }}
              />
            </Stack>
          </Box>
        ))}
      </Stack>

      {/* 📝 Modal con el formulario */}
      <Modal
        open={openEditForm}
        onClose={handleCloseEditForm}
        closeAfterTransition
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(0,0,0,0.55)",
          p: 2,
        }}
      >
        <Fade in={openEditForm} timeout={{ enter: 1000, exit: 1000 }}>
          <Box
            sx={{
              width: "100%",
              maxWidth: 740,
              borderRadius: isMobile ? "24px" : "20px",
              overflow: "hidden",
              outline: "none",
            }}
          >
            <SignUpForm user={selectedApplication} onClose={handleCloseEditForm} mode="applicationsList"/>
          </Box>
        </Fade>
      </Modal>

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

export default ApplicationsList;
