import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import styles from '../../reservations/Reservations.module.css';
import { validateForm, areErrorsPresent } from '../edit-room-type/EditRoomTypeService';
import Strings from '../../../assets/strings';

const theme = createTheme();

/**
 * Create Room-Type page
 * @returns Component
 */
const CreateRoomType = () => {
  const [apiError, setApiError] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const navigate = useNavigate();

  /**
   * sets check mark to opposite when clicked
   */
  const handleCheck = () => {
    setChecked(!checked);
  };

  /**
   * generates form data to validate and submit
   * @param {event} event
   */
  const handleSubmit = async (event) => {
    const data = new FormData(event.currentTarget);
    const formValues = {
      name: data.get('name'),
      description: data.get('description'),
      rate: data.get('rate'),
      active: checked
    };
    const errorMessages = validateForm(formValues);
    setErrors(errorMessages);
    if (areErrorsPresent(errorMessages)) {
      event.preventDefault();
      await axios.post(Strings.ROOMTYPES_ENDPOINT, formValues)
        .catch(() => {
          setApiError(true);
        });
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
              <h2 style={{ color: '#1976d2' }}> Create Room Type </h2>
              <div className={styles.reservations}>
                <span className={styles.reservationsTitle}>
                  Name:
                </span>
                {' '}
                <input name="name" />
                {' '}
                {errors.name}
                {'\n'}
                <span className={styles.reservationsTitle}>Description:</span>
                {' '}
                <input name="description" />
                {' '}
                {'\n'}
                <span className={styles.reservationsTitle}>Rate:</span>
                {' '}
                <input name="rate" />
                {' '}
                {errors.rate}
                {'\n'}
                <span className={styles.reservationsTitle}> Active Status:</span>
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
                Create
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default CreateRoomType;
