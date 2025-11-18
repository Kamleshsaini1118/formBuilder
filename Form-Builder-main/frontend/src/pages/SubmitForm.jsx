// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getFormById } from '../services/formService';
// import { submitResponse } from '../services/responseService';
// import { motion } from 'framer-motion';
// import { FiCheckCircle, FiLoader, FiArrowLeft } from 'react-icons/fi';

// const SubmitForm = () => {
//   const { formId } = useParams();
//   const navigate = useNavigate();
//   const [form, setForm] = useState(null);
//   const [responses, setResponses] = useState({});
//   const [submittedResponse, setSubmittedResponse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState('');

//   // Fetch form data
//   useEffect(() => {
//     const fetchForm = async () => {
//       try {
//         const data = await getFormById(formId);
//         setForm(data);

//         // Initialize responses object with empty strings
//         if (data?.fields) {
//           const initialResponses = {};
//           data.fields.forEach(field => {
//             initialResponses[field.id] = '';
//           });
//           setResponses(initialResponses);
//         }
//       } catch (err) {
//         console.error('Error fetching form:', err);
//         setError('Failed to load form. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchForm();
//   }, [formId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setError('');

//     try {
//       // Filter out empty responses if needed
//       const filteredResponses = Object.fromEntries(
//         Object.entries(responses).filter(([_, value]) => value !== '')
//       );

//       const response = await submitResponse(formId, filteredResponses);

//       // Safely handle the response
//       setSubmittedResponse({
//         id: response?._id || 'N/A',
//         formId: response?.formId || formId,
//         submittedAt: response?.createdAt ? new Date(response.createdAt).toLocaleString() : 'Just now',
//         responses: response?.responses || filteredResponses
//       });
//     } catch (err) {
//       console.error('Error submitting form:', err);
//       setError('Failed to submit form. Please try again.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleChange = (fieldId, value) => {
//     setResponses(prev => ({
//       ...prev,
//       [fieldId]: value
//     }));
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <FiLoader className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
//           <p className="text-gray-600">Loading form...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="max-w-2xl mx-auto p-6">
//         <div className="bg-red-50 border-l-4 border-red-500 p-4">
//           <div className="flex">
//             <div className="flex-shrink-0">
//               <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <div className="ml-3">
//               <p className="text-sm text-red-700">{error}</p>
//               <button
//                 onClick={() => window.location.reload()}
//                 className="mt-2 text-sm font-medium text-red-700 hover:text-red-600"
//               >
//                 Try again
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Success state
//   if (submittedResponse) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-2xl mx-auto p-6"
//       >
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="text-center">
//             <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
//               <FiCheckCircle className="h-6 w-6 text-green-600" />
//             </div>
//             <h2 className="mt-3 text-2xl font-bold text-gray-900">Form Submitted Successfully!</h2>
//             <p className="mt-2 text-sm text-gray-500">
//               Thank you for your submission. Your response has been recorded.
//             </p>
//           </div>

//           <div className="mt-8 border-t border-gray-200 pt-6">
//             <h3 className="text-lg font-medium text-gray-900">Your Response Details</h3>
//             <dl className="mt-4 space-y-4">
//               <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
//                 <dt className="text-sm font-medium text-gray-500">Response ID</dt>
//                 <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                   {submittedResponse.id}
//                 </dd>
//               </div>
//               <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
//                 <dt className="text-sm font-medium text-gray-500">Submitted at</dt>
//                 <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                   {submittedResponse.submittedAt}
//                 </dd>
//               </div>
//               <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
//                 <dt className="text-sm font-medium text-gray-500">Your answers</dt>
//                 <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 space-y-2">
//                   {Object.entries(submittedResponse.responses || {}).map(([fieldId, value]) => {
//                     const field = form?.fields?.find(f => f.id === fieldId);
//                     return (
//                       <div key={fieldId} className="border-b border-gray-100 pb-2 last:border-0 last:pb-0">
//                         <div className="font-medium text-gray-700">{field?.label || 'Untitled Field'}</div>
//                         {/* <div className="text-gray-600">{value || 'No response'}</div> */}
//                         <div className="text-gray-600">
//                           {typeof value === 'object'
//                             ? JSON.stringify(value, null, 2)
//                             : value || 'No response'}
//                         </div>

//                       </div>
//                     );
//                   })}
//                 </dd>
//               </div>
//             </dl>
//           </div>

//           <div className="mt-8 flex justify-end space-x-3">
//             <button
//               type="button"
//               onClick={() => navigate('/')}
//               className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               <FiArrowLeft className="-ml-1 mr-2 h-4 w-4" />
//               Back to Home
//             </button>
//             <button
//               type="button"
//               onClick={() => window.location.reload()}
//               className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               Submit Another Response
//             </button>
//           </div>
//         </div>
//       </motion.div>
//     );
//   }

//   // Form state
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="max-w-2xl mx-auto p-4 sm:p-6"
//     >
//       <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//         <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
//           <h1 className="text-2xl font-semibold text-gray-900">{form?.title || 'Untitled Form'}</h1>
//           {form?.description && (
//             <p className="mt-1 max-w-2xl text-sm text-gray-500">
//               {form.description}
//             </p>
//           )}
//         </div>

//         <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6 space-y-6">
//           {form?.fields?.map((field) => (
//             <div key={field.id} className="space-y-2">
//               <label
//                 htmlFor={`field-${field.id}`}
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 {field.label}
//                 {field.required && <span className="text-red-500 ml-1">*</span>}
//               </label>

//               {field.type === 'textarea' ? (
//                 <textarea
//                   id={`field-${field.id}`}
//                   rows={4}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                   value={responses[field.id] || ''}
//                   onChange={(e) => handleChange(field.id, e.target.value)}
//                   required={field.required}
//                   placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
//                 />
//               ) : (
//                 <input
//                   type={field.type || 'text'}
//                   id={`field-${field.id}`}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                   value={responses[field.id] || ''}
//                   onChange={(e) => handleChange(field.id, e.target.value)}
//                   required={field.required}
//                   placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
//                 />
//               )}

//               {field.description && (
//                 <p className="mt-1 text-xs text-gray-500">{field.description}</p>
//               )}
//             </div>
//           ))}

//           {error && (
//             <div className="rounded-md bg-red-50 p-4">
//               <div className="flex">
//                 <div className="flex-shrink-0">
//                   <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm text-red-700">{error}</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="pt-4 border-t border-gray-200 flex justify-end">
//             <motion.button
//               type="submit"
//               disabled={submitting}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className={`inline-flex items-center px-6 py-2.5 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${submitting
//                   ? 'bg-blue-400 cursor-not-allowed'
//                   : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
//                 }`}
//             >
//               {submitting ? (
//                 <>
//                   <FiLoader className="animate-spin -ml-1 mr-2 h-4 w-4" />
//                   Submitting...
//                 </>
//               ) : (
//                 'Submit Form'
//               )}
//             </motion.button>
//           </div>
//         </form>
//       </div>
//     </motion.div>
//   );
// };

// export default SubmitForm;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFormById } from '../services/formService';
import { submitResponse } from '../services/responseService';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiLoader, FiArrowLeft } from 'react-icons/fi';

const SubmitForm = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});
  const [submittedResponse, setSubmittedResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fetch form data
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const data = await getFormById(formId);
        setForm(data);
        
        // Initialize responses object with empty strings
        if (data?.fields) {
          const initialResponses = {};
          data.fields.forEach(field => {
            initialResponses[field.id] = '';
          });
          setResponses(initialResponses);
        }
      } catch (err) {
        console.error('Error fetching form:', err);
        setError('Failed to load form. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [formId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // Filter out empty responses if needed
      const filteredResponses = Object.fromEntries(
        Object.entries(responses).filter(([_, value]) => value !== '')
      );

      const response = await submitResponse(formId, filteredResponses);
      
      // Safely handle the response
      setSubmittedResponse({
        id: response?._id || 'N/A',
        formId: response?.formId || formId,
        submittedAt: response?.createdAt ? new Date(response.createdAt).toLocaleString() : 'Just now',
        responses: response?.responses || filteredResponses
      });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (fieldId, value) => {
    setResponses(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FiLoader className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading form...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 text-sm font-medium text-red-700 hover:text-red-600"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (submittedResponse) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto p-6"
      >
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <FiCheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="mt-3 text-2xl font-bold text-gray-900">Form Submitted Successfully!</h2>
            <p className="mt-2 text-sm text-gray-500">
              Thank you for your submission. Your response has been recorded.
            </p>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900">Your Response Details</h3>
            <dl className="mt-4 space-y-4">
              <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Response ID</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {submittedResponse.id}
                </dd>
              </div>
              <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Submitted at</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {submittedResponse.submittedAt}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Your answers</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 space-y-2">
                  {Object.entries(submittedResponse.responses || {}).map(([fieldId, value]) => {
                    const field = form?.fields?.find(f => f.id === fieldId);
                    return (
                      <div key={fieldId} className="border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                        <div className="font-medium text-gray-700">{field?.label || 'Untitled Field'}</div>
                        <div className="text-gray-600">{value || 'No response'}</div>
                      </div>
                    );
                  })}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiArrowLeft className="-ml-1 mr-2 h-4 w-4" />
              Back to Home
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Another Response
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Form state
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-4 sm:p-6"
    >
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-900">{form?.title || 'Untitled Form'}</h1>
          {form?.description && (
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {form.description}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6 space-y-6">
          {form?.fields?.map((field) => (
            <div key={field.id} className="space-y-2">
              <label
                htmlFor={`field-${field.id}`}
                className="block text-sm font-medium text-gray-700"
              >
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              
              {field.type === 'textarea' ? (
                <textarea
                  id={`field-${field.id}`}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={responses[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  required={field.required}
                  placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                />
              ) : (
                <input
                  type={field.type || 'text'}
                  id={`field-${field.id}`}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={responses[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  required={field.required}
                  placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                />
              )}
              
              {field.description && (
                <p className="mt-1 text-xs text-gray-500">{field.description}</p>
              )}
            </div>
          ))}

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-gray-200 flex justify-end">
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`inline-flex items-center px-6 py-2.5 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                submitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
            >
              {submitting ? (
                <>
                  <FiLoader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Submitting...
                </>
              ) : (
                'Submit Form'
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default SubmitForm;
