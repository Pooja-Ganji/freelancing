import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getPortfolio, updatePortfolio, createPortfolio } from '../features/portfolio/portfolioSlice';
import { getProjects } from '../features/projects/projectSlice';

function PortfolioEditor() {
  const [formData, setFormData] = useState({
    hero: {
      title: '',
      subtitle: '',
      backgroundImage: '',
      ctaText: 'View My Work',
      ctaLink: '#projects'
    },
    about: {
      title: 'About Me',
      bio: '',
      skills: [],
      image: ''
    },
    contact: {
      email: '',
      linkedin: '',
      github: '',
      phone: '',
      location: ''
    },
    customization: {
      primaryColor: '#3B82F6',
      secondaryColor: '#1E40AF',
      fontFamily: 'Inter',
      layout: 'modern',
      spacing: 'comfortable'
    },
    theme: '',
    isPublic: true
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { portfolio, isLoading: portfolioLoading } = useSelector((state) => state.portfolio);
  const { projects, isLoading: projectsLoading } = useSelector((state) => state.projects);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    dispatch(getPortfolio());
    dispatch(getProjects());
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (portfolio) {
      // Extract only the necessary fields from the portfolio data
      const { hero, about, contact, customization, theme, isPublic } = portfolio;
      setFormData(prevState => ({
        ...prevState,
        hero: hero || prevState.hero,
        about: about || prevState.about,
        contact: contact || prevState.contact,
        customization: customization || prevState.customization,
        theme: theme || prevState.theme,
        isPublic: typeof isPublic === 'boolean' ? isPublic : prevState.isPublic
      }));
    }
  }, [portfolio]);

  const handleChange = (section, field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: value
      }
    }));
  };

  const handleSkillsChange = (skills) => {
    setFormData(prevState => ({
      ...prevState,
      about: {
        ...prevState.about,
        skills: skills.split(',').map(skill => skill.trim())
      }
    }));
  };

  const handleSave = async () => {
    try {
      // Show loading toast
      const loadingToast = toast.loading('Saving changes...');

      // Update the portfolio with form data
      const updatedPortfolio = await dispatch(updatePortfolio({
        ...formData,
        // Ensure required fields are present
        hero: {
          ...formData.hero,
          title: formData.hero.title || `${user.name}'s Portfolio`,
          subtitle: formData.hero.subtitle || 'Welcome to my portfolio',
          ctaText: formData.hero.ctaText || 'View My Work',
          ctaLink: formData.hero.ctaLink || '#projects'
        },
        about: {
          ...formData.about,
          title: formData.about.title || 'About Me'
        },
        contact: {
          ...formData.contact,
          email: formData.contact.email || user.email
        },
        customization: {
          ...formData.customization,
          primaryColor: formData.customization.primaryColor || '#3B82F6',
          secondaryColor: formData.customization.secondaryColor || '#1E40AF',
          fontFamily: formData.customization.fontFamily || 'Inter',
          layout: formData.customization.layout || 'modern',
          spacing: formData.customization.spacing || 'comfortable'
        },
        theme: formData.theme || 'light',
        isPublic: typeof formData.isPublic === 'boolean' ? formData.isPublic : true
      })).unwrap();

      // Update toast to success
      toast.update(loadingToast, {
        render: 'Portfolio saved successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 3000
      });

      // Refresh portfolio data
      await dispatch(getPortfolio()).unwrap();
    } catch (error) {
      console.error('Save error:', error);
      toast.error(error.message || 'Failed to save portfolio. Please try again.');
    }
  };

  const handlePreview = async () => {
    try {
      // Save the current portfolio data before preview
      await dispatch(updatePortfolio(formData)).unwrap();
      toast.success('Portfolio saved successfully');
      // Navigate to preview
      navigate(`/preview/${user.username}`);
    } catch (error) {
      toast.error('Failed to save portfolio. Please try again.');
    }
  };

  if (portfolioLoading || projectsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Portfolio Editor</h1>
        <div className="space-x-4">
          <button
            onClick={handlePreview}
            className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
          >
            Preview
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor Sections */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Section Editor */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Hero Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={formData.hero.title}
                  onChange={(e) => handleChange('hero', 'title', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., Hi, I'm John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                <input
                  type="text"
                  value={formData.hero.subtitle}
                  onChange={(e) => handleChange('hero', 'subtitle', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., Full Stack Developer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Background Image URL</label>
                <input
                  type="text"
                  value={formData.hero.backgroundImage}
                  onChange={(e) => handleChange('hero', 'backgroundImage', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Background Color</label>
                <div className="flex items-center space-x-2 mt-1">
                  <input
                    type="color"
                    value={formData.hero.backgroundColor || '#808080'}
                    onChange={(e) => handleChange('hero', 'backgroundColor', e.target.value)}
                    className="h-10 w-20"
                  />
                  <input
                    type="text"
                    value={formData.hero.backgroundColor || '#808080'}
                    onChange={(e) => handleChange('hero', 'backgroundColor', e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="#808080"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">Choose a background color or use an image URL above</p>
              </div>
            </div>
          </section>

          {/* About Section Editor */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">About Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  value={formData.about.bio}
                  onChange={(e) => handleChange('about', 'bio', e.target.value)}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Tell your story..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Skills (comma-separated)</label>
                <input
                  type="text"
                  value={formData.about.skills.join(', ')}
                  onChange={(e) => handleSkillsChange(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., React, Node.js, TypeScript"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Profile Image URL</label>
                <input
                  type="text"
                  value={formData.about.image}
                  onChange={(e) => handleChange('about', 'image', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="https://example.com/profile.jpg"
                />
              </div>
            </div>
          </section>

          {/* Contact Section Editor */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.contact.email}
                  onChange={(e) => handleChange('contact', 'email', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
                <input
                  type="text"
                  value={formData.contact.linkedin}
                  onChange={(e) => handleChange('contact', 'linkedin', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">GitHub URL</label>
                <input
                  type="text"
                  value={formData.contact.github}
                  onChange={(e) => handleChange('contact', 'github', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Styling Options */}
        <div className="lg:col-span-1">
          <section className="bg-white rounded-lg shadow p-6 sticky top-8">
            <h2 className="text-xl font-semibold mb-4">Styling Options</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Primary Color</label>
                <input
                  type="color"
                  value={formData.customization.primaryColor}
                  onChange={(e) => handleChange('customization', 'primaryColor', e.target.value)}
                  className="mt-1 block w-full h-10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Secondary Color</label>
                <input
                  type="color"
                  value={formData.customization.secondaryColor}
                  onChange={(e) => handleChange('customization', 'secondaryColor', e.target.value)}
                  className="mt-1 block w-full h-10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Font Family</label>
                <select
                  value={formData.customization.fontFamily}
                  onChange={(e) => handleChange('customization', 'fontFamily', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Poppins">Poppins</option>
                  <option value="Open Sans">Open Sans</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Layout</label>
                <select
                  value={formData.customization.layout}
                  onChange={(e) => handleChange('customization', 'layout', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="modern">Modern</option>
                  <option value="classic">Classic</option>
                  <option value="minimal">Minimal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Spacing</label>
                <select
                  value={formData.customization.spacing}
                  onChange={(e) => handleChange('customization', 'spacing', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="comfortable">Comfortable</option>
                  <option value="compact">Compact</option>
                  <option value="spacious">Spacious</option>
                </select>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PortfolioEditor; 