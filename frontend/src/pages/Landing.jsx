import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="max-w-2xl bg-white shadow-lg rounded-2xl p-10 text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-700">Welcome to EmployeeChain</h1>
        <p className="text-gray-700 mb-6">
          A secure blockchain-based system to track and manage employee asset assignments, powered by smart contracts.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full">
            Sign Up
          </Link>
          <Link to="/login" className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-100">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;