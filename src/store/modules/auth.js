export default {
    namespaced: true,
    state: {
        token: "",
        isLogin: false,
        roles: []
    },
    mutations: {
        SET_AUTH(state, options) {
            state.token = options.token;
            state.isLogin = options.isLogin;
            state.roles = options.roles;
        }
    },
    actions: {
        setAuth(context, options) {
            context.commit('SET_AUTH', {
                token: options.token,
                isLogin: options.isLogin,
                roles: options.roles
            });
        }
    }
}