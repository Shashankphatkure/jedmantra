"use client";

import Image from "next/image";
import Link from "next/link";

export default function Pricing() {
  const plans = [
    {
      name: "Expert Plan",
      price: "₹2,499",
      period: "per month",
      description: "Best for professionals",
      features: [
        "Access to all courses including premium",
        "Full community access",
        "Priority email support",
        "Unlimited job applications",
        "Resume review (once per month)",
        "Career coaching session (monthly)",
        "Certification on course completion"
      ],
      cta: "Get Expert Plan",
      popular: true,
      color: "purple"
    }
  ];

  const testimonials = [
    {
      id: 1,
      quote: "JedMantra transformed my career completely! From a fresher to a senior developer at Google in just 8 months. The practical projects and mentorship were game-changers.",
      author: "Priya Sharma",
      role: "Senior Software Engineer",
      company: "Google India",
      avatar: "/Profilepic/1.jpg",
      location: "Bangalore, India",
      rating: 5,
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      backgroundImage: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      quote: "The expert plan's career coaching helped me negotiate a 150% salary hike. The Industry Role-Play sessions prepared me for real-world challenges perfectly.",
      author: "Arjun Patel",
      role: "Product Manager",
      company: "Flipkart",
      avatar: "/Profilepic/2.jpg",
      location: "Mumbai, India",
      rating: 5,
      companyLogo: "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png",
      backgroundImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      quote: "As a working mother, JedMantra's flexible learning helped me transition from teaching to tech. Now I'm leading a team of 15 developers at Infosys!",
      author: "Sneha Reddy",
      role: "Technical Lead",
      company: "Infosys",
      avatar: "/Profilepic/3.jpg",
      location: "Hyderabad, India",
      rating: 5,
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/4/48/Infosys_Logo.svg",
      backgroundImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      quote: "From a small town in Rajasthan to working at Microsoft - JedMantra made my dreams come true. The community support was incredible throughout my journey.",
      author: "Vikash Kumar",
      role: "Cloud Solutions Architect",
      company: "Microsoft",
      avatar: "/Profilepic/4.jpg",
      location: "Jaipur, India",
      rating: 5,
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      backgroundImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      quote: "The AI/ML courses at JedMantra are world-class. I went from zero knowledge to building production ML models at Zomato in 6 months!",
      author: "Ananya Singh",
      role: "ML Engineer",
      company: "Zomato",
      avatar: "/Profilepic/5.jpg",
      location: "Delhi, India",
      rating: 5,
      companyLogo: "https://logos-world.net/wp-content/uploads/2021/03/Zomato-Logo.png",
      backgroundImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      quote: "JedMantra's blockchain courses helped me start my own fintech startup. We've raised ₹2 crores in seed funding! The entrepreneurship guidance was invaluable.",
      author: "Rohit Agarwal",
      role: "Founder & CEO",
      company: "CryptoFinance Solutions",
      avatar: "/Profilepic/6.jpg",
      location: "Pune, India",
      rating: 5,
      companyLogo: "https://via.placeholder.com/120x40/4f46e5/FFFFFF?text=CFS",
      backgroundImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop"
    }
  ];

  const faqs = [
    {
      question: "What's included in the Expert Plan?",
      answer: "The Expert Plan is our comprehensive package designed for serious professionals. You get unlimited access to all premium courses including AI/ML, Data Science, Full-Stack Development, and Cloud Computing. Plus, enjoy full community access with networking opportunities, priority email support with 4-hour response time, unlimited job applications through our partner network, monthly one-on-one resume reviews by industry experts, personalized career coaching sessions, and industry-recognized certifications upon course completion.",
      highlights: ["All Premium Courses", "Priority Support", "Career Coaching", "Certifications"],
      responseTime: "4 hours"
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Absolutely! We believe in complete flexibility for our users. You can cancel your Expert Plan subscription at any time through your account dashboard or by contacting our support team. There are no long-term contracts, hidden fees, or cancellation penalties. Once you cancel, you'll retain full access to all features until the end of your current billing period, ensuring you get the full value of what you've paid for.",
      highlights: ["No Contracts", "No Penalties", "Instant Cancellation", "Full Access Until Period Ends"],
      responseTime: "Immediate"
    },
    {
      question: "Do you offer a money-back guarantee?",
      answer: "Yes, we stand behind our service with a comprehensive 30-day money-back guarantee. If you're not completely satisfied with the Expert Plan within the first 30 days of your subscription, simply contact our support team and we'll provide a full refund with no questions asked. This gives you risk-free access to explore all our premium features, courses, and coaching services.",
      highlights: ["30-Day Guarantee", "Full Refund", "No Questions Asked", "Risk-Free Trial"],
      responseTime: "24-48 hours"
    },
    {
      question: "How does the career coaching work?",
      answer: "Our career coaching is a personalized, one-on-one experience with certified industry experts who have worked at top companies like Google, Microsoft, and Amazon. Each month, you'll have a dedicated 60-minute session covering personalized career roadmaps, interview preparation with mock interviews, salary negotiation strategies, LinkedIn profile optimization, and ongoing mentorship. Your coach will track your progress and provide actionable insights tailored to your specific career goals and industry.",
      highlights: ["1-on-1 Sessions", "Industry Experts", "Mock Interviews", "Salary Negotiation"],
      responseTime: "Weekly check-ins"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Custom CSS for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `
      }} />
      {/* Animated Background */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E5E7EB' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto py-20 px-4 sm:py-32 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-800 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Limited Time Offer - Save 30%
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-[#4f46e5] from-sky-400 via-sky-500 to-indigo-600 bg-clip-text text-transparent leading-tight" style={{backgroundImage: 'linear-gradient(to right, #0ea5e9, #0284c7, #4f46e5)'}}>
              Choose Your Success Plan
            </h1>
            <p className="mt-8 max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
              Unlock your potential with our premium learning platform. Join thousands of professionals who've transformed their careers.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                14-day free trial
              </div>
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No credit card required
              </div>
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your learning journey. All plans include our core features with no hidden fees.
          </p>
        </div>

        <div className="flex justify-center">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative group max-w-md w-full ${
                plan.popular
                  ? "transform scale-105 z-10"
                  : "hover:scale-105"
              } transition-all duration-300`}
            >
              {/* Glass Card */}
              <div className="relative h-full rounded-3xl bg-white/80 backdrop-blur-lg border border-gray-200 shadow-2xl overflow-hidden">


                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  plan.popular
                    ? "from-indigo-100/50 to-indigo-50/50"
                    : "from-blue-50/30 to-indigo-50/30"
                } opacity-50`}></div>

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
                      plan.popular
                        ? "bg-gradient-to-br from-indigo-500 to-indigo-600"
                        : "bg-gradient-to-br from-blue-500 to-indigo-500"
                    } shadow-lg`} style={{backgroundColor: plan.popular ? '#4f46e5' : undefined}}>
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {plan.popular ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        ) : index === 0 ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        )}
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-gray-900">
                        {plan.price}
                      </span>
                      <span className="text-gray-600 ml-2 text-lg">
                        {plan.period}
                      </span>
                    </div>
                    {plan.popular && (
                      <div className="mt-2 text-green-600 text-sm font-medium">
                        Save 30% with annual billing
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="flex-1 mb-8">
                    <ul className="space-y-4">
                      {plan.features.map((feature, featureIdx) => (
                        <li key={featureIdx} className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                              plan.popular
                                ? "bg-gradient-to-r from-indigo-500 to-indigo-600"
                                : "bg-gradient-to-r from-blue-500 to-indigo-500"
                            }`} style={{backgroundColor: plan.popular ? '#4f46e5' : undefined}}>
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                          <p className="ml-3 text-gray-700 text-sm leading-relaxed">
                            {feature}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <button
                      type="button"
                      className={`w-full py-4 px-6 rounded-2xl font-semibold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 ${
                        plan.popular
                          ? "bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 shadow-lg shadow-indigo-500/25 focus:ring-indigo-500/25"
                          : "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 shadow-lg shadow-gray-500/25 focus:ring-gray-500/25"
                      }`}
                      style={plan.popular ? {backgroundColor: '#4f46e5'} : undefined}
                    >
                      {plan.cta}
                    </button>
                    {!plan.popular && (
                      <p className="text-center text-gray-500 text-xs mt-3">
                        Upgrade or downgrade anytime
                      </p>
                    )}
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-indigo-100/30 rounded-full blur-xl"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-indigo-200/30 rounded-full blur-lg"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-green-100 border border-green-200 text-green-800">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            30-day money-back guarantee on all plans
          </div>
        </div>
      </div>

      {/* Testimonials section */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* Testimonials Announcement Banner */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-800 text-sm font-medium mb-8" style={{backgroundColor: '#f0f9ff', borderColor: '#e0e7ff', color: '#4f46e5'}}>
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              testimonials
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of professionals who've transformed their careers with JedMantra
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Enhanced Glass Card with Indian Theme */}
                <div className="relative h-full rounded-3xl bg-white/95 backdrop-blur-xl border border-orange-100/50 p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:rotate-1 group-hover:bg-gradient-to-br group-hover:from-orange-50/30 group-hover:to-green-50/30">
                  {/* Indian Flag Inspired Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 via-white/10 to-green-50/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Success Badge */}
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg" style={{backgroundColor: '#4f46e5'}}>
                    ⭐ Success Story
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Enhanced Quote Icon with Indian Colors */}
                    <div className="mb-6 flex justify-between items-start">
                      <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl shadow-lg" style={{backgroundColor: '#4f46e5'}}>
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                        </svg>
                      </div>
                      {/* Location Badge */}
                      <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                        <svg className="w-3 h-3 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-blue-600 text-xs font-medium">{testimonial.location}</span>
                      </div>
                    </div>

                    {/* Enhanced Quote */}
                    <p className="text-gray-800 text-base leading-relaxed mb-8 font-medium">
                      "{testimonial.quote}"
                    </p>

                    {/* Simple Author Section */}
                    <div className="flex items-center mb-6">
                      <div className="relative">
                        <Image
                          className="h-16 w-16 rounded-full object-cover"
                          src={testimonial.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.author)}&background=4f46e5&color=fff&size=64`}
                          alt={testimonial.author}
                          width={64}
                          height={64}
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.author)}&background=4f46e5&color=fff&size=64`;
                          }}
                        />
                      </div>
                      <div className="ml-5">
                        <h4 className="text-gray-900 font-bold text-lg">
                          {testimonial.author}
                        </h4>
                        <p className="text-indigo-600 font-semibold text-sm" style={{color: '#4f46e5'}}>
                          {testimonial.role}
                        </p>
                        <p className="text-gray-600 text-sm font-medium">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>

                    {/* Enhanced Rating Section */}
                    <div className="flex items-center justify-between pt-6 border-t border-gradient-to-r from-orange-200 to-green-200">
                      <div className="flex items-center">
                        <div className="flex space-x-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-gray-700 text-sm font-semibold ml-2">{testimonial.rating}.0</span>
                      </div>
                      {/* Career Growth Indicator */}
                      <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
                        <svg className="w-4 h-4 text-green-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-green-700 text-xs font-bold">Career Growth</span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Decorative Elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-orange-200/30 to-green-200/30 rounded-full blur-xl"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-lg"></div>

                  {/* Indian Pattern Decoration */}
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <div className="absolute top-0 left-0 w-full h-full" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FF6B35' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* FAQ section */}
      <div className="relative z-10 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* FAQ Announcement Banner */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-800 text-sm font-medium mb-8" style={{backgroundColor: '#f0f9ff', borderColor: '#e0e7ff', color: '#4f46e5'}}>
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
              Got Questions?
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our plans and features
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {faqs.map((faq, index) => (
              <div key={index} className="group h-full">
                <div className="h-full rounded-2xl bg-white/20 backdrop-blur-lg border border-white/30 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/30 hover:backdrop-blur-xl flex flex-col">

                  {/* Question */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
                      {faq.question}
                    </h3>

                    {/* Answer */}
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute top-2 right-2 w-16 h-16 bg-indigo-100/30 rounded-full blur-xl"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-600 border border-indigo-500 text-white hover:from-indigo-600 hover:to-indigo-700 hover:shadow-lg transition-all duration-300 group shadow-md"
              style={{backgroundColor: '#4f46e5'}}
            >
              <span className="mr-2 font-semibold">Still have questions? Contact us</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="relative z-10 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Glass CTA Card */}
          <div className="rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl p-12 relative overflow-hidden">
            {/* Light Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5"></div>

            {/* Content */}
            <div className="relative z-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 border border-green-200 text-green-700 text-sm font-medium mb-6">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                14-Day Free Trial Available
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Ready to Transform
                <span className="block bg-gradient-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(to right, #4f46e5, #6366f1)'}}>
                  Your Career?
                </span>
              </h2>

              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of professionals who've accelerated their careers with JedMantra. Start your journey today with our risk-free trial.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/signup"
                  className="inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/25"
                  style={{backgroundColor: '#4f46e5'}}
                >
                  <span className="mr-2">Start Free Trial</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>

                <Link
                  href="/demo"
                  className="inline-flex items-center px-8 py-4 rounded-2xl bg-gray-100 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-gray-200 transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9 5a9 9 0 1118 0 9 9 0 01-18 0z" />
                  </svg>
                  Watch Demo
                </Link>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center items-center text-gray-600 text-sm">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No credit card required
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Cancel anytime
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  30-day money back
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 bg-indigo-600/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>


    </div>
  );
}