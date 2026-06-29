/**
 * Shuang-Yuan Chang
 * Navigation component with links to Home and Create pages
 */
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/create">Add Exercise</Link>
    </nav>
  );
}

export default Navigation;
