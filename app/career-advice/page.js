import Image from "next/image";
import Link from "next/link";

export default function CareerAdvice() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Career Advice & Resources
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Expert insights and guidance to help you advance in your career
            journey
          </p>

          {/* Search Form */}
          <div className="bg-white p-6 rounded-xl shadow-xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles, topics, or advice"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-2 bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Articles */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Featured Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "How to Ace Your Technical Interview",
                category: "Interview Tips",
                author: "Sarah Johnson",
                date: "2 days ago",
                readTime: "8 min read",
              },
              {
                title: "The Future of Remote Work: Trends and Insights",
                category: "Career Trends",
                author: "Michael Chen",
                date: "4 days ago",
                readTime: "6 min read",
              },
              {
                title: "Building a Strong Professional Network",
                category: "Professional Development",
                author: "Emma Wilson",
                date: "1 week ago",
                readTime: "5 min read",
              },
            ].map((article, index) => (
              <Link
                key={article.title}
                href={`/career-advice/${article.title
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={`https://picsum.photos/seed/article-${index}/800/400`}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-4">
                      {article.title}
                    </h3>
                    <div className="flex items-center">
                      <Image
                        src={`https://picsum.photos/seed/author-${index}/40/40`}
                        alt={article.author}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {article.author}
                        </p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                          <time dateTime="2020-03-16">{article.date}</time>
                          <span aria-hidden="true">&middot;</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Career Resources Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Career Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Resume Templates",
                description: "Professional templates for every career stage",
                icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
              },
              {
                title: "Cover Letter Guide",
                description: "Tips and examples for compelling cover letters",
                icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
              },
              {
                title: "Interview Prep",
                description: "Common questions and preparation strategies",
                icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
              },
              {
                title: "Salary Guide",
                description: "Industry standards and negotiation tips",
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              },
            ].map((resource, index) => (
              <div
                key={resource.title}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={resource.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-600">{resource.description}</p>
                <Link
                  href={`/resources/${resource.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="mt-4 inline-flex items-center text-purple-600 hover:text-purple-700 font-medium group"
                >
                  Learn More
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Articles */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Latest Articles
            </h2>
            <Link
              href="/career-advice/all"
              className="text-purple-600 hover:text-purple-700 font-medium flex items-center group"
            >
              View All
              <svg
                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "10 Essential Skills for Remote Work Success",
                category: "Remote Work",
                author: "Alex Thompson",
                date: "1 day ago",
                readTime: "7 min read",
                excerpt:
                  "Master these key skills to thrive in the remote work environment and boost your productivity...",
              },
              {
                title: "Navigating Career Changes in 2024",
                category: "Career Development",
                author: "Rachel Kim",
                date: "3 days ago",
                readTime: "10 min read",
                excerpt:
                  "Expert strategies for successfully transitioning to a new career path in today's dynamic job market...",
              },
              {
                title: "Mastering Salary Negotiations",
                category: "Career Growth",
                author: "David Martinez",
                date: "5 days ago",
                readTime: "8 min read",
                excerpt:
                  "Learn proven techniques to confidently negotiate your salary and secure the compensation you deserve...",
              },
              {
                title: "Building Your Personal Brand Online",
                category: "Personal Development",
                author: "Sophie Chen",
                date: "1 week ago",
                readTime: "6 min read",
                excerpt:
                  "Discover effective strategies to establish and grow your professional presence in the digital space...",
              },
            ].map((article, index) => (
              <Link
                key={article.title}
                href={`/career-advice/${article.title
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 overflow-hidden flex">
                  <div className="relative w-1/3">
                    <Image
                      src={`https://picsum.photos/seed/latest-${index}/400/400`}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mb-3">
                      {article.category}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-3">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center">
                      <Image
                        src={`https://picsum.photos/seed/author-latest-${index}/32/32`}
                        alt={article.author}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {article.author}
                        </p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                          <time dateTime="2020-03-16">{article.date}</time>
                          <span aria-hidden="true">&middot;</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
