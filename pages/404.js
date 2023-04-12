import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Error = () => {
  return (
    <div className="w-full h-[500px] flex flex-col justify-center items-center">
    <Image src={'/empty-cart.jpg'} height={300} width={300} />
    <h1 className='text-xl md:text-4xl mb-4'>Something went wrong!!!!</h1>     
          <Link href={'/'} className='p-4 text-xl md:text-2xl bg-black text-white rounded-full'>Go Home</Link>
    </div>
  )
}

export default Error;