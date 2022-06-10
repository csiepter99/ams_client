export default {
    namespaced: true,
    state: {
        token: "",
        isLogin: false,
        roles: [],
        studentId: "",
    },
    mutations: {
        SET_AUTH(state, options) {
            state.token = options.token;
            state.isLogin = options.isLogin;
            state.roles = options.roles;
            state.studentId = options.studentId;
        }
    },
    actions: {
        setAuth(context, options) {
            context.commit('SET_AUTH', {
                token: options.token,
                isLogin: options.isLogin,
                roles: options.roles,
                studentId: options.studentId
            });
        }
    }
}