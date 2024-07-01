<template>
  <v-footer :class="{ 'dark-mode': $vuetify.theme.dark }" padless fixed>
    <v-col class="footer-content" cols="12">
      © {{ currentYear }} - Orange Dragon | Direitos Reservados
      <v-img
        class="footer-logo"
        src="/logo.svg"
        max-height="100%"
        max-width="20px"
      ></v-img>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: "FooterComponent",
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style scoped>
.footer-content {
  font-size: 13px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: right;
  background-color: #002147;
  color: var(--primary-color);
  position: relative;
}

.footer-content::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1.5px;
  background-color: var(--primary-color);
}

.footer-logo {
  height: auto;
  max-width: 100px;
  margin-left: auto;
}

.dark-mode .footer-content {
  background-color: 002147;
}
</style>
