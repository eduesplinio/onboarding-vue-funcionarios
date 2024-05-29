import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#FF7F00', // Laranja médio
                secondary: '#FF5500', // Laranja mais escuro
                tertiary: '#F0EAD6', // Bege claro
                tertiary2: '#E5E5E5', // Cinza claro
                white: '#FFFFFF'
            },
            dark: {
                primary: '#FF7F00', // Laranja médio
                secondary: '#FF5500', // Laranja mais escuro
                tertiary: '#F0EAD6', // Bege claro
                tertiary2: '#E5E5E5', // Cinza claro
            }
        },
    },
});