<template>
  <div app dark color="#E9EEF4" class="sidebar">
    <div class="text-center mt-5">
      <h1 class="teal--text text-lg-h5 font-weight-bold">Son NV</h1>
      <v-divider color="white" class="mt-4"></v-divider>
      <v-avatar class="my-5" size="60">
        <v-img
          src="https://cdn.vuetifyjs.com/images/lists/1.jpg"
          class="image"
        ></v-img>
      </v-avatar>
      <h1 class="black--text">Admin</h1>
      <h6 class="grey--text">admin@admin.com</h6>
      <v-btn rounded color="#2EBFAF" outlined>MOVIE CHILL</v-btn>
    </div>

    <v-list dense class="mt-5">
      <v-list-item-group>
        <v-list-item v-for="(item, i) in data" :key="i">
          <div
            class="sidebar-item"
            :class="
              isRouteActive(item.path) ? 'sidebar-item-active icon-active' : ''
            "
            @click="goToPage(item.path)"
          >
            <v-list-item-icon class="ml-6">
              <v-icon> {{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </div>
        </v-list-item>

        <v-list-item class="mt-16">
          <div class="sidebar-item">
            <v-list-item-icon class="ml-6">
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </div>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import {
  DASHBOARD,
  MOVIE,
  NOTIFICATION,
  COMMENT,
  USER,
} from '~/constants/routes'

const router = useRouter()
const data = [
  { icon: 'mdi-poll', text: 'Dashboard', path: DASHBOARD },
  { icon: 'mdi-movie', text: 'Quản lý phim', path: MOVIE },
  { icon: 'mdi-bell', text: 'Quản lý thông báo', path: NOTIFICATION },
  { icon: 'mdi-account', text: 'Quản lý user', path: USER },
  { icon: 'mdi-chat', text: 'Quản lý bình luận', path: COMMENT },
  // { icon: 'mdi-home-outline', text: 'Services' },
  // { icon: 'mdi-map-marker-outline', text: 'Location' },
  // { icon: 'mdi-cogs', text: 'Settings' },
]

const goToPage = (path: string) => {
  navigateTo(path)
}

const isRouteActive = (path: string) => {
  return router.currentRoute.value.path.includes(path)
}
</script>

<style>
.image {
  border: 2px solid #2ebfaf;
}
.sidebar {
  width: 300px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  border-right: 2px solid #2ebfaf;
}
.sidebar-item {
  display: flex;
  gap: 12px;
  padding: 6px 8px;
  border-radius: 10px;
}
.sidebar-item:hover,
.sidebar-item-active {
  background-color: #2ebfaf;
  cursor: pointer;
  color: white;
}

v-icon {
  color: grey;
}
v-icon:hover,
.icon-active {
  color: white;
}
</style>
