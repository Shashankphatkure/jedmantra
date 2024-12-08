import Image from "next/image";
import Link from "next/link";

export default function ArticleDetail() {
  const article = {
    title: "How to Ace Your Technical Interview",
    image: "https://via.placeholder.com/1200x600",
    category: "Interview Tips",
    author: "Sarah Johnson",
    authorImage: "https://via.placeholder.com/80",
    authorRole: "Senior Technical Recruiter",
    date: "February 15, 2024",
    readTime: "8 min read",
    content: `
      Technical interviews can be daunting, but with the right preparation, you can approach them with confidence. Here's your comprehensive guide to succeeding in technical interviews.

      ## Preparation is Key

      The most important aspect of any technical interview is preparation. This includes:

      - Reviewing fundamental concepts
      - Practicing coding problems
      - Understanding the company's tech stack
      - Researching common interview questions

      ## Understanding the Process

      Most technical interviews follow a similar structure:

      1. Introduction and background discussion
      2. Technical problem-solving
      3. System design discussion
      4. Questions for the interviewer

      ## Key Tips for Success

      ### 1. Think Aloud

      Communicate your thought process clearly. Interviewers want to understand how you approach problems, not just the final solution.

      ### 2. Ask Clarifying Questions

      Don't hesitate to ask questions about the problem. This shows attention to detail and helps avoid misunderstandings.

      ### 3. Consider Edge Cases

      Always consider edge cases and potential limitations of your solution. This demonstrates thoroughness and attention to detail.

      ## Common Mistakes to Avoid

      - Jumping to coding without planning
      - Not testing your solution
      - Staying silent while problem-solving
      - Giving up too quickly

      ## After the Interview

      Follow up with a thank-you note and reflect on the experience. Each interview is a learning opportunity, regardless of the outcome.
    `,
  };

  const relatedArticles = [
    {
      title: "Top 5 Programming Languages to Learn in 2024",
      image: "https://via.placeholder.com/400x300",
      category: "Skills Development",
      author: "Michael Chen",
      date: "3 days ago",
      readTime: "6 min read",
    },
    {
      title: "Building Your Tech Career Roadmap",
      image: "https://via.placeholder.com/400x300",
      category: "Career Planning",
      author: "Emma Wilson",
      date: "1 week ago",
      readTime: "5 min read",
    },
    {
      title: "Mastering Behavioral Interviews",
      image: "https://via.placeholder.com/400x300",
      category: "Interview Tips",
      author: "David Kim",
      date: "2 weeks ago",
      readTime: "7 min read",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Enhanced Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Category Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium text-blue-100 mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
              {article.category}
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              {article.title}
            </h1>

            {/* Author Info & Article Meta */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Image
                    src={article.authorImage}
                    alt={article.author}
                    width={56}
                    height={56}
                    className="rounded-full border-2 border-white/20"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <div className="text-left">
                  <p className="text-base font-semibold text-white">
                    {article.author}
                  </p>
                  <p className="text-sm text-blue-200">{article.authorRole}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-blue-200">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 opacity-75" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                  <time dateTime="2024-02-15">{article.date}</time>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 opacity-75" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  {article.readTime}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
      </div>

      {/* Enhanced Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Article Content */}
          <article className="lg:flex-grow lg:max-w-3xl">
            {/* Featured Image Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
              <div className="relative h-[500px]">
                <Image
                  src={article.image}
                  alt={article.title}
                  layout="fill"
                  objectFit="cover"
                  priority
                  className="transition-transform duration-700 hover:scale-105"
                />
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 divide-x divide-gray-100 py-4 bg-gray-50">
                <div className="text-center">
                  <div className="text-sm text-gray-500">Reading Time</div>
                  <div className="font-semibold text-gray-900">{article.readTime}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">Category</div>
                  <div className="font-semibold text-gray-900">{article.category}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">Published</div>
                  <div className="font-semibold text-gray-900">{article.date}</div>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
              <div className="px-8 py-10 prose prose-lg prose-blue max-w-none">
                {article.content.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Enhanced Share and Tags Section */}
              <div className="px-8 py-6 border-t border-gray-100 bg-gray-50">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {["Interview", "Career", "Tech"].map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer group"
                      >
                        #
                        <span className="ml-1 group-hover:underline">
                          {tag}
                        </span>
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button className="inline-flex items-center px-4 py-2 rounded-lg bg-white shadow-sm hover:shadow text-gray-600 hover:text-blue-600 transition-all border border-gray-200">
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                      </svg>
                      Share
                    </button>
                    <button className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Author Bio Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
              <div className="flex items-start space-x-6">
                <Image
                  src={article.authorImage}
                  alt={article.author}
                  width={80}
                  height={80}
                  className="rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    About {article.author}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {article.authorRole}
                  </p>
                  <p className="text-gray-600 mb-4">
                    Sarah is a senior technical recruiter with over 8 years of experience in the tech industry. 
                    She has helped hundreds of candidates successfully navigate technical interviews at top tech companies.
                  </p>
                  <div className="flex items-center space-x-4">
                    <button className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      Follow
                    </button>
                    <button className="text-gray-400 hover:text-blue-600 transition-colors">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <div className="sticky top-8 space-y-8">
              {/* Table of Contents */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Table of Contents
                </h3>
                <nav className="space-y-3">
                  {[
                    "Preparation is Key",
                    "Understanding the Process",
                    "Key Tips for Success",
                    "Common Mistakes to Avoid",
                    "After the Interview"
                  ].map((section, index) => (
                    <a
                      key={index}
                      href={`#${section.toLowerCase().replace(/\s+/g, "-")}`}
                      className="block text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {section}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Related Articles */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Related Articles
                </h3>
                <div className="space-y-6">
                  {relatedArticles.map((related) => (
                    <Link
                      key={related.title}
                      href={`/career-advice/${related.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="group block"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={related.image}
                            alt={related.title}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {related.title}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {related.author} · {related.readTime}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
