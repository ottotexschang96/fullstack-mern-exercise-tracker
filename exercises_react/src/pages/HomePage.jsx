/**
 * Shuang-Yuan Chang
 * HomePage component displays all exercises
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExerciseTable from '../components/ExerciseTable.jsx';

function HomePage({ setExerciseToEdit }) {
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();

  // Load all exercises when component mounts
  const loadExercises = async () => {
    const response = await fetch('/exercises');
    const data = await response.json();
    setExercises(data);
  };

  useEffect(() => {
    loadExercises();
  }, []);

  // Handle delete exercise
  const onDelete = async (id) => {
    const response = await fetch(`/exercises/${id}`, {
      method: 'DELETE'
    });

    if (response.status === 204) {
      // Remove the deleted exercise from state
      setExercises(exercises.filter(exercise => exercise._id !== id));
    } else {
      alert('Failed to delete exercise');
    }
  };

  // Handle edit exercise - navigate to edit page
  const onEdit = (exercise) => {
    setExerciseToEdit(exercise);
    navigate('/edit');
  };

  return (
    <article>
      <h2>Exercise Log</h2>
      <ExerciseTable
        exercises={exercises}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </article>
  );
}

export default HomePage;
