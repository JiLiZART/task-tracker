import Vue from 'vue'
import VueRouter, { RouteConfig } from "vue-router";
import CreateWorkspace from '@/views/CreateWorkspace.vue'
import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/Login.vue'
import Member from '@/views/Member.vue'
import Search from '@/views/Search.vue'
import Settings from '@/views/Settings.vue'
import Team from '@/views/Team.vue'
import TeamAddUsers from '@/views/TeamAddUsers.vue'

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/create-workspace',
    name: 'create-workspace',
    component: CreateWorkspace
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/member/:id',
    name: 'member',
    component: Member
  },
  {
    path: '/team',
    name: 'team',
    component: Team
  },
  {
    path: '/team/add',
    name: 'team-add',
    component: TeamAddUsers
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  },
  {
    path: '/search/:query',
    name: 'search',
    component: Search
  },
  {
    path: '/',
    name: 'login',
    component: Login
  },
];

export function createRouter() {
  return new VueRouter({
    routes
  });
}

