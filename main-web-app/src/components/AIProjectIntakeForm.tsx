import React, { useState } from 'react';
import { Upload, FileText, Users, Clock, Target, Lightbulb } from 'lucide-react';

const AIProjectIntakeForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    team: '',
    description: '',
    businessProblem: '',
    expectedImpact: '',
    currentProcess: '',
    timeInvestment: '',
    peopleAffected: '',
    timeline: '',
    useCaseType: '',
    problemCategory: '',
    files: []
  });

  const [showSmartFields, setShowSmartFields] = useState({
    automation: false,
    contentCreation: false,
    dataAnalysis: false
  });

  const useCaseTypes = [
    { value: 'content-creation', label: 'Content Creation', desc: 'Generate, edit, or optimize written content' },
    { value: 'research', label: 'Research', desc: 'Gather and analyze information' },
    { value: 'coding', label: 'Coding', desc: 'Generate, debug, or optimize code' },
    { value: 'data-analysis', label: 'Data Analysis', desc: 'Process and extract insights from data' },
    { value: 'ideation-strategy', label: 'Ideation & Strategy', desc: 'Brainstorm ideas and strategic planning' },
    { value: 'automation', label: 'Automation', desc: 'Automate repetitive manual tasks' }
  ];

  const problemCategories = [
    { value: 'repetitive-tasks', label: 'Repetitive Tasks', desc: 'Manual, time-consuming work' },
    { value: 'skill-bottlenecks', label: 'Skill Bottlenecks', desc: 'Waiting for expert help or specialized skills' },
    { value: 'navigating-ambiguity', label: 'Navigating Ambiguity', desc: 'Getting unstuck on unclear problems' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Smart field logic
    if (field === 'useCaseType') {
      setShowSmartFields({
        automation: value === 'automation',
        contentCreation: value === 'content-creation',
        dataAnalysis: value === 'data-analysis'
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({ ...prev, files: [...prev.files, ...files] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      console.log('Submitting project:', formData);
      
      const response = await fetch('/api/submit-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const result = await response.json();
        alert('Project submitted successfully! Project ID: ' + result.project_id);
      } else {
        alert('Error submitting project');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting project');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit AI Project Idea</h1>
        <p className="text-gray-600">Help us understand your AI project vision. All ideas are welcome!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Lightbulb className="w-5 h-5 mr-2 text-blue-600" />
            Project Overview
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Automated Sales Email Generator"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Team/Department
              </label>
              <input
                type="text"
                value={formData.team}
                onChange={(e) => handleInputChange('team', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Marketing, Engineering, Sales"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe your AI project idea in detail..."
            />
          </div>
        </div>

        {/* Problem & Impact */}
        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-green-600" />
            Problem & Impact
          </h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What business problem does this solve?
            </label>
            <textarea
              value={formData.businessProblem}
              onChange={(e) => handleInputChange('businessProblem', e.target.value)}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Explain the specific problem or pain point..."
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Impact & Benefits
            </label>
            <textarea
              value={formData.expectedImpact}
              onChange={(e) => handleInputChange('expectedImpact', e.target.value)}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="How will this improve efficiency, save time, or drive results?"
            />
          </div>
        </div>

        {/* Use Case Classification */}
        <div className="bg-purple-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-purple-600" />
            Project Classification
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Use Case Type
              </label>
              <select
                value={formData.useCaseType}
                onChange={(e) => handleInputChange('useCaseType', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select use case type...</option>
                {useCaseTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label} - {type.desc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Problem Category
              </label>
              <select
                value={formData.problemCategory}
                onChange={(e) => handleInputChange('problemCategory', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select problem category...</option>
                {problemCategories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label} - {category.desc}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Smart Fields Based on Use Case */}
        {showSmartFields.automation && (
          <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Automation Details</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Manual Process
              </label>
              <textarea
                value={formData.currentProcess}
                onChange={(e) => handleInputChange('currentProcess', e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe the current manual steps that could be automated..."
              />
            </div>
          </div>
        )}

        {/* Resource & Timeline */}
        <div className="bg-orange-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-orange-600" />
            Resources & Timeline
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Currently Spent
              </label>
              <input
                type="text"
                value={formData.timeInvestment}
                onChange={(e) => handleInputChange('timeInvestment', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 5 hours/week"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                People Affected
              </label>
              <input
                type="text"
                value={formData.peopleAffected}
                onChange={(e) => handleInputChange('peopleAffected', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 3 team members"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Desired Timeline
              </label>
              <select
                value={formData.timeline}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select timeline...</option>
                <option value="urgent">Urgent (1-2 weeks)</option>
                <option value="short">Short term (1-2 months)</option>
                <option value="medium">Medium term (3-6 months)</option>
                <option value="long">Long term (6+ months)</option>
              </select>
            </div>
          </div>
        </div>

        {/* File Upload */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Upload className="w-5 h-5 mr-2 text-gray-600" />
            Supporting Files (Optional)
          </h2>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.xlsx,.csv"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">
                Upload examples, mockups, or supporting documents
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PDF, DOC, images, spreadsheets accepted
              </p>
            </label>
            
            {formData.files.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700">Uploaded files:</p>
                <ul className="text-sm text-gray-600">
                  {formData.files.map((file, index) => (
                    <li key={index} className="flex items-center justify-center mt-1">
                      <FileText className="w-4 h-4 mr-1" />
                      {file.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Save Draft
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Submit Project Idea
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIProjectIntakeForm;