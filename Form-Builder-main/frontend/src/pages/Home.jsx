import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getForms } from "../services/formService";
import { FiCheckCircle, FiZap, FiBarChart2, FiShield, FiCode, FiUsers } from 'react-icons/fi';

const Home = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const data = await getForms();
        setForms(data);
      } catch (error) {
        console.error("Error fetching forms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🚀 Hero Section */}
      <div className="py-20 px-6 text-center bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text animate-fadeIn">
            Build Forms Effortlessly
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mt-4 max-w-3xl mx-auto">
            Create beautiful, responsive forms in minutes with our intuitive form builder. No coding required!
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/create-form"
              className="px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-lg shadow-lg hover:scale-105 flex items-center justify-center gap-2"
            >
              <FiZap className="text-xl" /> Start Building - It's Free
            </Link>
            {/* <Link
              to="#features"
              className="px-8 py-4 text-lg font-semibold text-blue-600 bg-white border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 rounded-lg shadow-lg hover:scale-105"
            >
              Learn More
            </Link> */}
          </div>
          <div className="mt-12 rounded-xl bg-white p-1 shadow-xl inline-block">
       
          </div>
        </div>
      </div>

      {/* ✨ Features Section */}
      <div id="features" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Build Better Forms</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Powerful features that make form creation a breeze</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <FiCheckCircle className="w-8 h-8 text-blue-600" />,
              title: "Drag & Drop Builder",
              description: "Intuitive interface to create forms by simply dragging and dropping elements."
            },
            {
              icon: <FiBarChart2 className="w-8 h-8 text-blue-600" />,
              title: "Real-time Analytics",
              description: "Get insights into form performance with our built-in analytics dashboard."
            },
            {
              icon: <FiShield className="w-8 h-8 text-blue-600" />,
              title: "Secure & Private",
              description: "Enterprise-grade security to keep your data safe and private."
            },
            {
              icon: <FiCode className="w-8 h-8 text-blue-600" />,
              title: "Custom Styling",
              description: "Fully customizable forms that match your brand's look and feel."
            },
            {
              icon: <FiUsers className="w-8 h-8 text-blue-600" />,
              title: "Team Collaboration",
              description: "Work together with your team to create and manage forms."
            },
            {
              icon: <FiZap className="w-8 h-8 text-blue-600" />,
              title: "100+ Integrations",
              description: "Connect with your favorite tools like Google Sheets, Slack, and more."
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 📊 Stats Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50,000+", label: "Forms Created" },
              { number: "5M+", label: "Responses Collected" },
              { number: "99.9%", label: "Uptime" },
              { number: "10,000+", label: "Happy Users" }
            ].map((stat, index) => (
              <div key={index} className="p-4">
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 📝 Form List Section */}
      <div className="py-20 px-6 max-w-4xl mx-auto">

        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <h2 className="text-2xl font-bold">Available Forms</h2>
            <p className="text-blue-100">Browse and submit forms created by our community</p>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center min-h-32">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : forms.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">No forms available yet</h3>
                <p className="mt-2 text-gray-600">Be the first to create a form!</p>
                <Link
                  to="/create-form"
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Create Your First Form
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {forms.map((form) => (
                  <div key={form._id} className="group relative bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          <Link to={`/submit-form/${form._id}`} className="focus:outline-none">
                            <span className="absolute inset-0" aria-hidden="true"></span>
                            {form.title}
                          </Link>
                        </h3>
                        {form.description && (
                          <p className="mt-1 text-gray-600 line-clamp-2">{form.description}</p>
                        )}
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <span>{new Date(form.createdAt).toLocaleDateString()}</span>
                          <span className="mx-2">•</span>
                          <span>{form.fields?.length || 0} questions</span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {form.fields?.[0]?.type || 'Form'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {forms.length > 0 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
              <Link 
                to="/create-form" 
                className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
              >
                Create your own form
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* 🚀 Final CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Create Amazing Forms?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Join thousands of users who are building better forms in minutes, not hours.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/create-form"
              className="px-8 py-4 text-lg font-semibold text-blue-600 bg-white hover:bg-gray-100 transition-all duration-300 rounded-lg shadow-lg hover:scale-105"
            >
              Start Building for Free
            </Link>
          </div>
          <p className="mt-6 text-blue-100 text-sm">No credit card required • Cancel anytime</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
