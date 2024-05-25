<template>
  <v-container>
    
    <div class="mt-5"></div>

    <v-row align="center">
      <v-col cols="12" sm="auto" class="d-flex align-items-center">
        <img src="@/assets/icons8-cave.svg" alt="Caverna" />
        <h2 class="ml-2 mt-3 font-weight-normal primary--text">Boas-vindas!</h2>
      </v-col>
    </v-row>
    <v-divider class="my-3" :style="{ 'backgroundColor': 'tertiary' }"></v-divider>

    <!--
    <div class="img-container">
      <img v-if="isDesktop" src="@/assets/LiveDesktopWeb.svg" class="img-responsive" />
      <img v-else src="@/assets/LiveDesktopMobile.svg" class="img-responsive" />
    </div>
    -->
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      isDesktop: window.innerWidth > 600
    };
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
.img-container {
  text-align: center;
  margin-top: 30px;
}
.img-responsive {
  width: 80%;
  height: auto; 
  display: inline-block;
}
</style>
