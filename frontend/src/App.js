import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import Homescreen from "./screens/Homescreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/profileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";

const App = () => {
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container>
                    <Route path="/login" component={LoginScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route path="/product/:id" component={ProductScreen} />
                    <Route
                        path="/admin/product/:id/edit"
                        component={ProductEditScreen}
                    />

                    <Route
                        path="/admin/productlist"
                        component={ProductListScreen}
                    />

                    <Route path="/cart/:id?" component={CartScreen} />
                    <Route path="/" component={Homescreen} exact />
                    <Route path="/profile" component={ProfileScreen} />
                    <Route path="/shipping" component={ShippingScreen} />
                    <Route path="/payment" component={PaymentMethodScreen} />
                    <Route path="/placeorder" component={PlaceOrderScreen} />
                    <Route path="/order/:id" component={OrderScreen} />
                    <Route path="/admin/userlist" component={UserListScreen} />
                    <Route
                        path="/admin/user/:id/edit"
                        component={UserEditScreen}
                    />

                    {/* ":id?" id is optional */}
                </Container>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
