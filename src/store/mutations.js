export default {
    SET_TOKEN(state, token) {
        state.token = token;
    },
    SET_USER(state, user) {
        state.user = user;
    },
    CLEAR_USER_DATA(state) {
        state.token = null;
        state.user = null;
    },
    ADICIONAR_TAREFA(state, novaTarefa) {
        state.tarefas.push(novaTarefa);
    },
    ADICIONAR_EVENTO(state, novoEvento) {
        state.eventos.push(novoEvento);
    }
}
