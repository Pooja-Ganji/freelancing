import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  reset,
} from '../features/portfolio/portfolioSlice';

function Portfolio() {
  const [formData, setFormData] = useState({
    theme: 'light',
    customDomain: '',
    isPublic: true,
    customization: {
      primaryColor: '#3B82F6',
      fontFamily: 'Inter',
      layout: 'classic',
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { portfolio, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.portfolio
  );

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    dispatch(getPortfolio());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (isError && message !== 'Portfolio not found') {
      toast.error(message);
    }

    if (portfolio) {
      setFormData({
        theme: portfolio.theme,
        customDomain: portfolio.customDomain || '',
        isPublic: portfolio.isPublic,
        customization: {
          primaryColor: portfolio.customization?.primaryColor || '#3B82F6',
          fontFamily: portfolio.customization?.fontFamily || 'Inter',
          layout: portfolio.customization?.layout || 'classic',
        },
      });
    }
  }, [portfolio, isError, message]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const onCustomizationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      customization: {
        ...prevState.customization,
        [name]: value,
      },
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (portfolio) {
      dispatch(updatePortfolio(formData));
      toast.success('Portfolio updated successfully');
    } else {
      dispatch(createPortfolio(formData));
      toast.success('Portfolio created successfully');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          {portfolio ? 'Portfolio Settings' : 'Create Your Portfolio'}
        </h1>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Theme
            </label>
            <select
              name="theme"
              value={formData.theme}
              onChange={onChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Custom Domain
            </label>
            <input
              type="text"
              name="customDomain"
              value={formData.customDomain}
              onChange={onChange}
              placeholder="yourdomain.com"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Layout
            </label>
            <select
              name="layout"
              value={formData.customization.layout}
              onChange={onCustomizationChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="classic">Classic</option>
              <option value="modern">Modern</option>
              <option value="minimal">Minimal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Primary Color
            </label>
            <input
              type="color"
              name="primaryColor"
              value={formData.customization.primaryColor}
              onChange={onCustomizationChange}
              className="mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Font Family
            </label>
            <select
              name="fontFamily"
              value={formData.customization.fontFamily}
              onChange={onCustomizationChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Poppins">Poppins</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isPublic"
              checked={formData.isPublic}
              onChange={onChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Make portfolio public
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {portfolio ? 'Update Portfolio' : 'Create Portfolio'}
            </button>
          </div>
        </form>

        {portfolio && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Portfolio Preview</h2>
            <p className="text-sm text-gray-600 mb-4">
              Your public portfolio is available at:{' '}
              <a
                href={`/preview/${user.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                {window.location.origin}/preview/{user.username}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Portfolio; 