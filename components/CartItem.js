import Image from 'next/image';
import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { updateCart,removeFromCart } from '@/store/cartSlice';

const CartItem = ({ data }) => {

  const p = data?.attributes;

  const dispatch = useDispatch();

  const updateCartItem = (e, key) => {
    let payload = {
      key,
      val: key === "quantity" ? parseInt(e.target.value) : e.target.value,
      id: data.id,
    };
    dispatch(updateCart(payload));
  };


  return (
    <div className='flex py-5 gap-3 md:gap-5 border-b'>
      {/* Image start */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px] ">

        <Image src={p?.thumbnail.data.attributes.url} height={120} width={120} alt={p?.name} />
      </div>
      {/* image end */}

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Product title */}
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8] ">
            {p?.name}
          </div>

          {/* Product subtitle */}
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2 block md:hidden ">
            {p?.subtitle}
          </div>

          {/* Product price */}
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2 ">
            MRP : &#8377;{p?.price}
          </div>
        </div>

        {/* Product subtitle */}
        <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2  ">
          {p?.subtitle}
        </div>

        {/* Selectors */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">

            <div className="flex items-center gap-1">Size:</div>
            <select className="hover:text-black" onChange={(e) =>
              updateCartItem(e, "selectedSize")
            }>clear
              {p.size.data.map((item, idx) => (
                <option
                  value={item.size}
                  key={idx}
                  disabled={!item.enabled ? true : false}
                  selected={data.selectedSize === item.size} >
                  {item.size}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-1">Quantity:</div>
            <select className="hover:text-black" onChange={(e) => updateCartItem(e, "quantity")}>

              {Array.from({ length: 10 }, (_, i) => i + 1).map((q, i) => {
                return (<option key={i} value={q} selected={data.quantity == q}>{q}</option>)
              })}


            </select>



          </div>

          <RiDeleteBin6Line 
           className='cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px] ' 
            onClick={() => dispatch(removeFromCart({ id: data.id }))}
           />

        </div>


      </div>
    </div>
  )
}

export default CartItem;