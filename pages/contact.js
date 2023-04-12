import React from 'react';
import { BsLinkedin, BsFacebook , BsTwitter , BsYoutube } from 'react-icons/bs';
import Link from 'next/link';


const Contact = () => {
    return (
        <>
            <div className="w-full h-screen flex flex-col justify-center items-center">

                <h1 className='font-bold text-3xl'>S H O E - S T O R E</h1> <br />
                <div className=" w-2/3 md:w-1/3 h-2/3 first-letter:text-xl">
                    <div className="logo w-full h-20 flex justify-between items-center ">
                        <BsLinkedin className=' text-blue-800 text-4xl ' />
                        <Link href={'.'} className='italic underline font-light ' >Click here to redirect </Link>
                    </div>

                    <div className="logo w-full h-20 flex justify-between items-center ">
                        <BsFacebook className=' text-blue-700 text-4xl ' />
                        <Link href={'.'} className='italic underline font-light ' >Click here to redirect </Link>
                    </div>

                    <div className="logo w-full h-20 flex justify-between items-center ">
                        <BsTwitter className=' text-blue-400 text-4xl ' />
                        <Link href={'.'} className='italic underline font-light ' >Click here to redirect </Link>
                    </div>

                    <div className="logo w-full h-20 flex justify-between items-center ">
                        <BsYoutube className=' text-red-700 text-4xl ' />
                        <Link href={'.'} className='italic underline font-light ' >Click here to redirect </Link>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Contact;