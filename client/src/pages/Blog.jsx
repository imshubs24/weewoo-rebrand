import { useEffect } from "react";
import blogSample from "../assets/blog-sample.jpg";

const Blog = () => {
    const blogs = [
        { title: "Quinoa: Ingredient of the Week", desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga vitae repudiandae saepe placeat nulla, consectetur blanditiis. Mollitia blanditiis expedita beatae.", date: "March 9, 2024", image: blogSample },
        { title: "Quinoa: Ingredient of the Week", desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga vitae repudiandae saepe placeat nulla, consectetur blanditiis. Mollitia blanditiis expedita beatae.", date: "March 11, 2024", image: blogSample },
        { title: "Quinoa: Ingredient of the Week", desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga vitae repudiandae saepe placeat nulla, consectetur blanditiis. Mollitia blanditiis expedita beatae.", date: "March 16, 2024", image: blogSample },
        { title: "Deliciously Dairy-Free: Vegan Dessert Recipes to Satisfy Your Sweet Tooth", desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga vitae repudiandae saepe placeat nulla, consectetur blanditiis. Mollitia blanditiis expedita beatae.", date: "March 24, 2024", image: blogSample },
        { title: "Mastering the Art of Homemade Pasta: Tips and Tricks", desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga vitae repudiandae saepe placeat nulla, consectetur blanditiis. Mollitia blanditiis expedita beatae.", date: "March 28, 2024", image: blogSample },
        { title: "Mastering the Art of Homemade Pasta: Tips and Tricks", desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga vitae repudiandae saepe placeat nulla, consectetur blanditiis. Mollitia blanditiis expedita beatae.", date: "March 30, 2024", image: blogSample },
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="w-full bg-slate-50 min-h-screen">
            <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-[url('./assets/blog-cover.jpg')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/55"></div>
                <h1 className="relative z-10 text-5xl sm:text-6xl lg:text-7xl text-white font-Mogra">BLOG</h1>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="mb-10">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">From the WeeWoo kitchen</p>
                    <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">Food, recipes & inspiration.</h2>
                    <p className="mt-3 max-w-2xl text-slate-600">Discover recipes, ingredients, cooking tips, and stories for your next meal.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {blogs.map((blog, index) => (
                        <article key={index} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                            <div className="overflow-hidden bg-slate-100">
                                <img src={blog.image} alt={blog.title} className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300" />
                            </div>

                            <div className="p-6">
                                <p className="text-sm text-red-500 font-medium">{blog.date}</p>

                                <h3 className="mt-3 text-xl font-semibold leading-snug text-slate-900">{blog.title}</h3>

                                <p className="mt-3 text-sm leading-relaxed text-slate-500">{blog.desc.length > 125 ? `${blog.desc.slice(0, 125)}...` : blog.desc}</p>

                                <button type="button" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-red-500 transition-colors">
                                    Read More <i className="fa-solid fa-arrow-right text-xs"></i>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Blog;