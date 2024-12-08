import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

async function getArticleData(slug) {
  const supabase = createServerComponentClient({ cookies });

  // Fetch article with author data and tags
  const { data: article, error } = await supabase
    .from('articles')
    .select(`
      *,
      author:author_id (
        id,
        email,
        full_name,
        avatar_url,
        role
      ),
      article_tag_relations (
        article_tags (
          id,
          name
        )
      ),
      article_likes (
        count
      ),
      article_bookmarks (
        count
      ),
      article_comments (
        id,
        content,
        created_at,
        user:user_id (
          id,
          full_name,
          avatar_url
        )
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
      author:author_id (
        full_name,
        avatar_url
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

export default async function ArticleDetail({ params }) {
  const data = await getArticleData(params.slug);

  if (!data) {
    notFound();
  }

  const { article, relatedArticles } = data;
  const tags = article.article_tag_relations.map(relation => relation.article_tags);

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

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
                    src={article.author.avatar_url || '/default-avatar.png'}
                    alt={article.author.full_name}
                    width={56}
                    height={56}
                    className="rounded-full border-2 border-white/20"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <div className="text-left">
                  <p className="text-base font-semibold text-white">
                    {article.author.full_name}
                  </p>
                  <p className="text-sm text-blue-200">{article.author.role}</p>
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

        {/* Enhanced Decorative Elements */}
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
                  src={article.image_url}
                  alt={article.title}
                  layout="fill"
                  objectFit="cover"
                  priority
                  className="transition-transform duration-700 hover:scale-105"
                />
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-4 divide-x divide-gray-100 py-4 bg-gray-50">
                <div className="text-center">
                  <div className="text-sm text-gray-500">Views</div>
                  <div className="font-semibold text-gray-900">{article.views_count}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">Likes</div>
                  <div className="font-semibold text-gray-900">{article.article_likes.length}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">Comments</div>
                  <div className="font-semibold text-gray-900">{article.article_comments.length}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">Bookmarks</div>
                  <div className="font-semibold text-gray-900">{article.article_bookmarks.length}</div>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
              <div className="px-8 py-10 prose prose-lg prose-blue max-w-none">
                {article.content}
              </div>

              {/* Tags and Actions */}
              <div className="px-8 py-6 border-t border-gray-100 bg-gray-50">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer group"
                      >
                        #{tag.name}
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

            {/* Comments Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Comments ({article.article_comments.length})
              </h3>
              <div className="space-y-6">
                {article.article_comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-4">
                    <Image
                      src={comment.user.avatar_url || '/default-avatar.png'}
                      alt={comment.user.full_name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">
                          {comment.user.full_name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDate(comment.created_at)}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <div className="sticky top-8 space-y-8">
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
                            src={related.image_url}
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
                            {related.author.full_name} · {related.read_time}
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
