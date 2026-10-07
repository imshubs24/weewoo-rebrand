import { Link } from "react-router-dom";
import aboutImage from "../../assets/home-assets/about-us-delivery.webp";


const AboutUs = () => {
    return (
        <section className="w-full bg-white py-20 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="overflow-hidden rounded-2xl">
                        <img src={aboutImage} loading="lazy" alt="About WeeWoo" className="w-full h-[320px] sm:h-[350px] object-contain" />
                    </div>

                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">About WeeWoo</p>

                        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">Good food, made simple.</h2>

                        <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600">
                            At WeeWoo, we make it easy to discover your favorite food and get it delivered straight to your doorstep. From quick bites to satisfying meals, we bring a variety of delicious options together in one place.
                        </p>

                        <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
                            Browse the menu, add your favorites to the cart, and place your order with just a few clicks.
                        </p>

                        <Link to="/explore" className="inline-flex items-center mt-8 px-6 py-3 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors">
                            Explore Our Menu <i className="fa-solid fa-arrow-right ml-2 text-sm"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;