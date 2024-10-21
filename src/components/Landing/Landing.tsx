import { signIn } from "next-auth/react"; 

const Landing = () => {
  return (
    <div className="h-[100vh]  bg-gray-800 flex flex-col items-center justify-center">
   
      <h1 className="text-5xl font-bold text-white mb-8">Welcome to My App</h1>

      
      <p className="text-white text-xl mb-4 font-semibold">
        Connect with us to access amazing features.
      </p>

      
      <button
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
        onClick={() => signIn()} 
      >
        Log In
      </button>

     
      <p className="text-gray-400 text-sm mt-4">
        By logging in, you agree to our <a href="#" className="underline">Terms of Service</a>.
      </p>
    </div>
  );
};

export default Landing;
