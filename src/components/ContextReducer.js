import { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [
                ...state,
                { id: action.id, name: action.name, img: action.img, qty: action.qty, size: action.size, price: action.price }
            ];
        case "REMOVE":
            let updatedStore = [...state];
            updatedStore.splice(action.index, 1);
            return updatedStore;
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                return arr;
            })
            return arr;
        case "DROP":
            let emptyArr = [];
            return emptyArr;
        default:
            console.log("Error in Reducer");
    }
}


export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useStateContext = () => useContext(CartStateContext);
export const useDispatchContext = () => useContext(CartDispatchContext);