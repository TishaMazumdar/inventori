import { authContext } from '@/lib/store/auth-context';
import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';

function SignIn() {
    const {googleLoginHandler} = useContext(authContext)
    return (
        <main className="container max-w-2xl px-6 mx-auto">
            <h1 className="mb-6 text-6xl font-bold text-center">Welcome to ✨inventori✨</h1>
            <div className="flex flex-col overflow-hidden shadow-md shadow-slate-700 bg-slate-800 rounded-2xl">
                <div className="h-52">
                    <img className="object-cover w-full h-full"
                        src="https://images.pexels.com/photos/15271595/pexels-photo-15271595/free-photo-of-multi-colored-jelly-bears.jpeg?auto=compress&cs=tinysrgb&w=600" />
                </div>

                <div className="px-4 py-4">
                    <h3 className="text-2xl text-center">Please Sign In to Continue</h3>
                    <button onClick={googleLoginHandler} className="flex self-start gap-2 p-4 mx-auto mt-6 font-medium text-white align-middle bg-gray-700 rounded-lg">
                        <FcGoogle className='text-2xl' />
                        Google
                    </button>
                </div>
            </div>
        </main>
    )
}

export default SignIn