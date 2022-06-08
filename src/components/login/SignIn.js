import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { areErrorsPresent, validateForm } from './SignInService';
import { RESERVATIONS } from '../../assets/strings';

const theme = createTheme();
/**
 * Sign In Page
 * @returns component
 */
function SignIn({
  loginTracker, setLoginTracker, setOnReservations, setOnRoomTypes
}) {
  // errors for page
  const [errors, setErrors] = React.useState({});
  // react-router-dom
  const navigate = useNavigate();

  // sets current page for nav bar
  React.useEffect(() => {
    setOnReservations(false);
    setOnRoomTypes(false);
  }, [setOnReservations, setOnRoomTypes]);

  /**
   * validates login information then submits and navigates to reservations
   * @param {event} event
   */
  const handleSubmit = (event) => {
    const data = new FormData(event.currentTarget);
    const validateUserInfo = {
      email: data.get('email'),
      password: data.get('password')
    };
    const errorMessages = validateForm(validateUserInfo);
    setErrors(errorMessages);
    if (areErrorsPresent(errorMessages)) {
      sessionStorage.setItem('email', data.get('email'));
      sessionStorage.setItem('isLoggedIn', 'true');
      setLoginTracker(!loginTracker);
      navigate(RESERVATIONS);
    }
    event.preventDefault();
  };

  return (
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
          {errors.email}
          <br />
          {errors.password}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
