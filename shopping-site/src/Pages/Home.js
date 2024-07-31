import React from 'react';

const Home = () => {
  return (
    <div>
      <h1 className="mt-20 text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-black md:text-5xl lg:text-6xl">
        Treat Your Pet Right <br />
        With Amo Petric
      </h1>

      <section className="bg-white">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="lg:col-span-7 flex items-center justify-left h-auto lg:h-[50vh] w-full ">
            <div className="text-left">
              <p className="mb-4 text-lg font-medium text-black">
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
              </p>
              <div className="flex flex-col lg:flex-row mt-8 lg:mt-20">
                <div className="text-center mb-4 lg:mb-0 lg:mr-12">
                  <div className="text-3xl font-bold text-black">2.5k</div>
                  <div className="text-sm font-medium text-gray-700">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-black">5k</div>
                  <div className="text-sm font-medium text-gray-700">Average Clients</div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:mt-0 lg:col-span-5 lg:flex" style={{ 
            background: 'linear-gradient(to right, #D2D631, #F3F3F3)', 
            height: '50vh', 
            width: '100%' 
          }}>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
