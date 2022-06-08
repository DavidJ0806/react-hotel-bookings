import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import styles from '../Reservations.module.css';
import { validateForm, areErrorsPresent } from './EditReservationService';
import Dropdown from '../../drop-down/DropDown';
import Strings from '../../../assets/strings';

const theme = createTheme();

/**
 * EditReservation
 * @param {number} param0 reservation id
 * @returns component
 */
const EditReservation = ({ reservationId }) => {
  const [apiError, setApiError] = React.useState(false);
  const [reservation, setReservation] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [roomName, setRoomName] = React.useState('King');
  const [roomNameList, setRoomNameList] = React.useState([]);
  const [roomTypeData, setRoomTypeData] = React.useState({});
  const navigate = useNavigate();

  // gets reservation data for specfic reservations
  React.useEffect(() => {
    const getReservation = async () => {
      await axios.get(Strings.RESERVATIONS_ENDPOINT + reservationId)
        .then((res) => {
          const { data } = res;
          setReservation(data);
        })
        .catch(() => setApiError(true));
    };
    getReservation();
  }, [reservationId]);

  // gets room type data
  React.useEffect(() => {
    const getData = async () => {
      await axios.get(Strings.ROOMTYPES_ENDPOINT).then((res) => {
        const { data } = res;
        setRoomTypeData(data);
      });
    };
    getData();
  }, []);

  // sets room name list
  React.useEffect(() => {
    Object.entries(roomTypeData).forEach((entry) => {
      if (entry[1].active === true) setRoomNameList((prev) => [...prev, entry[1].name]);
    });
  }, [roomTypeData]);

  /**
   * changes room name based on whats selected by dropdown
   * @param {event} e
   */
  const handleSelectChange = (e) => {
    setRoomName(e.target.value);
  };

  /**
   * validates and submits data entered in form, then navigates
   * @param {event} event
   */
  const handleSubmit = async (event) => {
    const data = new FormData(event.currentTarget);
    // generate the object used for validation and api request
    const formValues = {
      guestEmail: data.get('email'),
      checkInDate: data.get('checkInDate'),
      numberOfNights: data.get('numberOfNights'),
      roomTypeId: roomTypeData.find((resData) => resData.name === roomName).id,
      user: reservation.user
    };
    const errorMessages = validateForm(formValues);
    setErrors(errorMessages);
    if (areErrorsPresent(errorMessages)) {
      event.preventDefault();
      await axios.put(Strings.RESERVATIONS_ENDPOINT + reservationId, formValues);
      navigate(Strings.RESERVATIONS);
    }
    event.preventDefault();
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
              <h2 style={{ color: '#1976d2' }}>
                Reservation
                {' '}
                {reservationId}
              </h2>
              <div className={styles.reservations}>
                <span className={styles.reservationsTitle}>
                  guest email:
                </span>
                {' '}
                <input name="email" defaultValue={reservation.guestEmail} />
                {' '}
                {errors.email}
                {'\n'}
                <span className={styles.reservationsTitle}>check-in date:</span>
                {' '}
                <input name="checkInDate" defaultValue={reservation.checkInDate} />
                {' '}
                {errors.checkInDate}
                {'\n'}
                <span className={styles.reservationsTitle}>number of nights:</span>
                {' '}
                <input name="numberOfNights" defaultValue={reservation.numberOfNights} />
                {' '}
                {errors.numberOfNights}
                {'\n'}
                <span className={styles.reservationsTitle}> roomtype name:</span>
                {' '}
                <Dropdown
                  id="reservationRoomName"
                  options={roomNameList}
                  name="roomName"
                  onChange={handleSelectChange}
                  onBlur={handleSelectChange}
                  defaultValue="Queen"
                />
                {'\n'}
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default EditReservation;
