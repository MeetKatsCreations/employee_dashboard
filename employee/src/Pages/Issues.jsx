// src/pages/Issues.jsx
import { useState } from 'react';
import {
  AlertCircle,
  FileText,
  Send,
  Calendar,
  Clock,
  Upload,
  Check,
  X
} from 'lucide-react';

const Issues = () => {
  const [issueType, setIssueType] = useState('work');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  // Form states
  const [workIssueForm, setWorkIssueForm] = useState({
    title: '',
    priority: 'medium',
    description: '',
    attachments: []
  });

  const [leaveRequestForm, setLeaveRequestForm] = useState({
    leaveType: 'sick',
    startDate: '',
    endDate: '',
    reason: '',
    attachments: []
  });

  const [environmentForm, setEnvironmentForm] = useState({
    category: 'facility',
    location: '',
    description: '',
    attachments: []
  });

  // Handle file uploads
  const handleFileChange = (e, formType) => {
    const files = Array.from(e.target.files);

    switch (formType) {
      case 'work':
        setWorkIssueForm({ ...workIssueForm, attachments: [...workIssueForm.attachments, ...files] });
        break;
      case 'leave':
        setLeaveRequestForm({ ...leaveRequestForm, attachments: [...leaveRequestForm.attachments, ...files] });
        break;
      case 'environment':
        setEnvironmentForm({ ...environmentForm, attachments: [...environmentForm.attachments, ...files] });
        break;
      default:
        break;
    }

    // Clear the file input
    e.target.value = '';
  };

  // Remove file from uploads
  const removeFile = (index, formType) => {
    switch (formType) {
      case 'work':
        setWorkIssueForm({
          ...workIssueForm,
          attachments: workIssueForm.attachments.filter((_, i) => i !== index)
        });
        break;
      case 'leave':
        setLeaveRequestForm({
          ...leaveRequestForm,
          attachments: leaveRequestForm.attachments.filter((_, i) => i !== index)
        });
        break;
      case 'environment':
        setEnvironmentForm({
          ...environmentForm,
          attachments: environmentForm.attachments.filter((_, i) => i !== index)
        });
        break;
      default:
        break;
    }
  };

  // Handle form submission
  const handleSubmit = (e, formType) => {
    e.preventDefault();

    // Here you would normally send the data to your backend
    // For example:
    /*
      const formData = new FormData();
      
      if (formType === 'work') {
        formData.append('title', workIssueForm.title);
        formData.append('priority', workIssueForm.priority);
        formData.append('description', workIssueForm.description);
        workIssueForm.attachments.forEach((file, i) => {
          formData.append(`attachment${i}`, file);
        });
      } else if (formType === 'leave') {
        ...
      }
      
      // API call
      fetch('/api/issues', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        // Handle success
        setShowSuccessAlert(true);
        resetForm(formType);
        setTimeout(() => setShowSuccessAlert(false), 5000);
      })
      .catch(error => {
        // Handle error
        setShowErrorAlert(true);
        setTimeout(() => setShowErrorAlert(false), 5000);
      });
    */

    // For demo purposes:
    setShowSuccessAlert(true);
    resetForm(formType);
    setTimeout(() => setShowSuccessAlert(false), 5000);
  };

  // Reset form after submission
  const resetForm = (formType) => {
    switch (formType) {
      case 'work':
        setWorkIssueForm({
          title: '',
          priority: 'medium',
          description: '',
          attachments: []
        });
        break;
      case 'leave':
        setLeaveRequestForm({
          leaveType: 'sick',
          startDate: '',
          endDate: '',
          reason: '',
          attachments: []
        });
        break;
      case 'environment':
        setEnvironmentForm({
          category: 'facility',
          location: '',
          description: '',
          attachments: []
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Issues & Requests</h1>
        <div className="mt-4 md:mt-0 bg-gray-100 rounded-lg p-1">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${issueType === 'work' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
              }`}
            onClick={() => setIssueType('work')}
          >
            Work Issues
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${issueType === 'leave' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
              }`}
            onClick={() => setIssueType('leave')}
          >
            Leave Requests
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${issueType === 'environment' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
              }`}
            onClick={() => setIssueType('environment')}
          >
            Work Environment
          </button>
        </div>
      </div>

      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="mb-6 p-4 rounded-md bg-green-50 border border-green-200 flex items-start">
          <Check size={20} className="text-green-500 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">Success!</h3>
            <div className="mt-1 text-sm text-green-700">
              Your request has been submitted successfully. Our team will review it shortly.
            </div>
          </div>
          <button
            className="ml-auto"
            onClick={() => setShowSuccessAlert(false)}
          >
            <X size={18} className="text-green-500" />
          </button>
        </div>
      )}

      {/* Error Alert */}
      {showErrorAlert && (
        <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200 flex items-start">
          <AlertCircle size={20} className="text-red-500 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error!</h3>
            <div className="mt-1 text-sm text-red-700">
              There was a problem submitting your request. Please try again.
            </div>
          </div>
          <button
            className="ml-auto"
            onClick={() => setShowErrorAlert(false)}
          >
            <X size={18} className="text-red-500" />
          </button>
        </div>
      )}

      {/* Work Issues Form */}
      {issueType === 'work' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center border-b border-gray-200 pb-4 mb-4">
            <AlertCircle size={24} className="text-blue-500" />
            <h2 className="text-lg font-medium ml-2">Report Work Issue</h2>
          </div>
          <form onSubmit={(e) => handleSubmit(e, 'work')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issue Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief title describing the issue"
                  value={workIssueForm.title}
                  onChange={(e) => setWorkIssueForm({ ...workIssueForm, title: e.target.value })}
                  required
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority Level
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={workIssueForm.priority}
                  onChange={(e) => setWorkIssueForm({ ...workIssueForm, priority: e.target.value })}
                >
                  <option value="low">Low - Can be addressed later</option>
                  <option value="medium">Medium - Needs attention soon</option>
                  <option value="high">High - Urgent issue</option>
                  <option value="critical">Critical - Blocking work</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issue Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="5"
                  placeholder="Please provide detailed information about the issue..."
                  value={workIssueForm.description}
                  onChange={(e) => setWorkIssueForm({ ...workIssueForm, description: e.target.value })}
                  required
                ></textarea>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attachments (Screenshots, Documents)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="work-file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                      >
                        <span>Upload files</span>
                        <input
                          id="work-file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          multiple
                          onChange={(e) => handleFileChange(e, 'work')}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB each</p>
                  </div>
                </div>

                {/* Display uploaded files */}
                {workIssueForm.attachments.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-700">Uploaded files:</h4>
                    <ul className="mt-2 divide-y divide-gray-200">
                      {workIssueForm.attachments.map((file, index) => (
                        <li key={index} className="py-2 flex justify-between items-center">
                          <div className="flex items-center">
                            <FileText size={16} className="text-gray-500" />
                            <span className="ml-2 text-sm text-gray-700">{file.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index, 'work')}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="mr-3 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => resetForm('work')}
              >
                Clear Form
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="flex items-center">
                  <Send size={16} className="mr-2" />
                  Submit Issue
                </span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Leave Request Form */}
      {issueType === 'leave' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center border-b border-gray-200 pb-4 mb-4">
            <Calendar size={24} className="text-blue-500" />
            <h2 className="text-lg font-medium ml-2">Request Leave</h2>
          </div>
          <form onSubmit={(e) => handleSubmit(e, 'leave')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Leave Type
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={leaveRequestForm.leaveType}
                  onChange={(e) => setLeaveRequestForm({ ...leaveRequestForm, leaveType: e.target.value })}
                >
                  <option value="sick">Sick Leave</option>
                  <option value="vacation">Vacation</option>
                  <option value="personal">Personal Leave</option>
                  <option value="bereavement">Bereavement</option>
                  <option value="unpaid">Unpaid Leave</option>
                </select>
              </div>
              <div className="col-span-2 md:col-span-1">
                {/* This div is intentionally empty to maintain the grid layout */}
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={leaveRequestForm.startDate}
                  onChange={(e) => setLeaveRequestForm({ ...leaveRequestForm, startDate: e.target.value })}
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={leaveRequestForm.endDate}
                  onChange={(e) => setLeaveRequestForm({ ...leaveRequestForm, endDate: e.target.value })}
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Leave
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                  placeholder="Please provide details about your leave request..."
                  value={leaveRequestForm.reason}
                  onChange={(e) => setLeaveRequestForm({ ...leaveRequestForm, reason: e.target.value })}
                  required
                ></textarea>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Supporting Documents
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="leave-file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                      >
                        <span>Upload files</span>
                        <input
                          id="leave-file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          multiple
                          onChange={(e) => handleFileChange(e, 'leave')}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      For sick leave: medical certificates, doctor's notes<br />
                      PNG, JPG, PDF up to 10MB each
                    </p>
                  </div>
                </div>

                {/* Display uploaded files */}
                {leaveRequestForm.attachments.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-700">Uploaded files:</h4>
                    <ul className="mt-2 divide-y divide-gray-200">
                      {leaveRequestForm.attachments.map((file, index) => (
                        <li key={index} className="py-2 flex justify-between items-center">
                          <div className="flex items-center">
                            <FileText size={16} className="text-gray-500" />
                            <span className="ml-2 text-sm text-gray-700">{file.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index, 'leave')}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="mr-3 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => resetForm('leave')}
              >
                Clear Form
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="flex items-center">
                  <Send size={16} className="mr-2" />
                  Submit Request
                </span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Work Environment Issues Form */}
      {issueType === 'environment' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center border-b border-gray-200 pb-4 mb-4">
            <AlertCircle size={24} className="text-blue-500" />
            <h2 className="text-lg font-medium ml-2">Report Work Environment Issue</h2>
          </div>
          <form onSubmit={(e) => handleSubmit(e, 'environment')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issue Category
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={environmentForm.category}
                  onChange={(e) => setEnvironmentForm({ ...environmentForm, category: e.target.value })}
                >
                  <option value="facility">Facility Issues (AC, Lighting, etc.)</option>
                  <option value="equipment">Equipment Problems</option>
                  <option value="software">Software/Technical Issues</option>
                  <option value="safety">Health & Safety Concerns</option>
                  <option value="colleagues">Workplace Relations</option>
                </select>
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location/Department
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Where is this issue occurring?"
                  value={environmentForm.location}
                  onChange={(e) => setEnvironmentForm({ ...environmentForm, location: e.target.value })}
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issue Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="5"
                  placeholder="Please provide detailed information about the work environment issue..."
                  value={environmentForm.description}
                  onChange={(e) => setEnvironmentForm({ ...environmentForm, description: e.target.value })}
                  required
                ></textarea>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Supporting Evidence (Photos, etc.)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="environment-file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                      >
                        <span>Upload files</span>
                        <input
                          id="environment-file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          multiple
                          onChange={(e) => handleFileChange(e, 'environment')}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB each</p>
                  </div>
                </div>

                {/* Display uploaded files */}
                {environmentForm.attachments.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-700">Uploaded files:</h4>
                    <ul className="mt-2 divide-y divide-gray-200">
                      {environmentForm.attachments.map((file, index) => (
                        <li key={index} className="py-2 flex justify-between items-center">
                          <div className="flex items-center">
                            <FileText size={16} className="text-gray-500" />
                            <span className="ml-2 text-sm text-gray-700">{file.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index, 'environment')}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="mr-3 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => resetForm('environment')}
              >
                Clear Form
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="flex items-center">
                  <Send size={16} className="mr-2" />
                  Submit Issue
                </span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Recent Submissions - Can be connected to backend to show actual data */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Submissions</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title/Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Sample data rows - would come from backend in real implementation */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">INC-2023</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Work Issue</td>
                <td className="px-6 py-4 text-sm text-gray-900">Software licensing problem with Adobe Creative Suite</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    In Progress
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">April 15, 2025</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">LRQ-1045</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Leave Request</td>
                <td className="px-6 py-4 text-sm text-gray-900">Vacation - Family trip</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Approved
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">April 10, 2025</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">ENV-3072</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Environment</td>
                <td className="px-6 py-4 text-sm text-gray-900">Meeting room 2B air conditioning not working</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Under Review
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">April 17, 2025</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">LRQ-1044</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Leave Request</td>
                <td className="px-6 py-4 text-sm text-gray-900">Sick Leave - Doctor's appointment</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Rejected
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">April 5, 2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Issues;