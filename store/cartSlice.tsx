import {createSlice, PayloadAction} from "@reduxjs/toolkit"


export interface CartItem{
    id:number;
    title: string;
    image: string;
    price: number;
    price_sale: number;
    point:number;
    is_type:number;  // discout gói hội viên
    total_sale:number; // số lượng bnans
    level1:number;
    level2:number;
    level3:number;
    type_discount:number;
    rate:number;// này là star
    quantity:number;
    cate_title:string;// này là cate của nó

}


interface CartState{
    items: CartItem[]
}

const initialState: CartState ={
    items:[],
}
const cartSlice = createSlice({
     name:"cart",
     initialState,
     reducers:{
        addItem:(state, action: PayloadAction<Omit<CartItem,"quantity">>)=>{
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );
            if(existingItem){
                existingItem.quantity+=1;
            }
            else{
                state.items.push({...action.payload,quantity:1})
            }
        }
        ,
        removeItem:(state, action: PayloadAction<{id:number}>)=>{
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );
            if(existingItem){
                if(existingItem.quantity>1){
                    existingItem.quantity -= 1;
                }
                else{
                    state.items=state.items.filter((item)=> item.id != action.payload.id)
                }
            }
        },


        clearCart:(state =>{
            state.items =[]
        })
     },

});

export const {addItem,clearCart,removeItem} = cartSlice.actions
export default cartSlice.reducer
