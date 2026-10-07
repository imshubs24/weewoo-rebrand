import playStore from "../../assets/home-assets/playstore.webp";
import appStore from "../../assets/home-assets/appstore.svg";

const DownloadApp = () => {
    return (
        <section className="w-full bg-slate-50 py-20 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
                    <div className="max-w-2xl text-center lg:text-left">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">Take WeeWoo with you</p>

                        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">Order your favorite food anytime.</h2>

                        <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600">
                            Get the WeeWoo experience on your phone and enjoy a simple way to browse meals, manage your cart, and keep track of your orders wherever you go.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center lg:justify-start items-center gap-4">
                            <a href="#" className="transition-transform hover:scale-105">
                                <img src={playStore} loading="lazy" alt="Get it on Google Play" className="h-12 w-auto" />
                            </a>

                            <a href="#" className="transition-transform hover:scale-105">
                                <img src={appStore} loading="lazy" alt="Download on the App Store" className="h-12 w-auto" />
                            </a>
                        </div>
                    </div>

                    <div className="w-full max-w-md lg:max-w-lg">
                        <div className="rounded-2xl bg-white border border-slate-200 p-8 sm:p-10 text-center shadow-sm">
                            <i className="fa-solid fa-mobile-screen-button text-5xl text-red-500"></i>
                            <h3 className="mt-5 text-xl font-semibold text-slate-900">WeeWoo on your phone</h3>
                            <p className="mt-2 text-sm sm:text-base text-slate-500">Your favorite meals, just a tap away.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DownloadApp;