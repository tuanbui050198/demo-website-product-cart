import Products from "../containers/Products";
import HomePage from "../containers/HomePage";
import Carts from "../containers/Carts";
import LoginPage from "../containers/LoginPage";
import RegisterPage from "../containers/RegisterPage";

export const ROUTES_PRODUCT = [
    {
      path: '/',
      name: 'Trang Chủ',
      exact: true,
      component: HomePage,
    },
    {
      path: '/products',
      name: 'Sản Phẩm',
      component: Products,
    },
    {
      path: '/cards',
      name: 'Giỏ Hàng',
      component: Carts,
    },
    
  ];
  
  export const ROUTES_LOGIN = [
    {
      path: '/login',
      name: 'Đăng Nhập',
      component: LoginPage,
    },
    {
      path: '/register',
      name: 'Đăng Ký',
      component: RegisterPage,
    },
  ]