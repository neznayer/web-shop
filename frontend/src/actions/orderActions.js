import axios from "axios";
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST,
        });
        const {
            userLogin: { userInfo }, //take from userLogin part of the state
        } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post("/api/orders", order, config);

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        });

        //set logged in user to local storage

        //localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error?.response?.data.message || error.message,
        });
    }
};
