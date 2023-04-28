import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Items from "@/pages/Items.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";
import Login from "@/pages/Login.vue";
import SalesOrder from "@/pages/SalesOrder.vue";
import store from "@/store/store";
import Vue from "vue";
import Router from 'vue-router';
Vue.use(Router);
// if (localStorage.getItem("setAuthentication") == 'true') {
//     store.commit("setAuthentication", true);
//   }
//   else {
//     store.commit("setAuthentication", false);
//   }

const router = new Router({

 routes:[
  {
    path: '/',
    redirect: {
        name: "Login"
    }
  },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "dashboard", 
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta : {
          requiresAuth : true
        }
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile,
        meta : {
          requiresAuth : true
        }
      },
      {
        path: "table",
        name: "Table List",
        component: TableList,
        meta : {
          requiresAuth : true
        }
      },
      {
        path: "items",
        name: "Items",
        component: Items,
        meta : {
          requiresAuth : true
        }
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons,
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true,
        },
        component: Maps,
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications,
      },
      {
        path: "upgrade",
        name: "Upgrade to PRO",
        component: UpgradeToPRO,
      },
      {
        path: 'salesorder',
        name: "salesOrder",
        component: SalesOrder,
        meta : {
          requiresAuth : true
        }
      }
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
]
})


function isAuthenticated () {
  const user = localStorage.getItem("setAuthentication");

  //alert(user);
  if (user != 'false') {
    return true
  } else {
    return false
  }
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router;
