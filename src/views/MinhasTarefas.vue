<template>
  <v-container>
    <div class="mt-5"></div>

    <v-row align="center">
      <v-col cols="12" sm="auto" class="d-flex align-items-center">
        <v-icon color="secondary" class="mt-20" size="40">mdi-invoice-list-outline</v-icon>
        <h2 class="ml-2 mt-3 font-weight-normal primary--text">Minhas Tarefas</h2>
      </v-col>
    </v-row>
    <v-divider class="my-3" :style="{ 'backgroundColor': 'tertiary' }"></v-divider>

    <!-- Lista de Tarefas -->
    <v-row>
      <v-col>
        <v-list dense>
          <v-list-item v-for="(tarefa, index) in tarefas" :key="index" @click="toggleTarefa(index)">
            <v-list-item-icon>
              <v-icon :color="tarefa.concluida ? 'blue' : 'blue'">{{ tarefa.concluida ? 'mdi-check-circle' : 'mdi-circle-outline' }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title :class="{ 'text--strikethrough': tarefa.concluida }">{{ tarefa.descricao }}</v-list-item-title>
              <v-list-item-subtitle>{{ tarefa.horario }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <!-- Botão para adicionar tarefa -->
    <!--
    <v-row justify="end">
      <v-col cols="auto">
        <v-btn color="primary" @click="adicionarTarefa">Adicionar Tarefa</v-btn>
      </v-col>
    </v-row>
    -->
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      isDesktop: window.innerWidth > 600,
      tarefas: [],
    };
  },
  computed: {
    ...mapState({
      isDarkMode: state => state.isDarkMode,
    }),
  },
  created() {
    window.addEventListener('resize', this.checkWidth);
  },
  mounted() {
    this.carregarTarefas();
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
    },
    toggleTarefa(index) {
      this.tarefas[index].concluida = !this.tarefas[index].concluida;
      this.salvarTarefas();
    },
    adicionarTarefa() {
      // Implementar lógica para adicionar uma nova tarefa
      console.log('Adicionar tarefa');
    },
    salvarTarefas() {
      localStorage.setItem('tarefas', JSON.stringify(this.tarefas));
    },
    carregarTarefas() {
      const tarefasSalvas = localStorage.getItem('tarefas');
      if (tarefasSalvas) {
        this.tarefas = JSON.parse(tarefasSalvas);
      } else {
        // Se não houver tarefas salvas, inicialize com um array vazio ou valores padrão
        this.tarefas = [
           { descricao: 'Responder e-mails', horario: '05/04/2023 09:00', concluida: false },
        { descricao: 'Preparar apresentação para reunião', horario: '05/04/2023 11:00', concluida: false },
        { descricao: 'Atualizar planilhas de controle', horario: '05/04/2023 14:00', concluida: false },
        { descricao: 'Participar de reunião de equipe', horario: '06/04/2023 10:00', concluida: false },
        { descricao: 'Organizar arquivos digitais', horario: '07/04/2023 09:00', concluida: false },
        { descricao: 'Revisar documentos para envio', horario: '08/04/2023 11:00', concluida: false },
        { descricao: 'Agendar compromissos da semana', horario: '09/04/2023 09:00', concluida: false },
        { descricao: 'Realizar follow-up de tarefas pendentes', horario: '10/04/2023 14:00', concluida: false },
        { descricao: 'Participar de treinamento online', horario: '11/04/2023 16:00', concluida: false },
        ];
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