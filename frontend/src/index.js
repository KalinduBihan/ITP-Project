import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/tiles.css'
import './styles/footer.css'
import "react-datetime/css/react-datetime.css";
import './styles/navbar.css'
import './views/calendar/events.css'
// import '../src/views/Attendance/leavepage.css'
import '@fortawesome/fontawesome-svg-core/styles.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { CoursesContextProvider } from './context/CourseContext'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthContextProvider>
    <CoursesContextProvider>
      <App />
    </CoursesContextProvider>
  </AuthContextProvider>
  </React.StrictMode>
);