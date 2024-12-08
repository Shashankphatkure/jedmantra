import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

function formatDate(dateString) {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function formatDateTime(dateString) {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function getTimeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffTime = Math.abs(now - past);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

async function getArticleData(slug) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // Fetch article with author data
  const { data: article, error } = await supabase
    .from('articles')
    .select(`
      *,
      author:users!articles_author_id_fkey (
        id,
        name,
        username,
        avatar_url,
        headline,
        job_title,
        company,
        verified
      )
    `)
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching article:', error);
    return null;
  }

  // Fetch related articles
  const { data: relatedArticles } = await supabase
    .from('articles')
    .select(`
      id,
      title,
      slug,
      image_url,
      category,
      read_time,
      published_at,
      author:users!articles_author_id_fkey (
        name,
        avatar_url,
        verified,
        job_title,
        company
      )
    `)
    .eq('category', article.category)
    .neq('id', article.id)
    .limit(3);

  return {
    article,
    relatedArticles: relatedArticles || []
  };
}

// Add this new helper function for sharing URLs
function getShareUrls(article) {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const text = `Check out this article: ${article.title}`;
  
  return {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  };
}

export default async function ArticleDetail({ params }) {
  const data = await getArticleData(params.slug);

  if (!data) {
    notFound();
  }

  const { article, relatedArticles } = data;

  const shareUrls = getShareUrls(article);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium text-blue-100 mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
              {article.category}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Image
                    src={article.author?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(article.author?.name || 'Anonymous')}&background=random`}
                    alt={article.author?.name || 'Anonymous'}
                    width={56}
                    height={56}
                    className="rounded-full border-2 border-white/20"
                  />
                  {article.author?.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-1 border-2 border-white">
                      <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="text-left">
                  <p className="text-base font-semibold text-white">
                    {article.author?.name || 'Anonymous'}
                  </p>
                  <p className="text-sm text-blue-200">
                    {article.author?.job_title}
                    {article.author?.company && ` at ${article.author.company}`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-blue-200">
                <time dateTime={article.published_at}>
                  {formatDate(article.published_at)}
                </time>
                <span>{article.read_time}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          <article className="lg:flex-grow lg:max-w-3xl">
            {/* Featured Image */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
              <div className="relative h-[500px]">
                <Image
                  src={article.image_url || 'https://via.placeholder.com/1200x800'}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 divide-x divide-gray-100 py-4 bg-gray-50">
                <div className="text-center">
                  <div className="text-sm text-gray-500">Views</div>
                  <div className="font-semibold text-gray-900">{article.views_count || 0}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">Read Time</div>
                  <div className="font-semibold text-gray-900">{article.read_time}</div>
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
                <div className="flex space-x-4">
                  <a
                    href={shareUrls.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-opacity-90 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    Twitter
                  </a>
                  <a
                    href={shareUrls.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-4 py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-opacity-90 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                  <a
                    href={shareUrls.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-opacity-90 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </a>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
              <div className="px-8 py-10 prose prose-lg prose-blue max-w-none">
                {article.content}
              </div>
            </div>

            {/* Author Bio */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
              <div className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="relative flex-shrink-0">
                    <Image
                      src={article.author?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(article.author?.name || 'Anonymous')}&background=random`}
                      alt={article.author?.name || 'Anonymous'}
                      width={80}
                      height={80}
                      className="rounded-xl"
                    />
                    {article.author?.verified && (
                      <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full p-1.5 border-2 border-white">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      About {article.author?.name || 'the Author'}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {article.author?.headline || 'Professional writer and industry expert'}
                    </p>
                    <div className="flex items-center space-x-4">
                      {article.author?.job_title && (
                        <div className="flex items-center text-gray-500">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {article.author.job_title}
                        </div>
                      )}
                      {article.author?.company && (
                        <div className="flex items-center text-gray-500">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {article.author.company}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags Section (if you add tags later) */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {article.category}
                  </span>
                  {/* Add more tags here when you implement them */}
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <div className="sticky top-8 space-y-8">
              {/* Table of Contents (if needed) */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Navigation
                </h3>
                <nav className="space-y-2">
                  <a href="#introduction" className="block text-gray-600 hover:text-blue-600 transition-colors">
                    Introduction
                  </a>
                  {/* Add more navigation items based on your content structure */}
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
                      key={related.id}
                      href={`/career-advice/${related.slug}`}
                      className="group block"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={related.image_url || 'https://via.placeholder.com/400x400'}
                            alt={related.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {related.title}
                          </h4>
                          <div className="flex items-center mt-2">
                            <Image
                              src={related.author?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(related.author?.name || 'Anonymous')}&background=random`}
                              alt={related.author?.name || 'Anonymous'}
                              width={20}
                              height={20}
                              className="rounded-full"
                            />
                            <p className="text-sm text-gray-500 ml-2">
                              {related.author?.name || 'Anonymous'} · {related.read_time}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-4">
                  Get Career Updates
                </h3>
                <p className="text-blue-100 mb-4">
                  Stay ahead with the latest career insights and opportunities.
                </p>
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 placeholder-blue-100 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
