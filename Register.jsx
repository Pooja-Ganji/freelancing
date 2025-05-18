import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import { createPortfolio } from '../features/portfolio/portfolioSlice';
import { FaUser, FaEnvelope, FaLock, FaUserCircle } from 'react-icons/fa';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, username, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && user) {
      dispatch(createPortfolio({
        hero: {
          title: `${user.name}'s Portfolio`,
          subtitle: 'Welcome to my portfolio',
          ctaText: 'View My Work',
          ctaLink: '#projects'
        },
        about: {
          title: 'About Me',
          bio: 'Add your bio here',
          skills: []
        },
        contact: {
          email: user.email
        },
        isPublic: true,
        theme: 'light',
        customization: {
          primaryColor: '#3B82F6',
          secondaryColor: '#1E40AF',
          fontFamily: 'Inter',
          layout: 'modern',
          spacing: 'comfortable'
        }
      })).then(() => {
        navigate('/dashboard');
      }).catch((error) => {
        console.error('Portfolio creation error:', error);
        toast.error('Failed to create portfolio. Please try again.');
      });
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (value && value.length < 3) {
          error = 'Name must be at least 3 characters long';
        }
        break;
      case 'username':
        if (value && !value.match(/^[a-zA-Z0-9_-]+$/)) {
          error = 'Username can only contain letters, numbers, underscores and hyphens';
        } else if (value && value.length < 3) {
          error = 'Username must be at least 3 characters long';
        }
        break;
      case 'email':
        if (value && !value.endsWith('@infosys.com')) {
          error = 'Please use your Infosys email address (@infosys.com)';
        }
        break;
      case 'password':
        if (value && value.length < 6) {
          error = 'Password must be at least 6 characters long';
        }
        break;
      case 'password2':
        if (value && value !== formData.password) {
          error = 'Passwords do not match';
        }
        break;
      default:
        break;
    }
    return error;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Only show validation errors after user has typed something
    if (value.length > 0) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    } else {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !username || !email || !password || !password2) {
      toast.error('Please fill in all fields');
      return;
    }

    // Validate all fields before submission
    const errors = {
      name: validateField('name', name),
      username: validateField('username', username),
      email: validateField('email', email),
      password: validateField('password', password),
      password2: validateField('password2', password2)
    };

    const hasErrors = Object.values(errors).some(error => error !== '');
    if (hasErrors) {
      setValidationErrors(errors);
      return;
    }

    const userData = {
      name,
      username,
      email,
      password,
    };

    dispatch(register(userData));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <div className="flex justify-center">
            <FaUserCircle className="h-16 w-16 text-blue-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 transition duration-150">
              Sign in
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className={`appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border ${
                    validationErrors.name ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Enter your full name"
                  value={name}
                  onChange={onChange}
                  minLength="3"
                />
              </div>
              {validationErrors.name && (
                <p className="mt-1 text-sm text-red-500">{validationErrors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className={`appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border ${
                    validationErrors.username ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Choose a username"
                  value={username}
                  onChange={onChange}
                  pattern="^[a-zA-Z0-9_-]+$"
                  minLength="3"
                />
              </div>
              {validationErrors.username && (
                <p className="mt-1 text-sm text-red-500">{validationErrors.username}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border ${
                    validationErrors.email ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Enter your Infosys email"
                  value={email}
                  onChange={onChange}
                  pattern="[a-z0-9._%+-]+@infosys\.com$"
                />
              </div>
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-500">{validationErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={`appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border ${
                    validationErrors.password ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Create a password"
                  value={password}
                  onChange={onChange}
                  minLength="6"
                />
              </div>
              {validationErrors.password && (
                <p className="mt-1 text-sm text-red-500">{validationErrors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="password2" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  required
                  className={`appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border ${
                    validationErrors.password2 ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Confirm your password"
                  value={password2}
                  onChange={onChange}
                  minLength="6"
                />
              </div>
              {validationErrors.password2 && (
                <p className="mt-1 text-sm text-red-500">{validationErrors.password2}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register; 