import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload; // whats going to come here? -> {product:id, <product details info>, qty}
            // if the product is already in cart (in cart state):
            const existItem = state.cartItems.find(
                (x) => x.product === item.product
            );
            if (existItem) {
                // cartItems object will be: [{product: id1, somethingElse1}, {product: id2, somethingElse2} ... ]
                return {
                    // if ids i want to add to cart are already there,
                    ...state, //        if id of product that already in cart is same as id of product that is came in payload, rewrite that object, i.e. it rewrite {product:id1, somethingElse1} to {{product:id1, somethingElse2}! ... WTF $%$#$Q$%&"%#"
                    cartItems: state.cartItems.map((x) =>
                        x.product === existItem.product ? item : x
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: [
                    ...state.cartItems.filter(
                        (x) => x.product !== action.payload
                    ),
                ],
            };
        default:
            return state;
    }
};
