/**
 * Shuang-Yuan Chang
 * ExerciseRow component displays a single exercise in a table row
 */
import { MdDelete, MdEdit } from 'react-icons/md';

function ExerciseRow({ exercise, onDelete, onEdit }) {
  return (
    <tr>
      <td>{exercise.name}</td>
      <td>{exercise.reps}</td>
      <td>{exercise.weight}</td>
      <td>{exercise.unit}</td>
      <td>{exercise.date}</td>
      <td>
        <MdEdit onClick={() => onEdit(exercise)} title="Edit exercise" />
      </td>
      <td>
        <MdDelete onClick={() => onDelete(exercise._id)} title="Delete exercise" />
      </td>
    </tr>
  );
}

export default ExerciseRow;
