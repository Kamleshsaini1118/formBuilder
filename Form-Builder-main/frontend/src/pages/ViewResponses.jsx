import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResponses } from "../services/responseService";
import { toast } from "react-hot-toast";
import { 
  IoArrowBack, 
  IoDocumentText, 
  IoTimeOutline,
  IoPerson,
  IoChevronDown,
  IoChevronUp
} from "react-icons/io5";

const ViewResponses = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formTitle, setFormTitle] = useState("Form Responses");
  const [expandedResponse, setExpandedResponse] = useState(null);

  // Toggle response expansion
  const toggleResponse = (index) => {
    setExpandedResponse(expandedResponse === index ? null : index);
  };

  // Format date to a readable format
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Fetch form responses on mount
  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const data = await getResponses(formId);
        setResponses(data.responses || []);
        setFormTitle(data.formTitle || "Form Responses");
      } catch (err) {
        console.error("Error fetching responses:", err);
        toast.error("Failed to load responses.");
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [formId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-medium text-gray-700">Loading responses...</h2>
          <p className="text-gray-500 mt-2">Please wait while we fetch the form responses</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 self-start"
          >
            <IoArrowBack size={20} />
            <span className="font-medium">Back</span>
          </button>

          <div className="text-center sm:text-right">
            <h1 className="text-2xl font-bold text-gray-900">{formTitle}</h1>
            <p className="text-gray-500 flex items-center justify-center sm:justify-end gap-2 mt-1">
              <IoDocumentText size={16} />
              {responses.length} {responses.length === 1 ? 'response' : 'responses'}
            </p>
          </div>
        </div>

        {/* Responses List */}
        <div className="space-y-4">
          {responses.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                <IoDocumentText size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No responses yet</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                This form hasn't received any responses yet. Share the form to start collecting responses.
              </p>
            </div>
          ) : (
            responses.map((response, index) => (
              <div 
                key={response._id || index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleResponse(index)}
                  className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <IoPerson size={20} />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium text-gray-900">Response #{index + 1}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <IoTimeOutline size={14} />
                        <span>{formatDate(response.submittedAt || new Date())}</span>
                      </div>
                    </div>
                  </div>
                  {expandedResponse === index ? 
                    <IoChevronUp className="text-gray-400" size={20} /> : 
                    <IoChevronDown className="text-gray-400" size={20} />
                  }
                </button>
                
                {expandedResponse === index && (
                  <div className="p-4 pt-0 border-t border-gray-100">
                    <div className="space-y-4">
                      {Object.entries(response.answers || {}).map(([question, answer], idx) => (
                        <div key={idx} className="pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                          <h4 className="font-medium text-gray-700 mb-1">{question}</h4>
                          <p className="text-gray-800">
                            {answer || <span className="text-gray-400 italic">No answer provided</span>}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewResponses;
