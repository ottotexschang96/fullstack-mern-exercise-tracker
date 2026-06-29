/**
 * Shuang-Yuan Chang
 * CreateExercisePage component allows creating a new exercise
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateExercisePage() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [reps, setReps] = useState(1);
  const [weight, setWeight] = useState(1);
  const [unit, setUnit] = useState('lbs');
  const [date, setDate] = useState('');

  const addExercise = async (e) => {
    e.preventDefault();

    const newExercise = {
      name,
      reps,
      weight,
      unit,
      date
    };

    const response = await fetch('/exercises', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newExercise)
    });

    if (response.status === 201) {
      alert('Exercise created successfully!');
    } else {
      alert('Failed to create exercise');
    }
    navigate('/');
  };

  return (
    <article>
      <h2>Add New Exercise</h2>
      <form onSubmit={addExercise}>
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

        <button type="submit">Add Exercise</button>
      </form>
    </article>
  );
}

export default CreateExercisePage;
