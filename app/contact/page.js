import React from 'react';
import ContactForm from '../components/ContactForm';

export const metadata = {
  title: 'Contact Us | JedMantra',
  description: 'Get in touch with JedMantra for inquiries about tutoring, recruitment, or course learning.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Contact Us</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <p className="text-lg mb-6">
          We are here to help you with all your queries and concerns. Whether you're a tutor looking to join our platform, 
          a recruiter seeking collaborations, or a learner eager to enhance your skills, we are just a message away.
        </p>
        
        <div className="border-t border-b py-6 my-6">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="text-lg">
            <strong>Email for All Enquiries:</strong> <a href="mailto:info@jedmantra.com" className="text-blue-600 hover:underline">info@jedmantra.com</a>
          </p>
        </div>
        
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">For Tutors / Recruiters</h2>
          <p className="mb-4">
            If you are interested in joining Jedmantra Private Limited as a tutor or exploring collaboration opportunities as a recruiter, 
            please reach out to us at:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Email:</strong> <a href="mailto:info@jedmantra.com" className="text-blue-600 hover:underline">info@jedmantra.com</a></li>
            <li><strong>Subject Line:</strong> Tutor/Recruiter Inquiry</li>
          </ul>
          <p className="font-medium">Details to Include:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Full Name</li>
            <li>Contact Number</li>
            <li>Area of Expertise (For Tutors)</li>
            <li>Organization Name (For Recruiters)</li>
            <li>Brief Description of Inquiry</li>
          </ul>
        </div>
        
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">For Course Learners</h2>
          <p className="mb-4">
            If you have questions regarding courses, registration, or learning resources, feel free to contact us at:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Email:</strong> <a href="mailto:info@jedmantra.com" className="text-blue-600 hover:underline">info@jedmantra.com</a></li>
            <li><strong>Subject Line:</strong> Learner Support</li>
          </ul>
          <p className="font-medium">Details to Include:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Full Name</li>
            <li>Contact Number</li>
            <li>Course/Module Name</li>
            <li>Detailed Query or Concern</li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
          <p className="mb-2">
            <strong>Head Office:</strong> Jedmantra Private Limited
          </p>
          <address className="not-italic">
            Street No.3, Block-B, Palla No.1<br />
            Faridabad, Haryana, India
          </address>
        </div>
        
        <div className="mt-12">
          <ContactForm />
        </div>
        
        <div className="mt-10 pt-6 border-t">
          <p className="text-center text-gray-700">
            We aim to respond to all inquiries within 24-48 hours.<br />
            Thank you for connecting with JedMantra Private Limited!
          </p>
        </div>
      </div>
    </div>
  );
} 