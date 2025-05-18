import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = async () => {
    try {
      await dispatch(logout());
      await dispatch(reset());
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to={user ? "/dashboard" : "/"} className="text-xl font-bold text-gray-800">
            Portfolio Builder
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Dashboard
                </Link>
                <Link
                  to="/portfolio"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Portfolio
                </Link>
                <Link
                  to="/projects"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Projects
                </Link>
                <Link
                  to="/settings"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Settings
                </Link>
                <button
                  onClick={onLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header; 