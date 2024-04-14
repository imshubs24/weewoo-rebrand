import { useEffect } from 'react';
import blogSample from '../assets/blog-sample.jpg'

const Blog = () => {

    const blogs = [
        { title: 'Quinoa: Ingredient of the Week', desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga vitae repudiandae saepe placeat nulla, consectetur blanditiis. Mollitia blanditiis expedita beatae.', date: 'March 9, 2024', image: blogSample },
        { title: 'Quinoa: Ingredient of the Week', desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga vitae repudiandae saepe placeat nulla, consectetur blanditiis. Mollitia blanditiis expedita beatae.', date: 'March 11, 2024', image: blogSample },
        { title: 'Quinoa: Ingredient of the Week', desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga vitae repudiandae saepe placeat nulla, consectetur blanditiis. Mollitia blanditiis expedita beatae.', date: 'March 16, 2024', image: blogSample },
        { title: 'Deliciously Dairy-Free: Vegan Dessert Recipes to Satisfy Your Sweet Tooth', desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga vitae repudiandae saepe placeat nulla, consectetur blanditiis. Mollitia blanditiis expedita beatae.', date: 'March 24, 2024', image: blogSample },
        { title: 'Mastering the Art of Homemade Pasta: Tips and Tricks', desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga vitae repudiandae saepe placeat nulla, consectetur blanditiis. Mollitia blanditiis expedita beatae.', date: 'March 28, 2024', image: blogSample },
        { title: 'Mastering the Art of Homemade Pasta: Tips and Tricks', desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga vitae repudiandae saepe placeat nulla, consectetur blanditiis. Mollitia blanditiis expedita beatae.', date: 'March 30, 2024', image: blogSample },
    ]

    // scroll windows to top whenver switched to new page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <>
            <div className='min-h-dvh h-auto w-full relative flex flex-col'>
                <div className="w-full h-[50vh] bg-[url('./assets/blog-cover.jpg')] absolute bg-no-repeat bg-cover bg-center -z-10">
                    <div className='absolute h-full w-full top-0 bg-black opacity-50'></div>
                </div>
                <div className="text-white text-7xl h-[50vh] flex justify-center items-center">
                    <h1 className="font-Mogra">BLOG</h1>
                </div>
                <div className="w-[60%] h-auto grid gap-y-10 gap-x-5 grid-cols-3 self-center py-10">
                    {
                        blogs.map((blog, index) =>
                            <div key={index} className="flex flex-col min-h-[35rem] items-center py-2 gap-y-4 cursor-pointer group shadow-xl border border-gray-200">
                                <img src={blog.image} alt="blog.jpg" className='h-72 w-96 group-hover:scale-95 ease-linear duration-150' />
                                <div className='flex flex-col items-center gap-y-2'>
                                    <p className=' text-gray-500'>{blog.date}</p>
                                    <h1 className='px-10 text-lg font-semibold'>
                                        {blog.title.length > 45 ? blog.title.slice(0, 45) + ' ...' : blog.title}
                                    </h1>
                                    <p className='px-10 text-gray-500'>{blog.desc.length > 125 ? blog.desc.slice(0, 125) + '...' : blog.desc}</p>
                                    <p className='px-10 my-2 self-start text-slate-700 font-medium cursor-pointer hover:text-red-500 duration-100 ease-linear'>Read More...</p>
                                </div>
                            </div>
                        )
                    }


                </div>
            </div>
        </>
    )
}

export default Blog
