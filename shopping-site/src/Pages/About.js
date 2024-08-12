import React from 'react';
import { FaCogs, FaBus, FaHeadphones } from 'react-icons/fa';

const About = () => {
  return (
    <div>
      <h1 className="mt-20 text-center mb-8 text-4xl font-extrabold leading-tight text-black md:text-5xl lg:text-6xl">
        Why Choose Us?
      </h1>
      <div className="mx-4 lg:mx-8 flex flex-col lg:flex-row justify-around items-center space-y-8 lg:space-y-0 lg:space-x-8 mb-16">
        <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-md w-full lg:w-1/4 bg-[#FFDEDE] hover:bg-[#FF8C8C] hover:text-white transition-colors">
          <FaCogs className="text-4xl text-gray-600 mb-4" />
          <h2 className="text-xl font-bold mb-2">100% Guarantee</h2>
          <p className="text-gray-700 mb-4 hover:text-white">
            There are many variations of passages of Lorem Ipsum available.
          </p>
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-300">
            View Details
          </button>
        </div>

        <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-md w-full lg:w-1/4 bg-[#FFDEDE] hover:bg-[#FF8C8C] hover:text-white transition-colors">
          <FaBus className="text-4xl text-gray-600 mb-4" />
          <h2 className="text-xl font-bold mb-2">On Time Delivery</h2>
          <p className="text-gray-700 mb-4 hover:text-white">
            There are many variations of passages of Lorem Ipsum available.
          </p>
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-300">
            View Details
          </button>
        </div>

        <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-md w-full lg:w-1/4 bg-[#FFDEDE] hover:bg-[#FF8C8C] hover:text-white transition-colors ">
          <FaHeadphones className="text-4xl text-gray-600 mb-4" />
          <h2 className="text-xl font-bold mb-2">24×7 Support</h2>
          <p className="text-gray-700 mb-4 hover:text-white">
            There are many variations of passages of Lorem Ipsum available.
          </p>
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-300">
            View Details
          </button>
        </div>
      </div>

      <section className="mb-10 mx-4 lg:mx-8 py-10 px-4 lg:px-10 rounded-lg" style={{ backgroundColor: '#84DFFF' }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center mb-4">
            <h1 className="text-2xl font-bold mb-4 lg:mb-0 lg:mr-4">About Us</h1>
            <p className="text-gray-800 flex-1">
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:space-x-4 mb-4">
            <div className="flex-none h-48 p-4 m-2 rounded-md w-full lg:w-1/2" style={{ backgroundColor: '#FFDEDE' }}></div>
            <div className="flex-none h-48 p-4 m-2 rounded-md w-full lg:w-1/2" style={{ backgroundColor: '#CDC5E9' }}></div>
          </div>
          <div className="flex flex-wrap justify-around items-center mb-4 bg-black text-white p-4 rounded-lg">
            <span className="text-xl font-bold">Stripe</span>
            <span className="text-xl font-bold">Google</span>
            <span className="text-xl font-bold">Samsung</span>
            <span className="text-xl font-bold">Meta</span>
            <span className="text-xl font-bold">IBM</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <div className="flex flex-col lg:flex-row lg:space-x-4">
            <div className="flex-1 p-4 m-2 rounded-md">
              <p>
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
              </p>
            </div>
            <div className="flex-1 p-4 m-2 rounded-md">
              <p>
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
              </p>
            </div>
            <div className="flex-1 p-4 m-2 rounded-md">
              <p>
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
