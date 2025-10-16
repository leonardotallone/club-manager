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
      Solicitudes Rechazadas
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




