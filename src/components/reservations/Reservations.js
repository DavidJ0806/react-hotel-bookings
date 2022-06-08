import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import styles from './Reservations.module.css';
import Strings from '../../assets/strings';

const theme = createTheme();

/**
 * Reservations Page
 * @returns component
 */
const Reservations = ({
  setRoomTypeName, setOnReservations, setOnRoomTypes,
  setReservationId, deleteTracker, setDeleteTracker
}) => {
  const [apiError, setApiError] = React.useState(false);
  const [reservationData, setReservationData] = React.useState([]);
  const [roomNameList, setRoomNameList] = React.useState([]);
  const [roomTypeData, setRoomTypeData] = React.useState({});
  const navigate = useNavigate();

  /**
   * gets the room type name by index
   * @param {Number} roomNameId
   * @returns String room name
   */
  const getRoomTypeName = (roomNameId) => roomNameList[roomNameId - 1];

  /**
   * fetches room data on page load
   */
  React.useEffect(() => {
    const getData = async () => {
      await axios.get(Strings.ROOMTYPES_ENDPOINT).then((res) => {
        const { data } = res;
        setRoomTypeData(data);
      })
        .catch(() => {
          setApiError(true);
        });
    };
    getData();
  }, []);

  /**
   * updates list of room names
   */
  React.useEffect(() => {
    Object.entries(roomTypeData).forEach((entry) => {
      if (entry[1].active === true) setRoomNameList((prev) => [...prev, entry[1].name]);
    });
  }, [roomTypeData]);

  /**
   * updates the page currently on for nav bar
   */
  React.useEffect(() => {
    setOnRoomTypes(false);
    setOnReservations(true);
  }, [setOnReservations, setOnRoomTypes]);

  /**
   * fetches data on page load or when delete tracker is updated
   */
  React.useEffect(() => {
    const getData = async () => {
      await axios.get(Strings.RESERVATIONS_ENDPOINT).then((res) => {
        const { data } = res;
        setReservationData(data);
      })
        .catch(() => {
          setApiError(true);
        });
    };
    getData();
  }, [deleteTracker]);

  /**
   * navigates to the edit reservation page
   * @param {Number} reservationId
   * @param {String} roomTypeName
   */
  const handleEditClick = (reservationId, roomTypeName) => {
    setReservationId(reservationId);
    setRoomTypeName(roomTypeName);
    sessionStorage.setItem('reservationId', reservationId);
    navigate(Strings.EDIT_RESERVATION + reservationId);
  };

  /**
   * deletes a reservation and updates delete tracker
   * @param {number} reservationId
   */
  const handleTrashClick = async (reservationId) => {
    await axios.delete(Strings.RESERVATIONS_ENDPOINT + reservationId);
    setDeleteTracker(!deleteTracker);
  };

  /**
   * navigates to the create page
   * @param {event} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(Strings.CREATE_RESERVATION);
  };

  /**
  * calculates total cost by multiplying nights stayed by room cost
  * @param {number} nightsStayed
  * @param {number} id
  * @returns number totalCost
  */
  const getRoomCost = (nightsStayed, id) => {
    let totalCost;
    try {
      totalCost = (nightsStayed * roomTypeData.find(
        (resData) => resData.name === getRoomTypeName(id)
      ).rate);
      return totalCost;
    // eslint-disable-next-line no-empty
    } catch {
    }
    return totalCost;
  };

  return (
    <>
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
                <h2 style={{ color: '#1976d2' }}> Reservations </h2>
                {Object.values(reservationData).map((reservation) => (
                  <div className={styles.reservations} key={reservation.id}>
                    <span className={styles.reservationsTitle}>
                      guest email:
                    </span>
                    {' '}
                    {reservation.guestEmail}
                    {'\n'}
                    <span className={styles.reservationsTitle}> Room Type name:</span>
                    {' '}
                    {getRoomTypeName(reservation.roomTypeId)}
                    {'\n'}
                    <span className={styles.reservationsTitle}>Check-in date:</span>
                    {' '}
                    {reservation.checkInDate}
                    {'\n'}
                    <span className={styles.reservationsTitle}>Number of nights:</span>
                    {' '}
                    {reservation.numberOfNights}
                    {'\n'}
                    <span className={styles.reservationsTitle}>Total Cost (USD):</span>
                    {' '}
                    {getRoomCost(reservation.numberOfNights, reservation.roomTypeId)}
                    {'\n'}
                    <IconButton
                      onClick={() => handleTrashClick(reservation.id)}
                    >
                      <DeleteIcon>delete</DeleteIcon>
                    </IconButton>
                    <IconButton
                      onClick={() => handleEditClick(
                        reservation.id, getRoomTypeName(reservation.roomTypeId)
                      )}
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

    </>
  );
};

export default Reservations;
