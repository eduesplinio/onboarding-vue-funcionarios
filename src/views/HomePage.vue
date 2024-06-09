<template>
  <v-container>
    <div class="mt-5"></div>

    <v-row align="center">
      <v-col cols="12" sm="auto" class="d-flex align-items-center">
        <img src="@/assets/icons8-cave.svg" alt="Caverna" class="m-12"/>
        <h2 class="ml-2 mt-3 font-weight-normal primary--text">Boas-vindas!</h2>
      </v-col>
    </v-row>
    <v-divider class="my-3" :style="{ 'backgroundColor': 'tertiary' }"></v-divider>
    <div class="media-container">
      <video v-if="$vuetify.theme.dark" src="@/assets/home-dark.mp4" class="video-responsive no-interaction" autoplay loop muted></video>
      <video v-else-if="isDesktop" src="@/assets/home-light.mp4" class="video-responsive no-interaction" autoplay loop muted></video>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      isDesktop: window.innerWidth > 600
    };
  },
  computed: {
    ...mapState({
      isDarkMode: state => state.isDarkMode
    })
  },
  created() {
    window.addEventListener('resize', this.checkWidth);
  },
  destroyed() {
    window.removeEventListener('resize', this.checkWidth);
  },
  methods: {
    ...mapActions(['logoutUser']),

    performLogout() {
      this.logoutUser()
        .then(() => {
          this.$router.push('/login');
        })
        .catch(error => {
          console.error('Erro no logout:', error);
        });
    },
    checkWidth() {
      this.isDesktop = window.innerWidth > 600;
    }
  }
};
</script>

<style scoped>
.font-weight-normal {
  font-weight: normal;
}
.media-container {
  text-align: center;
  width: 100%;
  height: 110%;
  justify-content: center;
}
.video-responsive, .image-responsive {
  width: 80%;
  height: auto; 
  display: inline-block;
}
.no-interaction {
  pointer-events: none;
}
</style>
