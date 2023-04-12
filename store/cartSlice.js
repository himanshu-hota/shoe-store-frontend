import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems:[],

}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart:(state,action) => {
            const item = state.cartItems.find((p) => p.id === action.payload.id);
            console.log(item);
            if(item){
                item.quantity++;
                item.attributes.price = item.quantity * item.oneQuantityPrice;
            }else{
                state.cartItems.push({...action.payload,quantity:1});
            }
        },
        updateCart:(state,action) => {
          state.cartItems = state.cartItems.map(p => {
            if(action.payload.id === p.id){
                if (action.payload.key === "quantity") {
                    p.attributes.price = p.oneQuantityPrice * action.payload.val;
                }

                return { ...p, [action.payload.key]: action.payload.val }
            }
            return p;
          }
           )
        },
        removeFromCart:(state,action) => {
            state.cartItems = state.cartItems.filter(p => p.id !== action.payload.id);
        }
    },
})

// Action creators are generated for each case reducer function
export const { addToCart , updateCart,removeFromCart } = cartSlice.actions

export default cartSlice.reducer;