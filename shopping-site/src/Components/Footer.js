import React from 'react';

const Footer = () => {
  return (
    <footer className="text-white pr-30" style={{backgroundColor: "#111111"}}>
      <div className="mx-auto w-full max-w-screen-xl">
        <h1 className="text-white p-4 font-extrabold text-2xl">Get In Touch</h1>
        <button className='text-center ml-4 font-normal p-1 w-32 rounded-lg mb-4 text-white' style={{ backgroundColor: '#FFAFAF' }}>Contact Us</button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 py-6 lg:py-8">
          <div>
            <ul className=" text-white font-medium">
              <li className="mb-4">
                <a href="/" className=" hover:underline">Features</a>
              </li>
              <li className="mb-4">
                <a href="/" className="hover:underline">Pricing</a>
              </li>
              <li className="mb-4">
                <a href="/" className="hover:underline">Login</a>
              </li>
              <li className="mb-4">
                <a href="/" className="hover:underline">Sign Up</a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="text-white font-medium">
              <li className="mb-4">
                <a href="/" className="hover:underline">Terms of use</a>
              </li>
              <li className="mb-4">
                <a href="/" className="hover:underline">Privacy Policy</a>
              </li>
              <li className="mb-4">
                <a href="/" className="hover:underline">Legal Notice</a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="text-white font-medium">
              <li className="mb-4">
                <a href="/" className="hover:underline">Feedback</a>
              </li>
              <li className="mb-4">
                <a href="/" className="hover:underline">Service</a>
              </li>
              <li className="mb-4">
                <a href="/" className="hover:underline">Products</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
