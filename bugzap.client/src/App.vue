<template>
  <div id="app" class="digitalFont">
      <div class="d-flex flex-column align-items-center headerStyle">
        <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
        <img
          alt="logo"
          src="./assets/img/bugzapimg.jpg"
          height="150"
        />
        </router-link>
        <div class="navBarStyle">
          <router-link :to="{ name: 'CreateBug' }">
            <button>Report Bug</button>
          </router-link>
          <button
            @click="login"
            v-if="!user.isAuthenticated"
          >
            Login
          </button>
          <button
            @click="logout"
            v-else
          >
            Logout
          </button>
        </div>
      </div>
    <div class="content">
      <transition name="slideInFadeOut" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import { AuthService } from './services/AuthService'
import { AppState } from './AppState'
import { computed, reactive } from 'vue'
export default {
  name: 'App',
  setup() {
    const state = reactive({
    })
    return {
      state,
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        await AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style>
@font-face {
  font-family: "Press Start 2P";
  src: local("Press Start 2P"),
   url(./assets/font/PressStart2P-Regular.ttf) format("truetype");
}

.digitalFont{
  font-family:Arial, Helvetica, sans-serif;
}

#app {
  height: auto;
  width: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.headerStyle {
  /* Flex Box Stuff */
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* Basic Properties */
  height: auto;
  width: 100%;
  padding-top: 1em;
  padding-bottom: 1em;
  background-color:teal;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.19), 0 2px 2px rgba(0, 0, 0, 0.23);
  margin-bottom: 1.5em;
}
.headerStyle img {
  margin-right: 20px;
  cursor: pointer;
}
.headerStyle button {
  height: 50px;
  width: 100px;
  margin-right: 50px;
}
.slideInFadeOut-enter-active{
  animation: slideIn .3s ease;
}
@keyframes slideIn {
  0%{
    transform: translateX(-800px);
  }
  25%{
    transform: translateX(-400px);
  }
  50%{
    transform: translateX(-200px);
  }
  100%{
    transform: translateX(0);
  }
}
.slideInFadeOut-leave-active{
  opacity: 0;
}
.content {
  height: 100%;
}

.navBarStyle{
  display: flex;
  justify-content: space-around;
  width: 100%;
}
</style>
