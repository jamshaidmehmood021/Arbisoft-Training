import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Slider from 'react-slick';

const fetchProfiles = async () => {
    try {
        const response = await axios.get('/api/profiles');
        console.log("Here ", response.data.profiles); 
        return response.data.profiles;
    } catch (error) {
        console.error("Error in fetching profiles:", error);
        return [];
    }
};

const TestimonialsSection = () => {
    const [profiles, setProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);

    useEffect(() => {
        const loadProfiles = async () => {
            const data = await fetchProfiles();
            setProfiles(data);
        };
        loadProfiles();
    }, []);

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style,  background: "black" }}
            onClick={onClick}
          />
        );
      }
      
      function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, background: "black" }}
            onClick={onClick}
          />
        );
      }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    const handleProfileClick = (profile) => {
        setSelectedProfile(profile);
    };

    return (
        <div className="lg:ml-36 lg:w-[80%] py-12 bg-white">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Testimonials</h2>
            <div className="flex flex-col lg:flex-row justify-around items-center space-y-8 lg:space-y-0 lg:space-x-4 px-4 lg:px-12">
                <div className="p-10 relative flex-none rounded-lg shadow-lg w-full lg:w-[60%] ring ring-gray-300">
                    <Slider {...settings}>
                        {profiles.map((profile) => (
                            <div
                                key={profile.id}
                                className="p-10 flex flex-col items-center  bg-gray-50 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                                onClick={() => handleProfileClick(profile)}
                            >
                                <div className="w-24 h-24 bg-blue-200 rounded-full mb-4 flex items-center justify-center">
                                    <span className="text-3xl text-blue-600">{profile.name[0]}</span>
                                </div>
                                <div className="text-center">
                                    <p className="font-bold text-xl text-gray-800">{profile.name}</p>
                                    <p className="text-gray-500">{profile.role}</p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className="bg-white flex flex-col items-center lg:items-start w-full lg:w-[35%] p-6 ">
                    {selectedProfile ? (
                        <>
                            <div className="flex mb-4 items-center">
                                <div className="w-24 h-24 bg-blue-200 rounded-full mr-4 flex items-center justify-center">
                                    <span className="text-4xl text-blue-600">{selectedProfile.name[0]}</span>
                                </div>
                                <div>
                                    <p className="font-bold text-xl text-gray-800">{selectedProfile.name}</p>
                                    <p className="text-gray-500">{selectedProfile.role}</p>
                                </div>
                            </div>
                            <p className="text-lg font-bold text-gray-700 text-center lg:text-left max-w-2xl">
                                {selectedProfile.feedback}
                            </p>
                        </>
                    ) : (
                        <p className="text-lg text-gray-600">Select a profile to see details.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const SubscriptionSection = () => {
    return (
        <div className="lg:ml-36 lg:w-[80%] my-8 py-10 rounded-lg bg-[#F6E2E3] px-4">
            <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center space-y-2 lg:space-y-0 lg:space-x-2.5">
                <div className="flex flex-col items-center lg:items-end lg:w-[50%]">
                    <h3 className="text-3xl font-bold mb-2.5 text-center lg:text-left">Subscribe For Daily<br/>Updates & Amazing Offers</h3>
                    <div className="flex flex-col sm:flex-row justify-center lg:justify-end space-y-2 sm:space-y-0 sm:space-x-2.5">
                        <input 
                            type="email" 
                            placeholder="Enter Your Email" 
                            className="p-2 rounded-lg w-full lg:w-auto bg-white" 
                        />
                        <button className="p-2 text-white rounded-lg" style={{backgroundColor:'#FFAFAF'}}>Subscribe</button>
                    </div>
                </div>
                <div className="w-full lg:w-[45%] h-52 rounded-lg bg-[#FFAFAF]"></div>
            </div>
        </div>
    );
};


const PartnersSection = () => {
    return (
        <div className="mb-20 py-12 bg-white px-4">
            <div className="container mx-auto">
                <h2 className="text-4xl font-bold text-center mb-8">Our Partners</h2>
                <div className="flex flex-wrap justify-around items-center text-xl font-bold">
                    <span className='font-bold text-3xl'>Stripe</span>
                    <span className=' font-normal text-3xl'>Google</span>
                    <span className='font-bold text-3xl'>Samsung</span>
                    <span className='font-normal text-3xl'>Meta</span>
                    <span className='font-bold text-3xl'>IBM</span>
                </div>
            </div>
        </div>
    );
};

const FAQSection = () => {
    const questions = [
        {
            question: 'Question number one?',
            answer: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.',
        },
        {
            question: 'Question number two?',
            answer: '',
        },
        {
            question: 'Question number three?',
            answer: '',
        },
    ];

    return (
        <div className="py-12 bg-white rounded-lg">
            <h2 className="text-3xl font-bold text-center mb-8">FAQ'S</h2>
            <div className="w-full lg:w-[80%] mx-auto space-y-4">
                {questions.map((question, index) => (
                    <div key={index} className="p-4 rounded-md shadow-md ring ring-gray-300">
                        <h3 className="text-lg font-semibold">
                            {index + 1}. {question.question}
                        </h3>
                        {question.answer && (
                            <p className="text-gray-600 mt-2">
                                {question.answer}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const Product = () => {
    return (
        <div>
            <TestimonialsSection />
            <SubscriptionSection />
            <PartnersSection />
            <FAQSection />
        </div>
    );
};

export default Product;
