export const getDiscountedPrice = (original_price,price) => {
    const discount = original_price - price ;
    const percent = ( discount / original_price ) * 100 ;

    return percent.toFixed(2);
}