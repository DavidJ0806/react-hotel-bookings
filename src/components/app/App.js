import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as React from 'react';
import SignIn from '../login/SignIn';
import Reservations from '../reservations/Reservations';
import CreateReservation from '../reservations/create-reservation/CreateReservation';
import EditReservation from '../reservations/edit-reservation/EditReservation';
import PrivateRoute from '../protected-route/ProtectedRoute';
import NavBar from '../nav-bar/NavBar';
import RoomTypes from '../room-types/RoomTypes';
import NotFound from '../not-found/NotFound';
import EditRoomType from '../room-types/edit-room-type/EditRoomType';
import CreateRoomType from '../room-types/create-room-type/CreateRoomType';

/**
 * App
 * @returns component
 */
export default function App() {
  // helper tracker to only show logout button when logged in
  const [loginTracker, setLoginTracker] = React.useState(false);
  // helper tracker for navbar styling when on certain pages
  const [onReservations, setOnReservations] = React.useState(false);
  const [onRoomTypes, setOnRoomTypes] = React.useState(false);
  // helper to preserve state between page reloads. ex - reloading when editing a room-type
  const [roomTypeId, setRoomTypeId] = React.useState(sessionStorage.getItem('roomTypeId'));
  const [reservationId, setReservationId] = React.useState(sessionStorage.getItem('reservationId'));
  // helper tracker to get data again after deleting data
  const [deleteTracker, setDeleteTracker] = React.useState(false);
  const [roomTypeName, setRoomTypeName] = React.useState('King');

  return (
    <BrowserRouter>
      <div id="page-container">
        <NavBar
          loginTracker={loginTracker}
          setLoginTracker={setLoginTracker}
          onReservations={onReservations}
          onRoomTypes={onRoomTypes}
        />
        <Routes>
          <Route
            path="/"
            element={(
              <SignIn
                loginTracker={loginTracker}
                setLoginTracker={setLoginTracker}
                setOnRoomTypes={setOnRoomTypes}
                setOnReservations={setOnReservations}
              />
)}
          />
          <Route path="/reservations" element={<PrivateRoute><Reservations setRoomTypeName={setRoomTypeName} setDeleteTracker={setDeleteTracker} deleteTracker={deleteTracker} setReservationId={setReservationId} setOnRoomTypes={setOnRoomTypes} setOnReservations={setOnReservations} /></PrivateRoute>} />
          <Route path="/room-types" element={<PrivateRoute><RoomTypes setRoomTypeId={setRoomTypeId} setOnRoomTypes={setOnRoomTypes} setOnReservations={setOnReservations} /></PrivateRoute>} />
          <Route path="/reservations/create" element={<PrivateRoute><CreateReservation /></PrivateRoute>} />
          <Route path="/room-types/create" element={<PrivateRoute><CreateRoomType /></PrivateRoute>} />
          <Route path="/reservations/edit/:id" element={<PrivateRoute><EditReservation roomTypeName={roomTypeName} reservationId={reservationId} /></PrivateRoute>} />
          <Route path="/room-types/edit/:id" element={<PrivateRoute><EditRoomType roomTypeId={roomTypeId} /></PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
