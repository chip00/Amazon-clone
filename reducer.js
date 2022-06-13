export const initialState = {
    basket: [],
    user: null
}

export const getBasketTotal = (basket) =>
    basket?.reduce((amount,item) => item.price + amount,0);

const reducer = (state, action) => {
    console.log(action);
    switch(action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item],
            };

        case "REMOVE_FROM_BASKET":
              
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            ); 
            let newBasket = [...state.basket];

                if (index >= 0){
                newBasket.splice(index, 1);

            } else {
                console.warn(
                    `Cant remove product ( id: ${action.id}) as its not in basket!`
                )
            }
        
            return {
                ...state,
                basket: newBasket
            }


        case "SET_USER":
            return {
                ...state,
                user: action.user
            }
          
          /*  This example works but removes every instance of a product
                ex if there are 3 books it removes all 3 of them 
             
             
                return {
                ...state,
                basket: state.basket.filter(item => item.id !== action.id)
            }

                */


            default:
                return state;
    }
};

export default reducer;