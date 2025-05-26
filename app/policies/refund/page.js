export const metadata = {
  title: "Refund Policy | JedMantra",
  description: "Refund Policy for JedMantra - Learn about our refund terms and conditions.",
};

export default function RefundPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Refund Policy</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-6">Effective Date: May 21, 2025</p>
        
        <p className="mb-6">
          At Jedmantra Private Limited, we are committed to providing high-quality educational content and a seamless user experience. 
          We value the trust you place in us when you purchase our courses. This Refund Policy outlines the circumstances under which 
          refunds may be issued and the process to request them.
        </p>
        
        <hr className="my-8 border-gray-300" />
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">1. General Refund Terms</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Digital Nature of Products:</strong> Since all courses sold on our platform are digital and delivered instantly or via scheduled access, we generally do not offer refunds once the course content has been accessed (streamed or downloaded).</li>
          <li>
            <strong>Refund Eligibility:</strong>
            <p>Refunds may be issued only under the following conditions:</p>
            <ul className="list-circle pl-6 mt-2 space-y-1">
              <li>The user has not accessed or downloaded any part of the course.</li>
              <li>The refund request is made within 7 calendar days of the purchase.</li>
              <li>The course was purchased at full price (not during a special offer or discount).</li>
            </ul>
          </li>
        </ul>
        
        <hr className="my-8 border-gray-300" />
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Non-Refundable Situations</h2>
        <p className="mb-3">Refunds will not be issued in the following situations:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>User has accessed/downloaded/streamed any part of the course.</li>
          <li>The refund request is made after 7 calendar days of purchase.</li>
          <li>Courses purchased at discounted prices, bundled deals, or via coupons are not eligible for a refund.</li>
          <li>Dissatisfaction due to lack of prerequisite knowledge or change of interest.</li>
          <li>Course completion but claiming non-satisfaction.</li>
          <li>Technical issues originating from the user's device or internet connection.</li>
        </ul>
        
        <hr className="my-8 border-gray-300" />
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">3. How to Request a Refund</h2>
        <p className="mb-3">To request a refund, please follow these steps:</p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li>Email us at <a href="mailto:support@jedmantra.com" className="text-blue-600 hover:underline">support@jedmantra.com</a> with the subject line "Refund Request".</li>
          <li>
            Provide the following details in your email:
            <ul className="list-circle pl-6 mt-2 space-y-1">
              <li>Full Name</li>
              <li>Registered Email Address</li>
              <li>Course Name</li>
              <li>Purchase Date</li>
              <li>Refund Amount</li>
              <li>Transaction id</li>
              <li>Reason for Refund</li>
            </ul>
          </li>
          <li>Our support team will respond within 3 business days and initiate the review process.</li>
          <li>If eligible, your refund will be processed within 7-10 business days and credited via the original payment method through our payment partner.</li>
        </ol>
        
        <hr className="my-8 border-gray-300" />
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Refund for Duplicate Payment</h2>
        <p className="mb-6">
          In the event of a duplicate payment made by the customer, the excess amount will be refunded after verification, 
          within 7 business days of receiving a written complaint.
        </p>
        
        <hr className="my-8 border-gray-300" />
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Course Cancellation by Jedmantra</h2>
        <p className="mb-6">
          If a course is cancelled by Jedmantra Private Limited due to technical or content-related issues, 
          full refunds will be provided to all enrolled users. Users may also be offered an option to transfer the fee to another course.
        </p>
        
        <hr className="my-8 border-gray-300" />
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Payment Gateway and Processing Fees</h2>
        <p className="mb-6">
          In some cases, payment gateway charges (if applicable and non-refundable by payment integration partner) may be deducted from the refund amount.
        </p>
        
        <hr className="my-8 border-gray-300" />
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Changes to this Refund Policy</h2>
        <p className="mb-6">
          Jedmantra Private Limited reserves the right to modify or update this Refund Policy at any time. 
          Changes will be effective immediately upon posting on our website.
        </p>
        
        <hr className="my-8 border-gray-300" />
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Contact Us</h2>
        <p className="mb-6">
          If you have any questions regarding our refund policy, please contact:<br />
          Jedmantra Private Limited<br />
          Email: <a href="mailto:support@jedmantra.com" className="text-blue-600 hover:underline">support@jedmantra.com</a><br />
          Website: <a href="https://www.jedmantra.com" className="text-blue-600 hover:underline">www.jedmantra.com</a>
        </p>
        
        <hr className="my-8 border-gray-300" />
        
        <p className="italic text-gray-700">
          Note: By purchasing a course on Jedmantra Private Limited, you acknowledge and agree to this Refund Policy.
        </p>
      </div>
    </div>
  );
}
