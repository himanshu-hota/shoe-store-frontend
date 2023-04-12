import React, { useState } from 'react';
import Wrapper from '@/components/Wrapper';
import { IoMdHeartEmpty } from 'react-icons/io';
import ProductDetailsCarousel from '@/components/ProductDetailsCarousel';
import RelatedProducts from '@/components/RelatedProducts';
import { fetchDataFromAPI } from '@/utils/api';
import { getDiscountedPrice } from '@/utils/helper';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = ({product,products}) => {
    const [selectedSize, setSelectedSize] = useState();
    const [showError, setShowError] = useState(false);
    const p = product?.data[0]?.attributes;
    const dispatch = useDispatch();

    const notify = () => {
        toast.success('Success. Check your cart!!!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    return (
        <div className="w-full md:py-20">
            <ToastContainer newestOnTop />
            <Wrapper>
                <div className='flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]  '>
                    {/* left column start */}
                    <div className="left w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0  ">
                        <ProductDetailsCarousel images={p?.image?.data} />
                    </div>
                    {/* left column end */}

                    {/* right column start */}
                    <div className="right flex-[1] py-3">
                        {/* Product title */}
                        <div className="text-[34px] font-semibold mb-2 leading-tight">
                            {p.name}
                        </div>

                        {/* Product subtitle */}
                        <div className="text-lg font-semibold mb-5">
                            {p.subtitle}
                        </div>

                        {/* Product price */}
                        <div className="flex items-center">
                            <p className="mr-2 text-lg font-semibold">
                                MRP : &#8377;{p.price}
                            </p>
                            {p.original_price && (
                                <>
                                    <p className="text-base  font-medium line-through">
                                        &#8377;{p.original_price}
                                    </p>
                                    <p className="ml-auto text-base font-medium text-green-500">
                                        {getDiscountedPrice(
                                            p.original_price,
                                            p.price
                                        )}
                                        % off
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="text-md font-medium text-black/[0.5]">
                            incl. of taxes
                        </div>
                        <div className="text-md font-medium text-black/[0.5] mb-20">
                            {`(Also includes all applicable duties)`}
                        </div>

                        {/* Product size range start */}
                        <div className="mb-10">
                            {/* Heading start */}
                            <div className="flex justify-between mb-2">
                                <div className="text-md font-semibold ">
                                    Select Size
                                </div>
                                <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                                    Select Guide
                                </div>
                            </div>
                            {/* Heading end */}

                            {/* Size selection */}
                            <div id="sizesGrid" className="grid grid-cols-3 gap-2">

                                {
                                    p.size.data.map((item,i) => (
                                        <div key={i} 
                                            className={`border rounded-md text-center py-3 font-medium ${item.enabled ? 'hover:border-black cursor-pointer' : 'cursor-not-allowed bg-black/[0.1] opacity-50'} ${selectedSize === item.size ? 'border-l-black ': ''  } `} onClick={() => {
                                                setSelectedSize(item.size);
                                                setShowError(false);
                                            }}>
                                            {item.size}
                                            </div>
                                    ))
                                }

       

                            </div>
                            {/* show error start */}
                            {showError && <div className="text-red-600 mt-1">Size selection is required</div>}
                            {/* show error end */}
                        </div>
                        {/* Product size range end */}

                        {/* Add to cart button start */}
                        <button className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 " onClick={() => {
                            if(!selectedSize){
                                setShowError(true)
                                document.getElementById("sizesGrid").scrollIntoView({block:"center",behavior:"smooth"})
                            }else{
                                dispatch(addToCart({ ...product?.data[0] , selectedSize,oneQuantityPrice:p.price}));
                                notify();
                            }

                            
                        }}  >
                            Add to Cart 
                        </button>
                        {/* Add to cart button end */}

                        {/* Wishlist button start */}
                        <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-x-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10 ">
                            WishList 
                            <IoMdHeartEmpty size={20} />
                        </button>
                        {/* Wishlist button end */}

                         {/* product description start */}
                         <div>
                            <div className="text-lg font-bold mb-5 ">
                                Product Details
                            </div>
                            <div className="text-md mb-5 markdown">
                            <ReactMarkdown>
                                {
                                    p.description
                                }
                                </ReactMarkdown>
                            </div>
                         </div>
                        {/* product description end */}


                    </div>
                    {/* right column end */}
                </div>

                <RelatedProducts products={products} />
            </Wrapper>
        </div>
    )
}

export default ProductDetails;

export async function getStaticPaths() {

    const products = await fetchDataFromAPI('/api/products?populate=*');

    const paths = products.data.map(p => ({
        params: {
            slug: p.attributes.slug
        }
    }));

    return {
        paths,
        fallback: false, // can also be true or 'blocking'
    }

}




export async function getStaticProps(context) {

    const { params } = context;
    const { slug } = params;
    const product = await fetchDataFromAPI(`/api/products?populate=*&filters[slug][$eq]=${slug}`);

    const products = await fetchDataFromAPI(`/api/products/?populate=*&[filters][slug][$ne]=${slug}`);

    return {
        // Passed to the page component as props
        props: { product , products }
    }
}