import { useState } from "react";
import React from "react";
import { createForm } from "../services/formService";
import { useNavigate } from "react-router-dom";
import { IoArrowBack, IoAddCircle, IoTrash, IoChevronDown } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const fieldTypes = ["text", "email", "number", "checkbox", "radio", "select"];

const CreateForm = () => {
  const [title, setTitle] = useState("");
  const [fields, setFields] = useState([]);
  const navigate = useNavigate();

  // ✅ Add new field dynamically
  const addField = () => {
    setFields([...fields, { label: "", type: "text", options: [], required: false }]);
  };

  // ✅ Remove field
  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  // ✅ Update field properties
  const updateField = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;

    // 🛠️ Reset options if field type is changed to non-select type
    if (key === "type" && value !== "select") {
      updatedFields[index].options = [];
    }

    setFields(updatedFields);
  };

  // ✅ Add option for dropdown
  const addOption = (index) => {
    const updatedFields = [...fields];
    updatedFields[index].options.push("");
    setFields(updatedFields);
  };

  // ✅ Update dropdown options
  const updateOption = (fieldIndex, optionIndex, value) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].options[optionIndex] = value;
    setFields(updatedFields);
  };

  // ✅ Remove option
  const removeOption = (fieldIndex, optionIndex) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].options.splice(optionIndex, 1);
    setFields(updatedFields);
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Form title is required!");
      return;
    }
    try {
      await createForm({ title, fields });
      navigate("/admin"); // Redirect after success
    } catch (error) {
      console.error("Form creation failed", error);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 sm:p-6 relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 flex items-center gap-1.5 text-white/90 hover:text-white transition-colors group"
          >
            <IoArrowBack size={18} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <h2 className="text-xl sm:text-2xl font-bold text-white text-center">
            Create New Form
          </h2>
        </div>

        {/* Form Title */}
        <div className="p-4 sm:p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Form Title</label>
            <input
              type="text"
              placeholder="e.g. Customer Feedback Form"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          {/* Fields Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-700">Form Fields</h3>
              <button
                type="button"
                onClick={addField}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <IoAddCircle size={16} />
                Add Field
              </button>
            </div>

            <AnimatePresence>
              {fields.map((field, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white border border-gray-200 rounded-lg p-3.5 shadow-sm hover:shadow transition-shadow"
                >
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Field label"
                        value={field.label}
                        onChange={(e) => updateField(index, "label", e.target.value)}
                        className="w-full px-3 py-1.5 text-sm border-b border-gray-200 focus:border-blue-500 outline-none bg-transparent"
                      />
                    </div>
                    
                    <div className="relative">
                      <select
                        value={field.type}
                        onChange={(e) => updateField(index, "type", e.target.value)}
                        className="appearance-none pl-2.5 pr-8 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer"
                      >
                        {fieldTypes.map((type) => (
                          <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                        <IoChevronDown size={14} className="text-gray-500" />
                      </div>
                    </div>

                    <label className="flex items-center gap-1.5 text-sm text-gray-600 ml-1">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => updateField(index, "required", e.target.checked)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-xs">Required</span>
                    </label>

                    <button
                      onClick={() => removeField(index)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove field"
                    >
                      <IoTrash size={16} />
                    </button>
                  </div>

                  {/* Options for select/radio/checkbox */}
                  {['select', 'radio', 'checkbox'].includes(field.type) && (
                    <div className="mt-3 pl-1.5 border-l-2 border-blue-100">
                      <div className="text-xs font-medium text-gray-500 mb-2">Options:</div>
                      <div className="space-y-2">
                        {field.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center gap-2">
                            <div className="flex-1">
                              <input
                                type="text"
                                value={option}
                                onChange={(e) => updateOption(index, optionIndex, e.target.value)}
                                placeholder={`Option ${optionIndex + 1}`}
                                className="w-full px-2.5 py-1 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeOption(index, optionIndex)}
                              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                              aria-label="Remove option"
                            >
                              <IoTrash size={14} />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addOption(index)}
                          className="mt-1 text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                        >
                          <IoAddCircle size={14} />
                          Add option
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Submit Button */}
          <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Form
            </button>
          </div>

          {/* Benefits Section */}
          <div className="mt-12 pt-8 border-t border-gray-400">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">Why Choose Our Form Builder?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: '🚀',
                  title: 'Lightning Fast',
                  description: 'Create beautiful forms in minutes with our intuitive drag & drop interface.'
                },
                {
                  icon: '🎨',
                  title: 'Fully Customizable',
                  description: 'Match your brand with custom colors, fonts, and styling options.'
                },
                {
                  icon: '📊',
                  title: 'Powerful Analytics',
                  description: 'Gain insights with real-time response tracking and analytics.'
                },
                {
                  icon: '🤝',
                  title: 'Team Collaboration',
                  description: 'Work together with your team on form creation and management.'
                },
                {
                  icon: '🔒',
                  title: 'Secure & Private',
                  description: 'Your data is protected with enterprise-grade security measures.'
                },
                {
                  icon: '🔌',
                  title: '100+ Integrations',
                  description: 'Connect with your favorite tools and automate your workflow.'
                }
              ].map((benefit, index) => (
                <div key={index} className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <div className="text-3xl mb-3">{benefit.icon}</div>
                  <h4 className="font-medium text-gray-900 mb-1">{benefit.title}</h4>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateForm;
