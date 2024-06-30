<template>
  <v-container>
    <div class="mt-5"></div>

    <v-row align="center">
      <v-col cols="12" sm="auto" class="d-flex align-items-center">
        <v-icon color="secondary" class="mt-20" size="40"
          >mdi-invoice-list-outline</v-icon
        >
        <h2 class="ml-2 mt-3 font-weight-normal primary--text">
          Minhas Tarefas
        </h2>
      </v-col>
    </v-row>
    <v-divider
      class="my-3"
      :style="{ backgroundColor: 'tertiary' }"
    ></v-divider>

    <!-- Verifica se há tarefas para exibir -->
    <v-row v-if="tarefas.length > 0">
      <v-col>
        <v-list dense>
          <v-list-item
            v-for="(tarefa, index) in tarefas"
            :key="index"
            @click="toggleTarefa(index)"
          >
            <v-list-item-icon>
              <v-icon :color="tarefa.concluida ? 'blue' : 'blue'">
                {{
                  tarefa.concluida ? "mdi-check-circle" : "mdi-circle-outline"
                }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content
              :class="{ 'text--strikethrough': tarefa.concluida }"
            >
              <v-list-item-title>{{ tarefa.nomeEvento }}</v-list-item-title>
              <v-list-item-subtitle
                >Descrição: {{ tarefa.descricaoEvento }}</v-list-item-subtitle
              >
              <v-list-item-subtitle
                >Data: {{ tarefa.dataReuniao }} - Hora:
                {{ tarefa.horaReuniao }}</v-list-item-subtitle
              >
              <v-list-item-subtitle v-if="tarefa.link">
                Link:
                <a :href="tarefa.link" target="_blank" @click.stop>{{
                  tarefa.link
                }}</a>
              </v-list-item-subtitle>
              <v-list-item-subtitle v-if="tarefa.pdf">
                Arquivo: <a :href="tarefa.pdf" target="_blank">Arquivo</a>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <!-- Mensagem caso não haja tarefas -->
    <v-row v-else>
      <v-col>
        <p class="text-center">Não há tarefas agendadas.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      isDesktop: window.innerWidth > 600,
    };
  },
  computed: {
    ...mapState(["tarefas"]),
  },
  created() {
    window.addEventListener("resize", this.checkWidth);
    this.carregarTarefas(); // Carrega as tarefas ao criar o componente
  },
  mounted() {
    // Chamada opcional para carregar as tarefas ao montar o componente
    // Pode ser removido se a carga no created for suficiente
    // this.carregarTarefas();
  },
  destroyed() {
    window.removeEventListener("resize", this.checkWidth);
  },
  methods: {
    ...mapActions(["carregarTarefas", "salvarTarefas"]),
    checkWidth() {
      this.isDesktop = window.innerWidth > 600;
    },
    toggleTarefa(index) {
      this.tarefas[index].concluida = !this.tarefas[index].concluida;
      this.salvarTarefas();
    },
    salvarTarefas() {
      localStorage.setItem("tarefas", JSON.stringify(this.tarefas));
    },
    carregarTarefas() {
      // Carrega as tarefas do localStorage ao inicializar o componente
      const tarefasSalvas = localStorage.getItem("tarefas");
      if (tarefasSalvas) {
        this.$store.commit("setTarefas", JSON.parse(tarefasSalvas));
      }
    },
  },
};
</script>

<style scoped>
.font-weight-normal {
  font-weight: normal;
}

.text--strikethrough {
  text-decoration: line-through;
}
</style>
