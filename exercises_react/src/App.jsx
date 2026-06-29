/**
 * Shuang-Yuan Chang
 */
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation.jsx';
import HomePage from './pages/HomePage.jsx';
import EditExercisePage from './pages/EditExercisePage.jsx';
import CreateExercisePage from './pages/CreateExercisePage.jsx';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState(null);

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h1>Exercise Tracker</h1>
          <p>Track your workout exercises including reps, weights, and dates</p>
        </header>
        <Navigation />
        <main>
          <Routes>
            <Route
              path="/"
              element={<HomePage setExerciseToEdit={setExerciseToEdit} />}
            />
            <Route
              path="/edit"
              element={<EditExercisePage exerciseToEdit={exerciseToEdit} />}
            />
            <Route
              path="/create"
              element={<CreateExercisePage />}
            />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2026 Shuang-Yuan Chang</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
