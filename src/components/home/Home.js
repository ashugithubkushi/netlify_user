// import React from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import MuiDrawer from '@mui/material/Drawer';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import CssBaseline from '@mui/material/CssBaseline';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// // import MailIcon from '@mui/icons-material/Mail';
// import StarIcon from '@mui/icons-material/Star';
// import SendIcon from '@mui/icons-material/Send';
// import DraftsIcon from '@mui/icons-material/Drafts'; 
// import './home.css';

// import Vehicles from './vehicles/Vehicles';
// import Bookings from './Bookings/Bookings';
// import { useLocation } from 'react-router-dom';

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: 'hidden',
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: 'hidden',
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up('sm')]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     ...(open && {
//       ...openedMixin(theme),
//       '& .MuiDrawer-paper': openedMixin(theme),
//     }),
//     ...(!open && {
//       ...closedMixin(theme),
//       '& .MuiDrawer-paper': closedMixin(theme),
//     }),
//   }),
// );

// const Content = ({ selected }) => {
//   switch (selected) {
//     // case 'Vehicles':
//     //   return <Vehicles />;
//     case 'Bookings':
//       return <Bookings/>;
//     case 'Send email':
//       return <Typography>Send email content goes here</Typography>;
//     case 'Drafts':
//       return <Typography>Drafts content goes here</Typography>;
//     default:
//       case 'Vehicles':
//       return <Vehicles />;
//   }
// };

// export default function Home() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
//   const [selectedItem, setSelectedItem] = React.useState('');

//   const location = useLocation();
//   const email = location.state && location.state.email;

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   const handleItemClick = (item) => {
//     setSelectedItem(item);
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open} sx={{backdropFilter: "blur(10px)", backgroundColor: "rgba(155, 155, 155, 0.3)" , color: 'black' }}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{
//               marginRight: 5,
//               ...(open && { display: 'none' }),
//             }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div" sx={{color: 'black'}}>
//           <b><h2 className='text'>ATMOS</h2></b>
//           </Typography>
//         </Toolbar>

//         {/* // username */}
//         <div>
//       {/* <h1>Welcome to Home</h1> */}
//       <div>
//         {/* Your main content here */}
//       </div>
//       {email && (
//         <div style={{ position: "absolute", top: 0, right: 0, padding: "10px" , margin: '10px' }}>
//           <p>UserEmail:- {email}</p>
//         </div>
//       )}
//     </div>

//       </AppBar>
//       <Drawer variant="permanent" open={open}>
//         <DrawerHeader>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
//           {['Vehicles', 'Bookings'].map((text) => (
//             <ListItem key={text} disablePadding>
//               <ListItemButton
//                 onClick={() => handleItemClick(text)}
//                 sx={{
//                   minHeight: 48,
//                   justifyContent: open ? 'initial' : 'center',
//                   px: 2.5,
//                 }}
//               >
//                 <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto' , paddingLeft: 3.2 }}>
//                   {text === 'Vehicles' && <InboxIcon />}
//                   {text === 'Bookings' && <StarIcon />}
//                   {text === 'Send email' && <SendIcon />}
//                   {text === 'Drafts' && <DraftsIcon />}
//                 </ListItemIcon>
//                 <ListItemText primary={text} sx={{ paddingLeft: 1.8 }}/>
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//         <Divider />
//       </Drawer>
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <DrawerHeader />
//         <Content selected={selectedItem} />
//       </Box>
//     </Box>
//   );
// }


import React from 'react'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'

const Home = () => {
  return (
    <div>
      <Sidebar/>
      <Navbar/>
    </div>
  )
}

export default Home