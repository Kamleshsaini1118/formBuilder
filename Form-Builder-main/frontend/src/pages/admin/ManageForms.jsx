import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getForms, deleteForm } from "../../services/formService";
import { toast } from "react-hot-toast";
import { 
  IoArrowBack, 
  IoAdd, 
  IoDocumentText, 
  IoTrashOutline, 
  IoSettingsOutline,
  IoSearch,
  IoFilter,
  IoEllipsisVertical,
  IoStatsChart
} from "react-icons/io5";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

const ManageForms = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // For Back Navigation

  // Fetch Forms
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

  // Delete Form
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this form?")) return;

    try {
      await deleteForm(id);
      setForms(forms.filter((form) => form._id !== id)); 
      toast.success("Form deleted successfully!");
    } catch (error) {
      console.error("Error deleting form:", error);
      toast.error("Failed to delete form.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading forms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 group"
          >
            <IoArrowBack className="group-hover:-translate-x-0.5 transition-transform" size={20} />
            <span className="font-medium">Back to Dashboard</span>
          </button>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IoSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search forms..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm w-full sm:w-64"
              />
            </div>

            <Link
              to="/create-form"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <IoAdd size={18} />
              Create New Form
            </Link>
          </div>
        </div>

        {/* Page Title */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your Forms</h1>
            <p className="text-gray-500 text-sm mt-1">
              {forms.length} {forms.length === 1 ? "form" : "forms"} in total
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              <IoFilter size={20} />
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              <IoSettingsOutline size={20} />
            </button>
          </div>
        </div>

        {/* No Forms Case */}
        {forms.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <IoDocumentText className="text-gray-400" size={32} />
            </div>

            <h3 className="text-lg font-medium text-gray-900 mb-2">No forms created yet</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Start by creating your first form.
            </p>

            <Link
              to="/create-form"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <IoAdd size={20} />
              Create Your First Form
            </Link>
          </div>
        ) : (
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {forms.map((form) => (
              <motion.div
                key={form._id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-sm border hover:shadow-md transition"
              >
                <div className="p-6">

                  {/* Card Top */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                      <IoDocumentText size={20} />
                    </div>

                    <div className="relative group">
                      <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                        <IoEllipsisVertical size={20} />
                      </button>

                      <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border py-1 z-10 hidden group-hover:block">
                        <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                          Duplicate
                        </button>

                        <button
                          onClick={() => handleDelete(form._id)}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                    {form.title || "Untitled Form"}
                  </h2>

                  <p className="text-sm text-gray-500 mb-4">
                    Created on {new Date(form.createdAt).toLocaleDateString()}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-blue-600 font-medium">
                      {form.responses?.length || 0} responses
                    </div>

                    <div className="flex gap-2">
                      <Link
                        to={`/form-responses/${form._id}`}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                      >
                        <IoStatsChart size={18} />
                      </Link>

                      <Link
                        to={`/edit-form/${form._id}`}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                      >
                        <IoSettingsOutline size={18} />
                      </Link>

                      <Link
                        to={`/submit-form/${form._id}`}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                      >
                        <IoDocumentText size={18} />
                      </Link>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}

            {/* Create New Form Card */}
            <motion.div
              variants={itemVariants}
              className="border-2 border-dashed rounded-xl flex items-center justify-center p-6 hover:border-blue-500 cursor-pointer"
              onClick={() => navigate("/create-form")}
            >
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-3">
                  <IoAdd size={24} />
                </div>
                <h3 className="font-medium text-gray-900">Create New Form</h3>
                <p className="text-sm text-gray-500 mt-1">Start from scratch</p>
              </div>
            </motion.div>

          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ManageForms;
