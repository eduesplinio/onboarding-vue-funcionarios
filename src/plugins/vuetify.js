import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#F75700',
                secondary: '#FB8104',
                tertiary: '#d0d2d3',
                tertiary2: '#929497',
                white: '#FFFFFF'
            },
            dark: {
                primary: '#F75700',
                secondary: '#FB8104',
                tertiary: '#d0d2d3',
                tertiary2: '#929497',
            }
        },
    },
});
