import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import StarIcon from '@mui/icons-material/Star';
import SendIcon from '@mui/icons-material/Send';
import DraftsIcon from '@mui/icons-material/Drafts'; 
import './sidebar.css';
import DashboardIconOutlined from '@mui/icons-material/DashboardOutlined';
import ReceiptIconOutlined from '@mui/icons-material/ReceiptOutlined';
import AssignmentIconOutlined from '@mui/icons-material/AssignmentOutlined';



import { useLocation, useNavigate} from 'react-router-dom';
import Bookings from './home/Bookings/Bookings';
import Vehicles from './home/vehicles/Vehicles';

const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);



export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState('');
  const navigate = useNavigate();

  const location = useLocation();
  const email = location.state && location.state.email;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <Box
    sx={{
      display: 'flex',
      backgroundColor: '#f0f0f0', // Background color
      boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
      // Add any other CSS properties you need
    }}
  >
    <CssBaseline />
    <Drawer variant="permanent" open={open}>
      {/* DrawerHeader component is assumed */}
      <DrawerHeader>
        {/* Toggle button */}
        <IconButton onClick={() => setOpen(!open)}>
          {open ? <MenuIcon /> : <MenuIcon />}
        </IconButton>
      </DrawerHeader>
  
      <Divider />
  
      <List>
  {/* Dashboard */}
  <ListItem
    disablePadding
    sx={{
      display: 'block',
      '&.Mui-selected': {
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
      },
    }}
    onClick={() => {
      navigate("/Vehicles");
    }}
    selected={location.pathname === "/Vehicles"}
  >
    <ListItemButton
      sx={{
        minHeight: 48,
        justifyContent: open ? 'initial' : 'center',
        px: 2.5,
        '&:hover': {
          backgroundColor: 'transparent',
        },
        '&.Mui-selected': {
          color: '#926c9a',
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
          margin: 0,
          padding: 0,
        },
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? 3 : 'auto',
          justifyContent: 'center',
          color: location.pathname === "/Vehicles" ? '#926c9a' : '#000',
        }}
      >
        <DashboardIconOutlined />
      </ListItemIcon>
      <ListItemText
        primary={<Typography variant="body1" fontWeight="bold" fontSize={"1.0rem"}>Dashboard</Typography>}
        sx={{ opacity: open ? 1 : 0 }}
      />
    </ListItemButton>
  </ListItem>

  {/* Bookings */}
  <ListItem
    disablePadding
    sx={{
      display: 'block',
      '&.Mui-selected': {
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
      },
    }}
    onClick={() => {
      navigate("/Bookings");
    }}
    selected={location.pathname === "/Bookings"}
  >
    <ListItemButton
      sx={{
        minHeight: 48,
        justifyContent: open ? 'initial' : 'center',
        px: 2.5,
        '&:hover': {
          backgroundColor: 'transparent',
        },
        '&.Mui-selected': {
          color: '#926c9a',
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
          margin: 0,
          padding: 0,
        },
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? 3 : 'auto',
          justifyContent: 'center',
          color: location.pathname === "/Bookings" ? '#926c9a' : '#000',
        }}
      >
        <AssignmentIconOutlined />
      </ListItemIcon>
      <ListItemText
        primary={<Typography variant="body1" fontWeight="bold" fontSize={"1.0rem"}>Booked Slots</Typography>}
        sx={{ opacity: open ? 1 : 0 }}
      />
    </ListItemButton>
  </ListItem>
</List>

    </Drawer>
  </Box>
  );
}
