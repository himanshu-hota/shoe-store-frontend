import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { getDiscountedPrice } from '@/utils/helper';

const ProductCard = ({ data }) => {

  const { attributes: p, id, } = data;

  return (
    <Link href={`/product/${p.slug}`} className='transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer'>
      <Image width={500} height={500} src={p.thumbnail.data.attributes.url} alt={p.name} />
      {/* <img src="/product-1.webp" alt="product-1" className='w-full' /> */}
      <div className="p-4 text-black/[0.9]">
        <h2 className="text-lg font-medium">{p.name}</h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-lg font-semibold"> &#8377; {p.price}</p>
          {p.original_price && <>
            <p className="text-base font-medium line-through">&#8377; {p.original_price}</p>
            <p className="ml-auto text-base font-medium text-green-500">
              {getDiscountedPrice(p.original_price,p.price)}% off
            </p>
          </>}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
  ;