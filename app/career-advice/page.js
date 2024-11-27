import Image from "next/image";
import Link from "next/link";

export default function CareerAdvice() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-gray-900">
                Career Advice
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Expert insights, tips, and resources to help you advance in your
                career
              </p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Articles */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Featured Articles
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {[
              {
                title: "How to Ace Your Technical Interview",
                image: "https://via.placeholder.com/600x400",
                category: "Interview Tips",
                author: "Sarah Johnson",
                authorImage: "https://via.placeholder.com/40",
                date: "2 days ago",
                readTime: "8 min read",
              },
              {
                title: "The Future of Remote Work: Trends and Insights",
                image: "https://via.placeholder.com/600x400",
                category: "Career Trends",
                author: "Michael Chen",
                authorImage: "https://via.placeholder.com/40",
                date: "4 days ago",
                readTime: "6 min read",
              },
              {
                title: "Building a Strong Professional Network",
                image: "https://via.placeholder.com/600x400",
                category: "Professional Development",
                author: "Emma Wilson",
                authorImage: "https://via.placeholder.com/40",
                date: "1 week ago",
                readTime: "5 min read",
              },
            ].map((article) => (
              <Link
                key={article.title}
                href={`/career-advice/${article.title
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="block"
              >
                <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
                  <div className="relative h-48">
                    <Image
                      src={article.image}
                      alt={article.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-blue-600">
                      <span>{article.category}</span>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-gray-900">
                      {article.title}
                    </h3>
                    <div className="mt-4 flex items-center">
                      <div className="flex-shrink-0">
                        <Image
                          src={article.authorImage}
                          alt={article.author}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
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

        {/* Career Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Career Resources
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Resume Templates",
                icon: (
                  <svg
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                ),
                description: "Professional templates for every career stage",
              },
              {
                title: "Cover Letter Guide",
                icon: (
                  <svg
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                ),
                description: "Tips and examples for compelling cover letters",
              },
              {
                title: "Interview Prep",
                icon: (
                  <svg
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                ),
                description: "Common questions and preparation strategies",
              },
              {
                title: "Salary Guide",
                icon: (
                  <svg
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                description: "Industry benchmarks and negotiation tips",
              },
            ].map((resource) => (
              <Link key={resource.title} href="#" className="block">
                <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100">
                    {resource.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {resource.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {resource.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest Articles */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Latest Articles
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                title: "10 Skills Every Developer Needs in 2024",
                excerpt:
                  "Stay ahead of the curve with these essential skills for modern software development.",
                category: "Skills Development",
                author: "David Kim",
                authorImage: "https://via.placeholder.com/40",
                date: "3 days ago",
                readTime: "7 min read",
              },
              {
                title: "Navigating Career Transitions Successfully",
                excerpt:
                  "Expert advice on making smooth career transitions and finding your new path.",
                category: "Career Change",
                author: "Lisa Chen",
                authorImage: "https://via.placeholder.com/40",
                date: "5 days ago",
                readTime: "9 min read",
              },
              {
                title: "The Art of Salary Negotiation",
                excerpt:
                  "Learn proven strategies to negotiate better compensation packages.",
                category: "Career Growth",
                author: "James Wilson",
                authorImage: "https://via.placeholder.com/40",
                date: "1 week ago",
                readTime: "6 min read",
              },
              {
                title: "Building Your Personal Brand Online",
                excerpt:
                  "Tips for creating a strong professional presence in the digital age.",
                category: "Personal Development",
                author: "Rachel Thompson",
                authorImage: "https://via.placeholder.com/40",
                date: "1 week ago",
                readTime: "5 min read",
              },
            ].map((article) => (
              <Link
                key={article.title}
                href={`/career-advice/${article.title
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="block"
              >
                <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
                  <div className="p-6">
                    <div className="flex items-center text-sm text-blue-600">
                      <span>{article.category}</span>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-gray-900">
                      {article.title}
                    </h3>
                    <p className="mt-3 text-base text-gray-500">
                      {article.excerpt}
                    </p>
                    <div className="mt-4 flex items-center">
                      <div className="flex-shrink-0">
                        <Image
                          src={article.authorImage}
                          alt={article.author}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
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
