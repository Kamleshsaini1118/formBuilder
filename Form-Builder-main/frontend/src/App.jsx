import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CreateForm from './pages/CreateForm';
import SubmitForm from './pages/SubmitForm';
import ViewResponses from './pages/ViewResponses';
import Dashboard from './pages/admin/Dashboard';
import ManageForms from './pages/admin/ManageForms';
import FormResponses from './pages/admin/FormResponses';
import EditForm from './pages/EditForm';
import React from 'react';

// Custom scrollbar styles
const scrollbarStyles = `
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
  }
`;

const App = () => {
  // Add smooth scrolling behavior
  useEffect(() => {
    // Add scrollbar styles
    const styleElement = document.createElement('style');
    styleElement.textContent = scrollbarStyles;
    document.head.appendChild(styleElement);

    // Smooth scroll to top on route change
    const unlisten = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    window.addEventListener('popstate', unlisten);
    return () => {
      window.removeEventListener('popstate', unlisten);
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          
          <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 mt-16">
            <div className="max-w-7xl mx-auto w-full">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/create-form" element={<CreateForm />} />
                <Route path="/submit-form/:formId" element={<SubmitForm />} />
                <Route path="/view-responses" element={<ViewResponses />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/admin/manage-forms" element={<ManageForms />} />
                <Route path="/admin/form-responses/:formId" element={<FormResponses />} />

                {/* Edit Form Route */}
                <Route path="/edit-form/:formId" element={<EditForm />} />
              </Routes>
            </div>
          </main>

          <Footer />
        </div>

        {/* Global Toaster for Notifications */}
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            className: '!bg-white !text-gray-800 !shadow-lg !rounded-xl !border !border-gray-200',
            duration: 3000,
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: 'white',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: 'white',
              },
            },
          }}
        />
      </Router>
    </div>
  );
};

export default App;
