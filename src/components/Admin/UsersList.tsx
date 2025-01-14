// import * as React from 'react';
// import List from '@mui/material/List';
// import Grid from '@mui/material/Grid2';
// import { Box } from '@mui/material';
// import ListItem from '@mui/material/ListItem';
// import Divider from '@mui/material/Divider';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Avatar from '@mui/material/Avatar';
// import Typography from '@mui/material/Typography';

// const users = [
//   { name: "Tallone Catalina", avatar: require("../../assets/avatars/1.jpg") },
//   { name: "Tallone Salvador", avatar: require("../../assets/avatars/2.jpg") },
//   { name: "Tallone Leonardo", avatar: require("../../assets/avatars/3.jpg") },
// ];

// const UsersList = () => {
//   return (
//     <Box  sx={{ width: '100%', bgcolor: 'background.paper' }}>

//         {users.map((user, index) => (
//           <ListItem alignItems="flex-start" sx={{ width: '100%' }} key={index}>
//             <Grid size={4} >
//               <ListItemAvatar>
//                 <Avatar alt={user.name} src={user.avatar} />
//               </ListItemAvatar>
//             </Grid>
//             <Grid size={4} >
//               <Typography
//                 component="span"
//                 variant="body2"
//                 sx={{ color: 'text.primary', display: 'inline' }}
//               >
//                 {user.name}
//               </Typography>

//             </Grid>
//             <Grid size={4} >
//               <Typography
//                 component="span"
//                 variant="body2"
//                 sx={{ color: 'text.primary', display: 'inline' }}
//               >
//                 {user.name}
//               </Typography>

//             </Grid>
//             {index < users.length - 1 && <Divider />}
//           </ListItem>
//         ))}

//     </Box>
//   );
// };

// export default UsersList;


import { Paper } from '@mui/material';

import * as React from 'react';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid2';
import { Box } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const users = [
  { name: "Tallone Catalina", avatar: require("../../assets/avatars/1.jpg") },
  { name: "Tallone Salvador", avatar: require("../../assets/avatars/2.jpg") },
  { name: "Tallone Leonardo", avatar: require("../../assets/avatars/3.jpg") },
];

const UsersList = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 1 }}>
      <Grid container spacing={1}>
        {users.map((user, index) => (
          <Grid size={12}  key={index}>
            <Paper elevation={2} sx={{ padding: 1, display: 'flex', alignItems: 'center' , bgcolor: 'rgba(255, 255, 255, 0.5)'}}>
              <Avatar alt={user.name} src={user.avatar} sx={{ width: 50, height: 50, marginRight: 2 }} />
              <Typography  sx={{ color: 'text.primary' }}>
                {user.name}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UsersList;

