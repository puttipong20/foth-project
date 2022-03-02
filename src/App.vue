<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2">
      <q-list>
        <q-item-label header>Menu</q-item-label>
        <q-item clickable tag="a" to="/">
          <q-item-section>
            <q-item-label>Home</q-item-label>
            <q-item-label caption>Go to Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/login">
          <q-item-section>
            <q-item-label>Log in</q-item-label>
            <q-item-label caption>Go to log-in</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/form">
          <q-item-section>
            <q-item-label>Form</q-item-label>
            <q-item-label caption>Go to Add Data</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view ></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    return {
      leftDrawerOpen: ref(false),
    };
  },
};
</script>
