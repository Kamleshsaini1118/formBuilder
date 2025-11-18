// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getFormById } from "../services/formService";
// import { submitResponse } from "../services/responseService";
// import { toast } from "react-hot-toast";
// import { IoArrowBack } from "react-icons/io5";

// const SubmitForm = () => {
//   const { formId } = useParams();
//   const navigate = useNavigate();
//   const [form, setForm] = useState(null);
//   const [responses, setResponses] = useState({});
//   const [submittedResponse, setSubmittedResponse] = useState(null); // ✅ Show response after submit
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchForm = async () => {
//       try {
//         const data = await getFormById(formId);
//         setForm(data);

//         if (data?.fields) {
//           const initialResponses = {};
//           data.fields.forEach((field) => {
//             initialResponses[field._id] = "";
//           });
//           setResponses(initialResponses);
//         }
//       } catch (err) {
//         console.error("Error fetching form:", err);
//         toast.error("Failed to load form.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchForm();
//   }, [formId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setResponses((prevResponses) => ({
//       ...prevResponses,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (Object.values(responses).some((value) => value.trim() === "")) {
//       toast.error("Please fill all required fields.");
//       return;
//     }

//     try {
//       const savedResponse = await submitResponse(formId, responses);
//       toast.success("Form submitted successfully!");
//       setSubmittedResponse(savedResponse); // ✅ Save response to state
//     } catch (err) {
//       console.error("Error submitting response:", err);
//       toast.error("Failed to submit form.");
//     }
//   };

//   if (loading) return <p className="text-gray-500 text-center">Loading form...</p>;

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
//       {/* 🔙 Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="self-start mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
//       >
//         <IoArrowBack size={20} />
//         <span className="text-lg font-medium">Back</span>
//       </button>

//       {/* 📌 Form Card */}
//       <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
//         <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
//           {form?.title || "Submit Form"}
//         </h1>

//         {/* 📌 Form Inputs */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {form?.fields?.map((field) => (
//             <div key={field._id} className="flex flex-col">
//               <label className="font-medium text-gray-700">{field.label}</label>
//               <input
//                 type={field.type}
//                 name={field._id}
//                 value={responses[field._id] || ""}
//                 onChange={handleChange}
//                 className="px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none"
//                 required
//               />
//             </div>
//           ))}

//           {/* 💾 Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transition-all"
//           >
//             Submit
//           </button>
//         </form>
//       </div>

//       {/* ✅ Show Response Below After Submission */}
//       {submittedResponse && (
//         <div className="mt-6 w-full max-w-md bg-green-100 border border-green-500 rounded-lg p-4 shadow-md">
//           <h2 className="text-xl font-semibold text-green-800">Response Submitted:</h2>
//           <ul className="mt-2 text-gray-700">
//             {Object.entries(submittedResponse).map(([fieldId, value]) => {
//               const fieldLabel = form?.fields?.find((f) => f._id === fieldId)?.label || "Unknown Field";
//               return (
//                 <li key={fieldId} className="py-1">
//                   <strong>{fieldLabel}:</strong> {value}
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SubmitForm;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFormById } from "../services/formService";
import { submitResponse } from "../services/responseService";
import { toast } from "react-hot-toast";
import { IoArrowBack, IoCheckmarkCircle, IoDocumentText } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const SubmitForm = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});
  const [submittedResponse, setSubmittedResponse] = useState(null); // ✅ Show response after submit
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const data = await getFormById(formId);
        setForm(data);

        if (data?.fields) {
          const initialResponses = {};
          data.fields.forEach((field) => {
            initialResponses[field._id] = "";
          });
          setResponses(initialResponses);
        }
      } catch (err) {
        console.error("Error fetching form:", err);
        toast.error("Failed to load form.");
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [formId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponses((prevResponses) => ({
      ...prevResponses,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(responses).some((value) => value.trim() === "")) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      const savedResponse = await submitResponse(formId, responses);
      toast.success("Form submitted successfully!");
      setSubmittedResponse(savedResponse); // ✅ Save response to state
    } catch (err) {
      console.error("Error submitting response:", err);
      toast.error("Failed to submit form.");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your form...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group"
          >
            <IoArrowBack className="group-hover:-translate-x-0.5 transition-transform" size={20} />
            <span className="font-medium">Back to Forms</span>
          </button>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Form Active</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden"
        >
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 sm:p-8 text-white">
            <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-4">
              <IoDocumentText size={24} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-center">
              {form?.title || "Untitled Form"}
            </h1>
            {form?.description && (
              <p className="mt-2 text-center text-blue-100 max-w-2xl mx-auto">
                {form.description}
              </p>
            )}
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            <AnimatePresence>
              {submittedResponse ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IoCheckmarkCircle className="text-green-600" size={40} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Form Submitted Successfully!</h2>
                  <p className="text-gray-600 mb-8">Thank you for your submission.</p>
                  
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 max-w-lg mx-auto text-left">
                    <h3 className="font-medium text-green-800 mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Your Response
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(submittedResponse).map(([fieldId, value]) => {
                        const fieldLabel = form?.fields?.find((f) => f._id === fieldId)?.label || "Field";
                        return (
                          <div key={fieldId} className="flex flex-col sm:flex-row sm:items-center">
                            <span className="text-sm font-medium text-gray-600 sm:w-1/3">{fieldLabel}</span>
                            <span className="text-gray-800 sm:w-2/3 break-words">{value || "-"}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    onClick={() => setSubmittedResponse(null)}
                    className="mt-8 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    Submit Another Response
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  {form?.fields?.map((field, index) => (
                    <motion.div
                      key={field._id}
                      variants={itemVariants}
                      className="bg-gray-50 p-4 rounded-xl border border-gray-100"
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          name={field._id}
                          value={responses[field._id] || ""}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          rows="3"
                          required={field.required}
                        />
                      ) : (
                        <input
                          type={field.type}
                          name={field._id}
                          value={responses[field._id] || ""}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          required={field.required}
                        />
                      )}
                    </motion.div>
                  ))}

                  <motion.div variants={itemVariants} className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium text-sm"
                    >
                      Submit Form
                    </button>
                    <p className="mt-3 text-center text-xs text-gray-500">
                      Your information is secure and will only be used for the intended purpose.
                    </p>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Powered by FormBuilder Pro</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitForm;
