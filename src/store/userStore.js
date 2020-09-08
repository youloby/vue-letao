const user = JSON.parse(localStorage.getItem('user'));
const userStore = {
    namespaced: true,
    state: {
        user
    },
    mutations: {
        updateUser(state, user){
            state.user = user;
        }
    }
}

export default userStore;
