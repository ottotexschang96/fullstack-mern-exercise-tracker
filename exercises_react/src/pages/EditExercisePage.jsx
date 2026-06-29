/**
 * Shuang-Yuan Chang
 * EditExercisePage component allows editing an existing exercise
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditExercisePage({ exerciseToEdit }) {
  const navigate = useNavigate();

  const [name, setName] = useState(exerciseToEdit?.name || '');
  const [reps, setReps] = useState(exerciseToEdit?.reps || 0);
  const [weight, setWeight] = useState(exerciseToEdit?.weight || 0);
  const [unit, setUnit] = useState(exerciseToEdit?.unit || 'lbs');
  const [date, setDate] = useState(exerciseToEdit?.date || '');

  const editExercise = async (e) => {
    e.preventDefault();

    const updatedExercise = {
      name,
      reps,
      weight,
      unit,
      date
    };

    const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedExercise)
    });

    if (response.status === 200) {
      alert('Exercise updated successfully!');
    } else {
      alert('Failed to update exercise');
    }
    navigate('/');
  };

  return (
    <article>
      <h2>Edit Exercise</h2>
      <form onSubmit={editExercise}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="reps">Reps:</label>
        <input
          type="number"
          id="reps"
          value={reps}
          onChange={(e) => setReps(e.target.valueAsNumber)}
          min="1"
          required
        />

        <label htmlFor="weight">Weight:</label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.valueAsNumber)}
          min="1"
          required
        />

        <label htmlFor="unit">Unit:</label>
        <select
          id="unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          required
        >
          <option value="lbs">lbs</option>
          <option value="kgs">kgs</option>
        </select>

        <label htmlFor="date">Date:</label>
        <input
          type="text"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="MM-DD-YY"
          required
        />

        <button type="submit">Save</button>
      </form>
    </article>
  );
}

export default EditExercisePage;
