import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import styles from '../../reservations/Reservations.module.css';
import { validateForm, areErrorsPresent } from './EditRoomTypeService';
import Strings from '../../../assets/strings';

const theme = createTheme();

/**
 * Edit Room Page
 * @returns Component
 */
const EditRoomType = ({ roomTypeId }) => {
  const [apiError, setApiError] = React.useState(false);
  const [roomType, setRoomType] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [checked, setChecked] = React.useState(false);
  const navigate = useNavigate();

  // gets room type data by id
  React.useEffect(() => {
    const getReservation = async () => {
      await axios.get(Strings.ROOMTYPES_ENDPOINT + roomTypeId)
        .then((res) => {
          const { data } = res;
          setRoomType(data);
        })
        .catch(() => {
          setApiError(true);
        });
    };
    getReservation();
  }, [roomTypeId]);

  /**
   * sets state for checkbox
   */
  const handleCheck = () => {
    setChecked(!checked);
  };

  /**
   * generates data for validation and put request
   * @param {event} event
   */
  const handleSubmit = async (event) => {
    const data = new FormData(event.currentTarget);
    const formValues = {
      active: checked,
      name: data.get('name'),
      description: data.get('description'),
      rate: data.get('rate')
    };
    const errorMessages = validateForm(formValues);
    setErrors(errorMessages);
    if (areErrorsPresent(errorMessages)) {
      event.preventDefault();
      await axios.put(Strings.ROOMTYPES_ENDPOINT + roomTypeId, formValues);
      navigate(Strings.ROOMTYPES);
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
              <h2 style={{ color: '#1976d2' }}> Update Room Type </h2>
              <div className={styles.reservations}>
                <span className={styles.reservationsTitle}>
                  Name:
                </span>
                {' '}
                <input name="name" defaultValue={roomType.name} />
                {' '}
                {errors.name}
                {'\n'}
                <span className={styles.reservationsTitle}>Description:</span>
                {' '}
                <input name="description" defaultValue={roomType.description} />
                {' '}
                {'\n'}
                <span className={styles.reservationsTitle}>Rate:</span>
                {' '}
                <input name="rate" defaultValue={roomType.rate} />
                {' '}
                {errors.rate}
                {'\n'}
                <span className={styles.reservationsTitle}> Availability:</span>
                {' '}
                <input type="checkbox" checked={checked} onChange={handleCheck} />
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

export default EditRoomType;
