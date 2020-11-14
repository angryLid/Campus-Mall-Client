import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import { store } from "./store.js";
import Account from "./views/Account.vue";
import Apply from "./views/Apply.vue";
import Board from "./views/Board.vue";
import Magane from "./views/Manage.vue";
import Feekback from "./views/Feedback.vue";
import Library from "./views/Library.vue";
import Login from "./views/Login.vue";
import Examine from "./views/Examine.vue";
import Score from "./views/Score.vue";

export const router = new VueRouter({
    linkActiveClass: "active",
    // mode: "history",
    routes: [
        {
            path: "/",
            name: "login",
            component: Login,
            meta: {
                title: "登录"
            }
        },
        {
            path: "/board",
            component: Board,
            meta: {
                title: "控制台"
            },
            children: [
                {
                    path: "account",
                    component: Account,
                    meta: {
                        title: "查看职位-控制台"
                    }
                },
                {
                    path: "apply",
                    component: Apply,
                    meta: {
                        title: "请假申请-控制台"
                    }
                },
                {
                    path: "manage",
                    component: Magane,
                    meta: {
                        title: "员工管理"
                    }
                },
                {
                    path: "examine",
                    component: Examine,
                    meta: {
                        title: "审批"
                    }
                }
            ]
        },

        {
            path: "/feedback",
            component: Feekback,
            meta: {
                title: "评价调查"
            }
        },
        {
            path: "/library",
            component: Library,
            meta: {
                title: "借阅管理"
            }
        },
        {
            path: "/score",
            component: Score,
            meta: {
                title: "成绩查询"
            }
        }
    ]
});
// dynamic HTML title
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = `${to.meta.title} - 职工管理系统`;
    }
    let user = localStorage.getItem("Authorization");
    if (to.path == "/") {
        if (user) {
            router.replace("/board/account");
        } else {
            next();
        }
    } else {
        if (!user) {
            next({
                path: "/"
            });
        } else {
            next();
        }
    }
});
