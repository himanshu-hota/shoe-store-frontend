import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Wrapper from '@/components/Wrapper';
import CartItem from '@/components/CartItem';

const cart = () => {
  const {cartItems} = useSelector(state => state.cart);

  const subTotal = useMemo(() => {
    return cartItems.reduce((total,val) => total + val.attributes.price , 0)
  }, [cartItems]);
  
  return (
    <div className='w-full md:py-20 '>
      <Wrapper>
      {cartItems.length >0 ?
      <>
        {/* Heading and paragraph start */}
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight ">
            Shopping Cart
          </div>
        </div>
        {/* Heading and paragraph end */}

        {/* Cart content start */}
        <div className="flex flex-col lg:flex-row gap-12 py-10">
          {/* Cart item start */}
          <div className="left flex-[2]">
            
            <div className="text-lg font-bold">
                  Cart items
            </div>
            {cartItems.map((item,idx) => (
              <CartItem key={idx} data={item} />
            ))}
 
          </div>
          {/* Cart item end */}

          {/* Summary start */}

          <div className="right flex-[1]">
            <div className="text-lg font-bold">Summary</div>

            <div className="p-5 my-5 bg-black/[0.05] rounded-xl ">
              <div className="flex justify-between">
                <div className="uppercase text-md md:text-lg font-medium text-black ">Subtotal</div>
                    <div className="text-md md:text-lg font-medium text-black">  MRP : &#8377;{subTotal}</div>

              </div>
              <div className="text-sm md:text-md py-5 border-t mt-5">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat velit dolorem eaque, sed sint minus corporis harum ullam. Aliquid, distinctio? Fuga voluptates est laborum quis amet aliquid culpa minus repellat?
              </div>
            </div>

            {/* Button start */}
            <button className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75">Checkout</button>
            {/* Button end */}

          </div>
          {/* Summary end */}
        </div>
        {/* Cart content end */}

          </> : <>
        {/* Empty page start */}

        <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
          <Image src={'/empty-cart.jpg'} width={300} height={300} className='w-[300px] md:w-[400px] ' />
          <span className="text-xl font-bold">Your cart is empty</span>
          <span className="text-center mt-4">Looks like you have not added anything in your cart.
            <br />
            Go ahead and explore top categories.
          </span>
          <Link href={'/'} className='py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8 '>
          Continue Shopping
          </Link>
        </div>

        {/* Empty page end */}
          </>
      }

      </Wrapper>
    </div>
  )
}

export default cart;