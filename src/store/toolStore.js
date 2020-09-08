const toolStore = {
    state: {
        active: 0
    },
    mutations: {
        updateActive(state, active){
            state.active = active;
        }
    }
}

export default toolStore;
