export const metadata = {
  title: "About Us | JedMantra",
  description: "Learn about JedMantra - our vision, mission, and what drives us to create innovative solutions.",
};

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">About Us</h1>
      
      <section className="mb-8">
        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
          Welcome to Jedmantra Private Limited, a dynamic and forward-thinking organization committed 
          to revolutionizing the digital landscape through innovative solutions. At Jedmantra, we aim 
          to empower individuals and businesses by providing cutting-edge technology, seamless digital 
          experiences, and impactful services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Our vision is to become a leading digital platform that bridges the gap between education, 
          employment, and skill enhancement by offering robust solutions for career growth, learning 
          opportunities, and professional networking.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Our mission is to create an integrated ecosystem where job seekers, employers, students, and 
          educators can connect effectively. We strive to deliver user-centric platforms that enable 
          individuals to unlock their true potential and achieve career success.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">What We Do</h2>
        <p className="text-gray-700 mb-4">At Jedmantra Private Limited, we specialize in:</p>
        <ul className="list-disc ml-8 text-gray-700 mb-4 space-y-3 leading-relaxed">
          <li>
            <strong>E-learning Solutions:</strong> Interactive courses, tutorials, and resources to help 
            learners enhance their skills and knowledge.
          </li>
          <li>
            <strong>Job Portal Services:</strong> A dedicated platform for job seekers and recruiters, 
            ensuring better connectivity and improved hiring processes.
          </li>
          <li>
            <strong>Career Guidance:</strong> Expert advice, mentorship, and skill development programs 
            to support individual career aspirations.
          </li>
          <li>
            <strong>Innovative Tech Solutions:</strong> Customized digital tools, web solutions, and 
            software development for businesses to thrive in the digital era.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Meet Our Founder</h2>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
          <p className="text-gray-700 mb-4 leading-relaxed">
            Dr. A Nirala, the visionary founder of Jedmantra Private Limited, is an accomplished academician 
            and entrepreneur. Dr. Nirala holds prestigious degrees from IIT Kanpur and IIT (ISM) Dhanbad, India. 
            With extensive experience in academia, materials science, and digital innovation, Dr. Nirala has 
            played a significant role in bridging education and technology to empower aspiring individuals 
            worldwide. His leadership, combined with his expertise, drives Jedmantra's mission to build 
            impactful solutions for the digital age.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
        <ul className="list-disc ml-8 text-gray-700 mb-4 space-y-3 leading-relaxed">
          <li>
            <strong>Innovative Solutions:</strong> We leverage the latest technologies to deliver unique 
            and efficient digital experiences.
          </li>
          <li>
            <strong>User-Centric Approach:</strong> Our platforms are designed to prioritize user needs 
            and ensure seamless interaction.
          </li>
          <li>
            <strong>Expert Team:</strong> Backed by professionals with extensive industry knowledge, we 
            provide trusted solutions that drive success.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
        <p className="text-gray-700 mb-4">For inquiries, partnerships, or support, feel free to reach out to us:</p>
        <ul className="list-disc ml-8 text-gray-700 mb-4 space-y-2">
          <li>
            <strong>Website:</strong> <a href="https://www.jedmantra.com" className="text-pink-600 hover:text-pink-800">www.jedmantra.com</a>
          </li>
          <li>
            <strong>Email:</strong> <a href="mailto:info@jedmantra.com" className="text-pink-600 hover:text-pink-800">info@jedmantra.com</a>
          </li>
        </ul>
        <p className="text-gray-700 mt-6 leading-relaxed">
          We at Jedmantra Private Limited are dedicated to unlocking opportunities and fostering growth 
          through innovation and collaboration. Join us in transforming the future of learning, employment, 
          and digital solutions.
        </p>
      </section>
    </div>
  );
} 