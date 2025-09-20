import React from "react";

const posts = [
  {
    id: 1,
    title: "Top Trend Products of 2025",
    excerpt:
      "A list of the most in-demand products this year and their advantages.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0m67FB7WIOiEX_ft8VJ1qC3bCI7L1Th69hQ&s",
    date: "May 12, 2025",
    author: "Admin",
    readTime: "3 min read",
  },
  {
    id: 2,
    title: "Ways to Save Money When Shopping Online",
    excerpt:
      "Learn how to shop at lower prices through discounts, coupons, and special promotions.",
    image: "https://cdn2.ettoday.net/images/6566/e6566951.jpg",
    date: "May 8, 2025",
    author: "Admin",
    readTime: "5 min read",
  },
  {
    id: 3,
    title: "Fast-Delivery Products",
    excerpt:
      "Discover the most ordered items that can be delivered within a single day.",
    image:
      "https://preview.redd.it/i-really-cannot-find-apps-that-utilise-the-dynamic-island-v0-6frm5bstfdbe1.jpeg?auto=webp&s=2b99aa30d45a0ea7f2438de9f2e7f90909be3aa3",
    date: "May 2, 2025",
    author: "Admin",
    readTime: "4 min read",
  },
];

/* Hero Section */
function Hero() {
  return (
    <section id="home" className="py-10">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row gap-6 items-center bg-gradient-to-r from-pink-200/20 to-blue-200/20 rounded-xl p-8 shadow-md">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Save Time <br />
            No need to go to the market. Find what you need in minutes and place
            your order easily.
          </h1>
          <p className="text-gray-600 mb-4">
            Explore nearby courses, read reviews, and leave your application.
          </p>
          <a
            href="#courses"
            className="inline-block bg-gray-900 text-white px-5 py-2 rounded-md font-semibold hover:bg-gray-800"
          >
            View Courses
          </a>
        </div>
        <div className="w-full md:w-[360px] h-[180px] rounded-lg bg-gradient-to-br from-gray-200 to-black flex-shrink-0" />
      </div>
    </section>
  );
}

/* Blog Card */
function BlogCard({ post }) {
  return (
    <article className="bg-[#121010] rounded-xl overflow-hidden shadow-md flex flex-col">
      <div
        className="h-40 bg-cover bg-center"
        style={{ backgroundImage: `url(${post.image})` }}
      />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-white text-lg font-semibold mb-2">{post.title}</h3>
        <p className="text-gray-400 flex-1">{post.excerpt}</p>
        <div className="text-gray-300 text-sm mt-3">
          <span>{post.author}</span>
          <span> • </span>
          <span>{post.date}</span>
          <span> • </span>
          <span>{post.readTime}</span>
        </div>
        <a
          href="#"
          className="mt-3 text-gray-900 font-semibold hover:underline"
        >
          Read More →
        </a>
      </div>
    </article>
  );
}

/* Blog Section */
function BlogSection() {
  return (
    <section id="blog" className="py-14">
      <div className="max-w-[1100px] mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Blog</h2>
        <p className="text-gray-500 mb-6">
          Articles, news, and useful shopping tips
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <BlogCard key={p.id} post={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* App Component */
export default function App() {
  return (
    <div className="bg-gray-50 text-gray-900 font-sans">
      <main>
        <Hero />
        <BlogSection />
      </main>
    </div>
  );
}