import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TeacherWindow from "./components/TeacherWindow";
import StudentWindow from "./components/StudentWindow";
import ProtectedRoute from "./components/ProtectedRoute";
// import { AuthContext } from './context/AuthContext'; // Example

function App() {
  // Replace this with your context or auth provider!
  // const { user } = useContext(AuthContext);
  const user = {/* Example: role: "teacher" or "student" */};

  return (
    <Router>
      <Routes>
        <Route
          path="/teacher"
          element={
            <ProtectedRoute user={user} role="teacher">
              <TeacherWindow />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student"
          element={
            <ProtectedRoute user={user} role="student">
              <StudentWindow />
            </ProtectedRoute>
          }
        />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;