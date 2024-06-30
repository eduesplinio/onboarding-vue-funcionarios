<template>
  <v-container>
    <div class="mt-5"></div>

    <!-- Título -->
    <v-row align="center">
      <v-col cols="12" sm="auto" class="d-flex align-items-center">
        <v-icon color="secondary" class="mt-20" size="40"
          >mdi-calendar-today</v-icon
        >
        <h2 class="ml-2 mt-3 font-weight-normal primary--text">
          Agendar Reunião/Treinamento
        </h2>
      </v-col>
    </v-row>

    <v-divider
      class="my-3"
      :style="{ backgroundColor: 'tertiary' }"
    ></v-divider>

    <!-- Formulário para adicionar Evento -->
    <v-form ref="form" v-model="valid" lazy-validation>
      <!-- Título e Descrição -->
      <v-text-field
        v-model="titulo"
        label="Título do Evento"
        :rules="[rules.required]"
      ></v-text-field>
      <v-textarea
        v-model="descricao"
        label="Descrição do Evento"
        :rules="[rules.required]"
      ></v-textarea>

      <!-- Data da Reunião/Treinamento -->
      <v-row>
        <v-col cols="12" sm="6">
          <v-menu
            v-model="showDatePicker"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dataReuniaoFormatted"
                label="Data da Reunião/Treinamento"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dataReuniao"
              @input="showDatePicker = false"
              no-title
              scrollable
              :locale="'pt-BR'"
            ></v-date-picker>
          </v-menu>
        </v-col>

        <!-- Hora da Reunião/Treinamento -->
        <v-col cols="12" sm="6">
          <v-menu
            v-model="showTimePicker"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="horaReuniao"
                label="Hora da Reunião/Treinamento"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-model="horaReuniao"
              @input="showTimePicker = false"
              format="24hr"
            ></v-time-picker>
          </v-menu>
        </v-col>
      </v-row>

      <!-- Campos separados para Link e PDFs -->
      <v-row>
        <!-- Campo para Link do Evento -->
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="linkVideo"
            label="Link do Evento"
            prepend-icon="mdi-link-variant"
            :rules="[rules.optionalUrl]"
          ></v-text-field>
        </v-col>

        <!-- Campo para Anexar PDFs -->
        <v-col cols="12" sm="6">
          <v-file-input
            v-model="pdfs"
            label="Anexar Arquivo (opcional)"
            prepend-icon="mdi-file-document-outline"
            multiple
            accept="*/*"
            @change="onFileChange"
          ></v-file-input>
        </v-col>
      </v-row>

      <!-- Botão de Submissão -->
      <v-btn color="primary" @click="submitEvento">Agendar Evento</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      titulo: "",
      descricao: "",
      dataReuniao: null,
      horaReuniao: null,
      linkVideo: "",
      pdfs: [],
      valid: false,
      rules: {
        required: (value) => !!value || "Campo obrigatório",
        optionalUrl: (value) => {
          if (!value) return true;
          const pattern =
            /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
          return pattern.test(value) || "URL inválido";
        },
      },
      showDatePicker: false,
      showTimePicker: false,
    };
  },
  computed: {
    dataReuniaoFormatted() {
      return this.dataReuniao
        ? new Date(this.dataReuniao).toLocaleDateString("pt-BR")
        : "";
    },
  },
  methods: {
    ...mapActions(["criarEvento", "adicionarTarefa"]),
    submitEvento() {
      if (this.$refs.form.validate()) {
        const formData = {
          titulo: this.titulo,
          descricao: this.descricao,
          dataReuniao: this.dataReuniao,
          horaReuniao: this.horaReuniao,
          linkVideo: this.linkVideo,
          pdfs: this.pdfs,
        };
        console.log("Form Data:", formData);
        this.criarEvento(formData)
          .then(() => {
            console.log("Evento criado com sucesso");
            this.adicionarTarefa({
              nomeEvento: formData.titulo,
              descricaoEvento: formData.descricao,
              dataReuniao: this.dataReuniaoFormatted,
              horaReuniao: formData.horaReuniao,
              concluida: false,
              link: formData.linkVideo,
              pdf: formData.pdfs.length > 0 ? formData.pdfs[0] : null,
            });
            this.resetForm();
          })
          .catch((error) => {
            console.error("Erro ao criar evento:", error);
          });
      } else {
        console.log("Formulário inválido");
      }
    },
    resetForm() {
      this.titulo = "";
      this.descricao = "";
      this.dataReuniao = null;
      this.horaReuniao = null;
      this.linkVideo = "";
      this.pdfs = [];
      this.valid = false;
      this.showDatePicker = false;
      this.showTimePicker = false;
      this.$refs.form.resetValidation();
    },
    onFileChange(files) {
      console.log("Arquivos selecionados:", files);
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
