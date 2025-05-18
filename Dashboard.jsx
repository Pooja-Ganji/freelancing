import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects, reset } from '../features/projects/projectSlice';
import { getPortfolio, createPortfolio } from '../features/portfolio/portfolioSlice';
import { toast } from 'react-toastify';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { projects, isLoading: projectsLoading, isError, message } = useSelector(
    (state) => state.projects
  );
  const { portfolio, isLoading: portfolioLoading } = useSelector((state) => state.portfolio);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
      return;
    }

    console.log('Current user data:', user);
    dispatch(getProjects());
    dispatch(getPortfolio());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const handlePreview = async () => {
    try {
      console.log('Handle preview - user data:', user);
      if (!portfolio) {
        // Create a default portfolio if none exists
        await dispatch(createPortfolio({
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
            fontFamily: 'Inter',
            layout: 'modern',
            spacing: 'comfortable'
          }
        })).unwrap();
        
        // Wait for the portfolio to be created and fetch it
        await dispatch(getPortfolio()).unwrap();
        toast.success('Portfolio created successfully');
      }
      
      if (!user?.username) {
        toast.error('Username not found. Please try logging out and logging in again.');
        return;
      }
      
      // Add a small delay to ensure the portfolio is saved
      setTimeout(() => {
        navigate(`/preview/${user.username}`);
      }, 500);
    } catch (error) {
      console.error('Preview error:', error);
      toast.error('Failed to create portfolio. Please try again.');
    }
  };

  if (projectsLoading || portfolioLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user && user.name}</h1>
        <p className="text-gray-600 mb-8">
          This is your portfolio dashboard. Here you can manage your projects and
          customize your portfolio.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Portfolio Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
            <p className="text-gray-600 mb-4">
              {portfolio ? 'Edit your portfolio settings and content.' : 'Create your portfolio to showcase your work.'}
            </p>
            <Link
              to="/editor"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {portfolio ? 'Edit Portfolio' : 'Create Portfolio'}
            </Link>
          </div>

          {/* Projects Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Projects</h2>
            <p className="text-gray-600 mb-4">
              {projects.length > 0
                ? `You have ${projects.length} project${projects.length === 1 ? '' : 's'}.`
                : 'Add your first project to showcase your work.'}
            </p>
            <Link
              to="/projects"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Manage Projects
            </Link>
          </div>

          {/* Preview Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
            <p className="text-gray-600 mb-4">
              See how your portfolio looks to visitors.
            </p>
            <button
              onClick={handlePreview}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Preview
            </button>
          </div>
        </div>
      </section>

      {/* Recent Projects Section */}
      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Recent Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project) => (
              <div key={project._id} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Dashboard; 