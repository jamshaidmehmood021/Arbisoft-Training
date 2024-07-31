import React from 'react'

const ProductSection = () => {
    return (
        <div className="m-1 mt-16 rounded-lg py-12" style={{ backgroundColor: '#F6E2E3' }}>
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-1/2 p-4">
                        <h2 className="text-3xl font-bold mb-4">Easy package is based on the product</h2>
                        <p className="text-gray-700 mb-8">
                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                        </p>
                        <div className="rounded-lg mb-8 h-64" style={{ backgroundColor: "#CDC5E9" }}></div>
                    </div>

                    <div className="w-full lg:w-1/2 p-4 flex flex-col justify-between">
                        <div className="flex flex-col">
                            <div className="rounded-lg mb-8 h-64" style={{ backgroundColor: "#CDC5E9" }}></div>
                        </div>
                        <div className="mb-16 text-gray-700 flex flex-col justify-between items-center">
                            <p>
                                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                            </p>
                            <button className="bg-black text-white py-2 px-6 mt-4 hover:bg-gray-800 w-[30vh] h-[6vh] font-bold">Add To Cart = $27</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatsSection = () => {
    return (
        <div className="py-12 bg-white w-full">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Our Stats</h2>
                <div className="flex justify-around items-center m-1 p-6 rounded-lg w-full" style={{ backgroundColor: '#202020' }}>
                    <div className="text-center">
                        <h3 className="md:text-sm lg:text-4xl  font-bold" style={{ color: '#FFAFAF' }}>80%</h3>
                        <p className="text-white">Request & Recommended</p>
                    </div>
                    <div className="text-center">
                        <h3 className="md:text-sm lg:text-4xl font-bold" style={{ color: '#FFAFAF' }}>95%</h3>
                        <p className="text-white">Positive Rating</p>
                    </div>
                    <div className="text-center">
                        <h3 className="md:text-sm lg:text-4xl font-bold " style={{ color: '#FFAFAF' }}>25K</h3>
                        <p className="text-white">Instagram Followers</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Services = () => {
    return (
        <div>
            <ProductSection />
            <StatsSection />
        </div>
    )
}

export default Services
