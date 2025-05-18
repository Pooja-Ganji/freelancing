import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PublicPortfolio() {
  const [portfolio, setPortfolio] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/portfolios/public/${username}`);
        setPortfolio(response.data.portfolio);
        setProjects(response.data.projects);
        setError(null);
      } catch (error) {
        setError('Portfolio not found or is set to private');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [username]);

  const handleViewWork = () => {
    const projectsSection = document.querySelector('#projects-section');
    if (projectsSection) {
      const yOffset = -50; // Adjust this value to control the final scroll position
      const y = projectsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  if (!portfolio) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="h-screen flex items-center justify-center relative"
        style={{
          background: portfolio.hero.backgroundImage 
            ? `url(${portfolio.hero.backgroundImage}) center/cover no-repeat`
            : portfolio.hero.backgroundColor || '#808080'
        }}
      >
        <div className="text-center text-white z-10">
          <h1 className="text-5xl font-bold mb-4">{portfolio.hero.title}</h1>
          <p className="text-xl mb-8">{portfolio.hero.subtitle}</p>
          <button
            onClick={handleViewWork}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {portfolio.hero.ctaText}
          </button>
        </div>
        {/* Add a dark overlay if there's a background image */}
        {portfolio.hero.backgroundImage && (
          <div className="absolute inset-0 bg-black opacity-50"></div>
        )}
      </section>

      {/* Main Content */}
      <main>
        {/* Projects Section */}
        <section 
          id="projects-section"
          className="py-20 bg-white"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                  style={{
                    backgroundColor: portfolio.theme === 'dark' ? '#2d2d2d' : '#ffffff',
                    borderColor: portfolio.theme === 'dark' ? '#404040' : '#e5e7eb'
                  }}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4" style={{
                      color: portfolio.theme === 'dark' ? '#d1d5db' : '#4b5563'
                    }}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-sm rounded"
                          style={{
                            backgroundColor: portfolio.customization?.primaryColor + '20',
                            color: portfolio.customization?.primaryColor
                          }}
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
                          style={{ color: portfolio.customization?.primaryColor }}
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
                          style={{ color: portfolio.customization?.primaryColor }}
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        {portfolio.contact && (
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">Get in Touch</h2>
              <div className="flex justify-center gap-6">
                {portfolio.contact.email && (
                  <a
                    href={`mailto:${portfolio.contact.email}`}
                    className="text-lg hover:underline"
                    style={{ color: portfolio.customization?.primaryColor }}
                  >
                    Email
                  </a>
                )}
                {portfolio.contact.linkedin && (
                  <a
                    href={portfolio.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg hover:underline"
                    style={{ color: portfolio.customization?.primaryColor }}
                  >
                    LinkedIn
                  </a>
                )}
                {portfolio.contact.github && (
                  <a
                    href={portfolio.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg hover:underline"
                    style={{ color: portfolio.customization?.primaryColor }}
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default PublicPortfolio; 