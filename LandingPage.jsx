import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaBriefcase, FaPalette, FaChartLine, FaLock } from 'react-icons/fa';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Build Your Professional
            <span className="text-blue-600"> Portfolio</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Showcase your work, attract clients, and grow your freelance business with our powerful portfolio builder.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition duration-300"
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
          >
            Everything You Need to Succeed
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Feature
              icon={<FaBriefcase className="w-6 h-6" />}
              title="Project Showcase"
              description="Display your best work with beautiful project cards and detailed descriptions."
            />
            <Feature
              icon={<FaPalette className="w-6 h-6" />}
              title="Customizable Design"
              description="Choose from multiple themes and customize colors to match your personal brand."
            />
            <Feature
              icon={<FaChartLine className="w-6 h-6" />}
              title="Analytics"
              description="Track portfolio views and engagement to optimize your online presence."
            />
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-blue-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Freelancers
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of successful freelancers who've built their online presence with us.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial
              quote="This platform helped me land my biggest client yet. The portfolio design is simply stunning!"
              author="Sarah Johnson"
              role="UI/UX Designer"
            />
            <Testimonial
              quote="Easy to use and highly customizable. I love how professional my portfolio looks now."
              author="Michael Chen"
              role="Full Stack Developer"
            />
            <Testimonial
              quote="The best investment I've made for my freelance business. Clients love my portfolio!"
              author="Emma Williams"
              role="Content Writer"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-blue-600 text-white rounded-2xl p-12 text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Showcase Your Work?
            </h2>
            <p className="text-xl mb-8">
              Create your professional portfolio in minutes and start attracting clients today.
            </p>
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300 inline-block"
            >
              Get Started for Free
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Portfolio Builder</h3>
              <p className="text-gray-400">Build your professional presence online</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-blue-400 transition duration-300">
                <FaGithub className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-blue-400 transition duration-300">
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Portfolio Builder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Feature Component
function Feature({ icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
    >
      <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

// Testimonial Component
function Testimonial({ quote, author, role }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <p className="text-gray-600 mb-4 italic">"{quote}"</p>
      <div>
        <p className="font-semibold text-gray-900">{author}</p>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
    </motion.div>
  );
}

export default LandingPage; 