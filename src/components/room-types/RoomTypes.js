import * as React from 'react';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import styles from '../reservations/Reservations.module.css';
import Strings from '../../assets/strings';

const theme = createTheme();

/**
 * Room Types Page
 * @returns Component
 */
const RoomTypes = ({
  setOnRoomTypes, setOnReservations, deleteTracker, setRoomTypeId
}) => {
  const [apiError, setApiError] = React.useState(false);
  const [roomTypesData, setRoomTypesData] = React.useState({});
  const navigate = useNavigate();

  // sets the current page for Nav Bar
  React.useEffect(() => {
    setOnRoomTypes(true);
    setOnReservations(false);
  }, [setOnReservations, setOnRoomTypes]);

  // gets data from room-types
  React.useEffect(() => {
    axios.get(Strings.ROOMTYPES_ENDPOINT).then((res) => {
      const { data } = res;
      setRoomTypesData(data);
    }).catch(() => {
      setApiError(true);
    });
  }, [deleteTracker]);

  /**
   * naviagtes to create room-types
   * @param {event} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(Strings.CREATE_ROOMTYPE);
  };

  /**
   * navigates to edit room-type page
   * @param {Number} roomTypeId
   */
  const handleEditClick = (roomTypeId) => {
    setRoomTypeId(roomTypeId);
    sessionStorage.setItem('roomTypeId', roomTypeId);
    navigate(Strings.EDIT_ROOMTYPE + roomTypeId);
  };
  return (
    <div>
      {apiError && (<p>{Strings.API_ERROR}</p>)}
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <h2 style={{ color: '#1976d2' }}> Room Types </h2>
              {Object.values(roomTypesData).map((roomTypesInfo) => (
                <div className={styles.reservations} key={roomTypesInfo.id}>
                  <span className={styles.reservationsTitle}>
                    Name:
                  </span>
                  {' '}
                  {roomTypesInfo.name}
                  {'\n'}
                  <span className={styles.reservationsTitle}> Description:</span>
                  {' '}
                  {roomTypesInfo.description}
                  {'\n'}
                  <span className={styles.reservationsTitle}>Rate:</span>
                  {' '}
                  {roomTypesInfo.rate}
                  {'\n'}
                  <span className={styles.reservationsTitle}>Availability:</span>
                  {' '}
                  {roomTypesInfo.active.toString()}
                  {'\n'}
                  <IconButton
                    onClick={() => handleEditClick(roomTypesInfo.id)}
                  >
                    <EditIcon>edit</EditIcon>
                  </IconButton>
                  <div style={{ borderBottom: '1px solid #cccccc', marginTop: '8px' }} />
                </div>
              ))}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default RoomTypes;
