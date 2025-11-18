import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Kamleshsaini1118',
      icon: <FaGithub className="w-5 h-5" />,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/kamlesh-saini-a44268259/',
      icon: <FaLinkedin className="w-5 h-5" />,
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      icon: <FaTwitter className="w-5 h-5" />,
    },
  ];

  return (
    <footer className="relative bg-gradient-to-r from-primary-600 to-secondary-600 text-black pt-12 pb-6 shadow-t-lg">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">FormFlow</h3>
            <p className="text-sm text-black/80">
              Create beautiful forms with ease. Share them with the world and collect responses effortlessly.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/create-form" className="text-sm text-black/80 hover:text-black transition-colors">Create Form</a></li>
              <li><a href="/view-responses" className="text-sm text-black/80 hover:text-black transition-colors">View Responses</a></li>
              <li><a href="/admin" className="text-sm text-black/80 hover:text-black transition-colors">Admin Dashboard</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  whileHover={{ y: -2 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-black/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-black/70">
            &copy; {currentYear} FormFlow. All rights reserved.
          </p>
          <p className="text-sm text-black/70 mt-2 md:mt-0 flex items-center">
            Made with <FaHeart className="mx-1 text-red-400" /> by Kamlesh Saini
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
