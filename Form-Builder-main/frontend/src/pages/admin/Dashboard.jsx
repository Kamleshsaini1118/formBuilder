import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getForms, deleteForm } from "../../services/formService.js";
import { toast } from "react-hot-toast";
import { 
  IoDocumentText, 
  IoStatsChart, 
  IoAdd, 
  IoTrashOutline, 
  IoArrowForward,
  IoFolderOpen
} from "react-icons/io5";

const Dashboard = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForms = async () => {
      setLoading(true);
      try {
        const data = await getForms();
        setForms(data);
      } catch (err) {
        console.error("Error fetching forms:", err);
        setError("Failed to fetch forms.");
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this form?")) return;

    try {
      await deleteForm(id);
      toast.success("Form deleted successfully!");
      setForms(forms.filter((form) => form._id !== id));
    } catch (err) {
      console.error("Error deleting form:", err);
      toast.error("Failed to delete form.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with your forms.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link
            to="/admin/manage-forms"
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center">
              <div className="p-3 bg-blue-50 rounded-lg text-blue-600 mr-4">
                <IoFolderOpen size={24} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Manage Forms</h3>
                <p className="text-sm text-gray-500">Create and edit your forms</p>
              </div>
              <div className="ml-auto text-gray-400">
                <IoArrowForward />
              </div>
            </div>
          </Link>

          <Link
            to="/admin/form-responses"
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-green-200 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-50 rounded-lg text-green-600 mr-4">
                <IoStatsChart size={24} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">View Responses</h3>
                <p className="text-sm text-gray-500">Check form submissions</p>
              </div>
              <div className="ml-auto text-gray-400">
                <IoArrowForward />
              </div>
            </div>
          </Link>
        </div>

        {/* Forms List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Your Forms</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {loading ? "Loading..." : `${forms.length} ${forms.length === 1 ? "form" : "forms"} in total`}
                </p>
              </div>

              <Link
                to="/create-form"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
              >
                <IoAdd size={18} />
                New Form
              </Link>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-500">Loading your forms...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-500">{error}</p>
              </div>
            ) : forms.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
                  <IoDocumentText size={32} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No forms yet</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Get started by creating your first form
                </p>
                <Link
                  to="/create-form"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <IoAdd size={20} />
                  Create Form
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {forms.map((form) => (
                  <div
                    key={form._id}
                    className="border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                          <IoDocumentText size={20} />
                        </div>
                      </div>

                      <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">
                        {form.title || "Untitled Form"}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Created {new Date(form.createdAt).toLocaleDateString()}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-sm text-blue-600 font-medium">
                          {form.responses?.length || 0} responses
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleDelete(form._id);
                            }}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <IoTrashOutline size={18} />
                          </button>

                          <Link
                            to={`/admin/form-responses/${form._id}`}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <IoStatsChart size={18} />
                          </Link>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
