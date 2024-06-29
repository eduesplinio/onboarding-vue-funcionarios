<template>
  <v-app>
    <!-- Barra de Navegação -->
    <v-app-bar v-if="shouldShowNavBar" app color="#165091" dark class="navbar">
      <!-- Botão Hambúrguer (Visível apenas em dispositivos móveis) -->
      <v-btn class="d-sm-none" icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <!-- Logo (Visível apenas em desktop) -->
      <router-link to="/" class="d-none d-sm-flex">
        <v-img src="logo_nome.svg" class="logo-image"></v-img>
      </router-link>

      <!-- Espaçamento para centralizar os botões -->
      <v-spacer></v-spacer>

      <!-- Links de Navegação -->
      <v-btn class="d-none d-sm-flex menu-button" text to="/minhasTarefas"
        >Minhas Tarefas</v-btn
      >
      <v-btn class="d-none d-sm-flex menu-button" text to="/meusAgendamentos"
        >Meus Agendamentos</v-btn
      >
      <v-btn class="d-none d-sm-flex menu-button" text to="/forumEmpresa"
        >Fórum</v-btn
      >

      <!-- Espaçamento para alinhar o ícone de ajuda e o logout à direita -->
      <v-spacer></v-spacer>

      <!-- Ícone de modo Claro/Escuro -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            icon
            v-bind="attrs"
            v-on="on"
            @click="darkTheme = !darkTheme"
          >
            <v-icon>{{
              darkTheme ? "mdi mdi-white-balance-sunny" : "mdi-weather-night"
            }}</v-icon>
          </v-btn>
        </template>
        <span>{{
          darkTheme ? "Ativar modo claro" : "Ativar modo escuro"
        }}</span>
      </v-tooltip>

      <!-- Ícone de Feedback -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="openFeedbackDialog">
            <v-icon>mdi-bullhorn-outline</v-icon>
          </v-btn>
        </template>
        <span>Avaliar Empresa</span>
      </v-tooltip>

      <!-- Ícone de Ajuda -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="goToHelpSite">
            <v-icon>mdi-book-open-variant-outline</v-icon>
          </v-btn>
        </template>
        <span>Recursos e Documentação</span>
      </v-tooltip>

      <!-- Botão Sair (Ícone em dispositivos móveis, Texto em desktop) -->
      <v-btn icon class="d-sm-none" @click="performLogout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn class="d-none d-sm-flex menu-button" text @click="performLogout">
        <v-icon left>mdi-logout</v-icon>
        Sair
      </v-btn>
    </v-app-bar>

    <!-- Menu Lateral (Visível apenas em dispositivos móveis) -->
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-item link to="/">Principal</v-list-item>
        <v-list-item link to="/minhasTarefas">Minhas Tarefas</v-list-item>
        <v-list-item link to="/meusAgendamentos">Meus Agendamentos</v-list-item>
        <v-list-item link to="/forumEmpresa">Fórum</v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Conteúdo Principal -->
    <v-main>
      <router-view />
    </v-main>

    <!-- Caixa de Diálogo de Feedback -->
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-title>
            <span class="headline">Deixe seu Feedback</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="titulo"
              label="Título do Feedback"
              :rules="[rules.required]"
            ></v-text-field>
            <v-textarea
              v-model="conteudo"
              label="Conteúdo do Feedback"
              :rules="[rules.required]"
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="cancelFeedback"
              >Cancelar</v-btn
            >
            <v-btn color="blue darken-1" text @click="submitFeedback"
              >Enviar</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <!-- Snackbar para confirmação de feedback -->
    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      class="centered-snackbar"
      color="green"
    >
      Agradecemos o seu feedback!
    </v-snackbar>
    <!-- Rodapé (Oculto em dispositivos móveis) -->
    <AppFooter v-if="!isMobile" app></AppFooter>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import AppFooter from "./components/common/AppFooter.vue";

export default {
  data() {
    return {
      drawer: false,
      darkTheme: true,
      dialog: false,
      snackbar: false,
      titulo: "",
      conteudo: "",
      valid: false,
      rules: {
        required: (value) => !!value || "Campo obrigatório",
      },
    };
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    },
    shouldShowNavBar() {
      const isAuthenticated = !!localStorage.getItem("userToken");
      const requiresAuth = this.$route.matched.some(
        (record) => record.meta.requiresAuth
      );
      return isAuthenticated && requiresAuth;
    },
  },
  watch: {
    darkTheme(newVal) {
      this.$vuetify.theme.dark = newVal;
    },
  },
  methods: {
    ...mapActions(["loginUser", "logoutUser"]),

    performLogin() {
      const credentials = { email: this.email, password: this.password };
      this.loginUser(credentials).then(() => {
        this.$router.push("/");
      });
    },

    performLogout() {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userInfo");
      this.$router.push("/login");
    },
    goToHelpSite() {
      window.open("https://unifeso.gitbook.io/orange-dragon", "_blank");
    },
    openFeedbackDialog() {
      this.dialog = true;
    },
    cancelFeedback() {
      this.dialog = false;
      this.resetForm();
    },
    resetForm() {
      this.$refs.form.reset();
    },
    submitFeedback() {
      if (this.$refs.form.validate()) {
        const feedback = {
          titulo: this.titulo,
          conteudo: this.conteudo,
        };
        console.log(feedback);
        this.dialog = false;
        this.snackbar = true;
        this.resetForm();
      }
    },
  },
  components: {
    AppFooter,
  },
};
</script>

<style scoped>
.menu-button {
  text-transform: none;
  font-size: 14px;
}

.logo-image {
  max-height: 300px;
  max-width: 165px;
  margin-left: 5px;
}

.v-app-bar {
  justify-content: space-between;
}

.v-app-bar > *:not(.v-img):not(.v-btn) {
  flex: 1 1 auto;
}
</style>
