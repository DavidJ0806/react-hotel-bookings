import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';

/**
 * Nav Bar
 * @returns component
 */
const NavBar = ({
  loginTracker, setLoginTracker, onReservations, onRoomTypes
}) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isManager, setIsManager] = React.useState(false);

  React.useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem('isLoggedIn') !== null);
    if (isLoggedIn) {
      setIsManager(sessionStorage.getItem('email').startsWith('manager'));
    }
  }, [loginTracker, isLoggedIn, isManager]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Hotel Bookings
          </Typography>
          { onReservations && (
          <Typography variant="h7" component="div" sx={{ flexGrow: 100 }}>
            - Reservations
          </Typography>
          )}
          { onRoomTypes && (
          <Typography variant="h7" component="div" sx={{ flexGrow: 100 }}>
            - Room Types
          </Typography>
          )}
          {isManager && (<Button onClick={() => navigate('/room-types')} color="inherit">Room Types</Button>)}
          <Button onClick={() => navigate('/reservations')} color="inherit">Reservations</Button>
          {isLoggedIn ? (
            <Button
              onClick={() => {
                setIsLoggedIn(false);
                sessionStorage.clear();
                setIsManager(false);
                navigate('/');
                setLoginTracker(!loginTracker);
              }}
              color="inherit"
            >
              Logout
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
