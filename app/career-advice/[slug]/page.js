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
    <div className="min-h-screen bg-gray-100">
      {/* Article Header */}
      <div className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-blue-600 text-sm font-medium mb-2">
              {article.category}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center">
                <Image
                  src={article.authorImage}
                  alt={article.author}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="ml-3 text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {article.author}
                  </p>
                  <p className="text-sm text-gray-500">{article.authorRole}</p>
                </div>
              </div>
              <span className="text-gray-300">|</span>
              <div className="text-sm text-gray-500">
                <time dateTime="2024-02-15">{article.date}</time>
              </div>
              <span className="text-gray-300">|</span>
              <div className="text-sm text-gray-500">{article.readTime}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white shadow rounded-lg overflow-hidden">
          {/* Featured Image */}
          <div className="relative h-96">
            <Image
              src={article.image}
              alt={article.title}
              layout="fill"
              objectFit="cover"
            />
          </div>

          {/* Article Content */}
          <div className="px-6 py-8 prose prose-blue max-w-none">
            {article.content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Share and Tags */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
                <button className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Share on Twitter</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Share on LinkedIn</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex space-x-2">
                {["Interview", "Career", "Tech"].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Author Bio */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image
                src={article.authorImage}
                alt={article.author}
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
            <div className="ml-6">
              <h3 className="text-lg font-medium text-gray-900">
                {article.author}
              </h3>
              <p className="text-sm text-gray-500">{article.authorRole}</p>
              <p className="mt-2 text-gray-600">
                Sarah is a senior technical recruiter with over 8 years of
                experience in the tech industry. She has helped hundreds of
                candidates successfully navigate technical interviews at top
                tech companies.
              </p>
              <div className="mt-4">
                <Link
                  href="#"
                  className="text-blue-600 hover:text-blue-500 font-medium text-sm"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map((related) => (
              <Link
                key={related.title}
                href={`/career-advice/${related.title
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="block"
              >
                <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
                  <div className="relative h-48">
                    <Image
                      src={related.image}
                      alt={related.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-blue-600">
                      {related.category}
                    </div>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">
                      {related.title}
                    </h3>
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <span>{related.author}</span>
                      <span className="mx-1">&middot;</span>
                      <span>{related.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
