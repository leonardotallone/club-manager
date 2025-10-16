import React, { useContext } from 'react';
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
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import ManOutlinedIcon from '@mui/icons-material/ManOutlined';
import FamilyRestroomOutlinedIcon from '@mui/icons-material/FamilyRestroomOutlined';
import { getAllUsersContext } from '../../Context/GetAllUsersContext';

const UsersList = () => {
  const { allUsers } = useContext(getAllUsersContext);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  // simulamos paginación simple (más adelante se puede integrar backend)
  const usersPerPage = 25;
  const [page, setPage] = React.useState(1);
  const startIndex = (page - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const displayedUsers = allUsers?.slice(startIndex, endIndex) || [];

  return (
    <Container maxWidth="xl" sx={{ mt: 3, mb: 4 }}>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: 600,
          color: '#444',
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        Lista de Usuarios
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
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>Usuario</Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            minWidth: isSmallScreen ? 100 : 200,
          }}
        >
          Estado / Grupo / Acciones
        </Box>
      </Box>

      {/* Lista plana */}
      <Stack spacing={0} sx={{ width: '100%' }}>
        {displayedUsers.map((user: any, index: number) => (
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
              '&:hover': {
                backgroundColor: '#fafafa',
              },
            }}
          >
            {/* Avatar + nombre + DNI */}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1 }}>
              <Avatar src={user.avatarURL} sx={{ width: 34, height: 34 }} />
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
                  {user.lastName} {user.name}
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
                  DNI: {user.dni}
                </Typography>
              </Box>
            </Stack>

            {/* Íconos o acciones */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={isSmallScreen ? 1 : 2}
              sx={{
                flexShrink: 0,
                justifyContent: 'flex-end',
                minWidth: isSmallScreen ? 100 : 200,
              }}
            >
              {user.blockade ? (
                <LockOutlinedIcon sx={{ color: 'red', fontSize: 18 }} />
              ) : (
                <LockOpenIcon sx={{ color: 'green', fontSize: 18 }} />
              )}

              {user.familyGroup.length === 0 ? (
                <ManOutlinedIcon sx={{ color: '#666', fontSize: 18 }} />
              ) : (
                <FamilyRestroomOutlinedIcon sx={{ color: '#666', fontSize: 18 }} />
              )}

              <Button
                variant="text"
                sx={{
                  minWidth: 0,
                  color: '#666',
                  p: 0.5,
                  '&:hover': { color: 'primary.main', background: 'transparent' },
                }}
                onClick={() => navigate(`/edit-user/${user}`, { state: user })}
              >
                <ModeEditOutlineOutlinedIcon sx={{ fontSize: 18 }} />
              </Button>
            </Stack>
          </Box>
        ))}
      </Stack>

      {/* Paginación */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={Math.ceil(allUsers?.length / usersPerPage) || 1}
          page={page}
          onChange={(_, value) => setPage(value)}
          variant="outlined"
          size="small"
        />
      </Box>
    </Container>
  );
};

export default UsersList;


