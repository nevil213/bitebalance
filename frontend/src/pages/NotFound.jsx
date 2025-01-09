import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
            <Link to="/" className="px-4 py-2 bg-[#181F31] text-white rounded hover:bg-[#4c4d52]">
                Go to Home
            </Link>
        </div>
    );
}

export default NotFound;