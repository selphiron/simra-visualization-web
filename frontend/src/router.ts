import Vue from "vue";
import VueRouter from "vue-router";
import Map from "@/views/Map.vue";
import Statistics from "@/views/Statistics.vue";
import Admin from "@/views/Admin.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "/map",
    },
    {
        path: "/map",
        name: 'map',
        component: Map,
    },
    {
        path: "/map?lat=:lat&lng=:lng&z=:zoom&style=:style&m=:viewMode&sm=:subViewMode",
        name: 'mapQuery',
        component: Map,
    },
    {
        path: "/statistics",
        component: Statistics,
    },
    {
        path: "/admin",
        component: Admin,
    },
];

const router = new VueRouter({
    mode: "history",
    linkExactActiveClass: "is-active",
    base: process.env.BASE_URL,
    routes,
});

export default router;
