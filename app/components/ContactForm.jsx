'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    userType: 'learner' // Default value
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Replace with your actual form submission logic
      // For example, API call to send email or store contact request
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
      
      setSubmitStatus({
        success: true,
        message: 'Your message has been sent successfully! We will get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        userType: 'learner'
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Failed to send your message. Please try again or email us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
      
      {submitStatus && (
        <div className={`p-4 mb-6 rounded-md ${submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {submitStatus.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="userType" className="block mb-2 font-medium">I am a:</label>
          <select 
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="learner">Course Learner</option>
            <option value="tutor">Tutor</option>
            <option value="recruiter">Recruiter</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-medium">Your Name</label>
          <input 
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-medium">Your Email</label>
          <input 
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="subject" className="block mb-2 font-medium">Subject</label>
          <input 
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block mb-2 font-medium">Your Message</label>
          <textarea 
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        
        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
} 