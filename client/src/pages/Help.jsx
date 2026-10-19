import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const Help = () => {
    const legalQuestions = {
        "Partner Onboarding": [
            { title: "I want to partner with WeeWoo", description: "Description for Terms of Use" },
            { title: "What is one time Onboarding fees? Do I pay it while registration?", description: "Description for Privacy Policy" },
            { title: "How much commission will I be charged by WeeWoo?", description: "Description for Cancellations and Refunds" },
            { title: "Who should I contact if I need help & support in getting Onboarded?", description: "Description for WeeWoo ON-TIME / Assured" },
        ],
        "Legal": [
            { title: "Terms of Use", description: "Description for Terms of Use" },
            { title: "Privacy Policy", description: "Description for Privacy Policy" },
            { title: "Cancellations and Refunds", description: "Description for Cancellations and Refunds" },
            { title: "Terms of Use for WeeWoo ON-TIME / Assured", description: "Description for WeeWoo ON-TIME / Assured" },
        ],
        "FAQs": [
            { title: "What is WeeWoo Customer Care Number?", description: "Description for FAQ 1" },
            { title: "I want to provide feedback", description: "Description for FAQ 2" },
            { title: "I want to cancel my order", description: "Description for FAQ 3" },
            { title: "Can I edit my order?", description: "Description for FAQ 4" },
        ],
    };

    const [selectedItem, setSelectedItem] = useState("Partner Onboarding");
    const [selectedDescriptionIndex, setSelectedDescriptionIndex] = useState([]);

    const handleClick = (itemName) => {
        setSelectedItem(itemName);
        setSelectedDescriptionIndex([]);
    };

    const toggleDescription = (index) => {
        setSelectedDescriptionIndex((prevIndices) => prevIndices.includes(index) ? prevIndices.filter((item) => item !== index) : [...prevIndices, index]);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="w-full min-h-screen bg-slate-50">
            <section className="bg-red-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-100">WeeWoo Support</p>
                    <h1 className="mt-2 text-3xl sm:text-4xl font-semibold text-white">Help & Support</h1>
                    <p className="mt-3 text-red-100">Let's take a step ahead and help you better.</p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
                <div className="grid grid-cols-1 lg:grid-cols-4 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <aside className="lg:col-span-1 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200 p-5 sm:p-6">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">Categories</p>

                        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto">
                            {Object.keys(legalQuestions).map((category) => (
                                <button key={category} type="button" onClick={() => handleClick(category)} className={`shrink-0 text-left px-4 py-3 rounded-lg text-sm font-medium transition ${selectedItem === category ? "bg-red-500 text-white" : "text-slate-600 hover:bg-white hover:text-slate-900"}`}>
                                    {category}
                                </button>
                            ))}
                        </div>
                    </aside>

                    <div className="lg:col-span-3 p-6 sm:p-8 lg:p-10">
                        <h2 className="text-2xl font-semibold text-slate-900">{selectedItem}</h2>
                        <p className="mt-2 text-sm text-slate-500">Find answers to some of the most common questions.</p>

                        <div className="mt-8">
                            {legalQuestions[selectedItem].map((q, index) => {
                                const isOpen = selectedDescriptionIndex.includes(index);

                                return (
                                    <div key={index} className="border-b border-slate-200 last:border-b-0">
                                        <button type="button" onClick={() => toggleDescription(index)} className="w-full flex items-center justify-between gap-4 py-5 text-left">
                                            <span className={`text-sm sm:text-base font-medium transition-colors ${isOpen ? "text-red-500" : "text-slate-700 hover:text-red-500"}`}>{q.title}</span>
                                            {isOpen ? (
                                                <ChevronUp size={12} className="text-slate-400 shrink-0" />
                                            ) : (
                                                <ChevronDown size={12} className="text-slate-400 shrink-0" />
                                            )}
                                        </button>

                                        {isOpen && (
                                            <p className="pb-5 pr-8 text-sm leading-relaxed text-slate-500">{q.description}</p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Help;