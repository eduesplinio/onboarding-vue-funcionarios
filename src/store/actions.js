export default {
    loginUser({ commit }) {
        const token = "dummyToken"; // Token fictício para simular login
        const user = { id: 1, name: "Usuário Demo" }; // Usuário fictício
        localStorage.setItem('userToken', token);
        commit('SET_TOKEN', token);
        commit('SET_USER', user);
    },

    adicionarTarefa({ commit }, novaTarefa) {
        commit('ADICIONAR_TAREFA', novaTarefa);
    },

    logoutUser({ commit }) {
        localStorage.removeItem('userToken');
        commit('CLEAR_USER_DATA');
    },

    criarEvento({ commit }, eventoData) {
        commit('ADICIONAR_EVENTO', eventoData);
    }
}
