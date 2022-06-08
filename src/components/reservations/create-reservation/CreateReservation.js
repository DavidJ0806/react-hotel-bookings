/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import styles from '../Reservations.module.css';
import Dropdown from '../../drop-down/DropDown';
import { validateForm, areErrorsPresent } from '../edit-reservation/EditReservationService';
import Strings from '../../../assets/strings';

const theme = createTheme();

/**
 * Create Reservation Page
 * @returns component
 */
const CreateReservations = () => {
  const [apiError, setApiError] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [roomNameList, setRoomNameList] = React.useState([]);
  const [roomName, setRoomName] = React.useState('King');
  const [roomTypeData, setRoomTypeData] = React.useState({});
  const navigate = useNavigate();

  /**
   * sets the room name to the selected drop down menu item
   * @param {event} e
   */
  const handleSelectChange = (e) => {
    setRoomName(e.target.value);
  };

  // asynchronously gets and sets data from api
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

  // sets the room name list using the room type data from above useeffect
  React.useEffect(() => {
    Object.entries(roomTypeData).forEach((entry) => {
      if (entry[1].active === true) setRoomNameList((prev) => [...prev, entry[1].name]);
    });
  }, [roomTypeData]);

  /**
   * generates the values used for validation and post request. navigates to reservations
   * @param {event} event
   */
  const handleSubmit = async (event) => {
    const data = new FormData(event.currentTarget);
    const formValues = {
      guestEmail: data.get('email'),
      checkInDate: data.get('checkInDate'),
      numberOfNights: data.get('numberOfNights'),
      roomTypeId: roomTypeData.find((resData) => resData.name === roomName).id,
      user: sessionStorage.getItem('email')
    };
    const errorMessages = validateForm(formValues);
    setErrors(errorMessages);
    if (areErrorsPresent(errorMessages)) {
      event.preventDefault();
      await axios.post(Strings.RESERVATIONS_ENDPOINT, formValues);
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
              <h2 style={{ color: '#1976d2' }}> Create Reservation </h2>
              <div className={styles.reservations}>
                <span className={styles.reservationsTitle}>
                  guest email:
                </span>
                {' '}
                <input name="email" />
                {' '}
                {errors.email}
                {'\n'}
                <span className={styles.reservationsTitle}>check-in date:</span>
                {' '}
                <input name="checkInDate" />
                {' '}
                {errors.checkInDate}
                {'\n'}
                <span className={styles.reservationsTitle}>number of nights:</span>
                {' '}
                <input name="numberOfNights" />
                {' '}
                {errors.numberOfNights}
                {'\n'}
                <span className={styles.reservationsTitle}> roomtype name:</span>
                {' '}
                <Dropdown
                  id="reservationRoomName"
                  options={roomNameList}
                  errors={errors.roomName}
                  name="roomName"
                  onChange={handleSelectChange}
                  onBlur={handleSelectChange}
                  defaultValue="King Double"
                />
                {'\n'}
              </div>
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

export default CreateReservations;
