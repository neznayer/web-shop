import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_RESET,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_SPAYMENT_METHOD,
} from "../constants/cartConstants";

import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty,
        },
    });
    // add to state store "cart"

    // get from store(already processed in reducer) and place (replace) localStorage
    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
    );
};

export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    });
    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
    );
};

export const saveShippingAddress = (data) => async (dispatch, getState) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    });
    localStorage.setItem("shippingAddress", JSON.stringify(data));
};
export const savePaymentMethod = (data) => (dispatch, getState) => {
    dispatch({
        type: CART_SAVE_SPAYMENT_METHOD,
        payload: data,
    });
    localStorage.setItem("shippingPaymentMethod", JSON.stringify(data));
};

export const resetCart = () => (dispatch) => {
    dispatch({ type: CART_RESET });
    localStorage.removeItem("cartItems");
};
