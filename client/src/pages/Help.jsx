import { useEffect, useState } from 'react';

const Help = () => {

    const legalQuestions = {
        'Partner Onboarding': [
            { title: 'I want to partner with WeeWoo', description: 'Description for Terms of Use' },
            { title: 'What is one time Onboarding fees? Do I pay it while registration?', description: 'Description for Privacy Policy' },
            { title: 'How much commission will I be charged by WeeWoo?', description: 'Description for Cancellations and Refunds' },
            { title: 'Who should I contact if I need help & support in getting Onboarded?', description: 'Description for WeeWoo ON-TIME / Assured' },
        ],
        'Legal': [
            { title: 'Terms of Use', description: 'Description for Terms of Use' },
            { title: 'Privacy Policy', description: 'Description for Privacy Policy' },
            { title: 'Cancellations and Refunds', description: 'Description for Cancellations and Refunds' },
            { title: 'Terms of Use for WeeWoo ON-TIME / Assured', description: 'Description for WeeWoo ON-TIME / Assured' },
        ],
        'FAQs': [
            { title: 'What is WeeWoo Customer Care Number?', description: 'Description for FAQ 1' },
            { title: 'I want to provide feedback', description: 'Description for FAQ 2' },
            { title: 'I want to cancel my order', description: 'Description for FAQ 3' },
            { title: 'Can I edit my order?', description: 'Description for FAQ 4' },
        ],
    };

    const [selectedItem, setSelectedItem] = useState('Partner Onboarding');
    const [selectedDescriptionIndex, setSelectedDescriptionIndex] = useState([]);

    const handleClick = (itemName) => {
        setSelectedItem(itemName);
        setSelectedDescriptionIndex([]);
    };

    const toggleDescription = (index) => {
        setSelectedDescriptionIndex(prevIndices => {
            // If the clicked index is already in the array, remove it
            if (prevIndices.includes(index)) {
                return prevIndices.filter(item => item !== index);
            } else { // Otherwise, add it to the array
                return [...prevIndices, index];
            }
        });
    };

    // scroll windows to top whenver switched to new page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <>
            <div className='h-dvh w-full flex justify-center bg-red-500'>
                <div className='w-[60%] h-full flex flex-col'>
                    <div className='py-8 px-16 text-white'>
                        <h1 className='text-3xl font-medium'>Help & Support</h1>
                        <p className='text-sm'>Let's take a step ahead and help you better.</p>
                    </div>
                    <div className='w-full h-full bg-white shadow-help-accordion flex justify-center p-10'>
                        <div className='w-1/4 border-black font-medium text-gray-600'>
                            <ul className='py-10 px-12 flex flex-col gap-y-10'>
                                <li className='hover:text-black cursor-pointer' onClick={() => handleClick('Partner Onboarding')}>Partner Onboarding</li>
                                <li className='hover:text-black cursor-pointer' onClick={() => handleClick('Legal')}>Legal</li>
                                <li className='hover:text-black cursor-pointer' onClick={() => handleClick('FAQs')}>FAQs</li>
                            </ul>
                        </div>
                        <div className='w-3/4 border-green-500 py-8'>
                            <h1 className='text-xl font-medium'>{selectedItem}</h1>
                            <div className=''>
                                {
                                    legalQuestions[selectedItem].map((q, index) => (
                                        <div key={index} className='relative'>
                                            <p className='border-b border-gray-400 hover:text-red-500 py-2 my-5 cursor-pointer select-none' onClick={() => toggleDescription(index)}>{q.title}</p>
                                            <p className={`text-sm ${selectedDescriptionIndex.includes(index) ? '' : 'hidden'}`}>{q.description}</p>
                                            <span className='absolute right-3 top-3'><i className={`fa-solid fa-angle-${selectedDescriptionIndex.includes(index) ? 'up' : 'down'}`}></i></span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Help;
