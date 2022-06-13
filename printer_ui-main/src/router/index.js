import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "@/view/LoginView";
import AdminView from "@/view/AdminPage";
import UserView from "@/view/UserView";
import ApplicationView from "@/view/ApplicationView";
import ProductView from "@/view/ProductView";
import DepartmentView from "@/view/DepartmentView";
import BrandView from "@/view/BrandView";
import ModelView from "@/view/ModelView";
import RoleView from "@/view/RoleView";
import PermissionView from "@/view/PermissionView";
import ServiceView from "@/view/ServiceView";
import HistoryView from "@/view/HistoryView";
import UserPage from "@/view/UserPage";
import HomePage from "@/view/HomePage";
import showHistory from "@/view/showHistory";
// import store from "@/store";

Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    // beforeEnter: (to,from,next) =>{
    //   if(store.state.isAuthenticated === false){
    //     next('/login');
    //   }else{
    //     next();
    //   }
    // },
  },
  {
    path: '/user',
    name: 'user',
    component: UserPage,
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage,

  },
  {
    path: '/users/crud',
    name: 'users',
    component: UserView,
  },
  {
    path: '/application',
    name: 'application',
    component: ApplicationView,
  },
  {
    path: '/product',
    name: 'product',
    component: ProductView,
  },
  {
    path: '/department',
    name: 'department',
    component: DepartmentView,
  },
  {
    path: '/brand',
    name: 'brand',
    component: BrandView,
  },
  {
    path: '/model',
    name: 'model',
    component: ModelView,
  },
  {
    path: '/role',
    name: 'role',
    component: RoleView,
  },
  {
    path: '/permission',
    name: 'permission',
    component: PermissionView,
  },
  {
    path: '/services',
    name: 'services',
    component: ServiceView,

  },
  {
    path: '/showHistory',
    name:'showHistory',
    component: showHistory
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryView,

  },
  {
    path: '/',
    redirect: {
      name: 'login'
    }
  }
]
const router = new VueRouter (
  {
    mode: 'history',
    routes
  }
)
// router.afterEach((to) => {
//   console.log(to)
// })

export default router
