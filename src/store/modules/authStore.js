import db from "../../firestore";

const state = {
    user: ""
};

const getters = {

};

const actions = {

};

const mutations = {
    login(state, uid) {
        db.collection('users').doc(uid).get().then((doc) => {
            state.user = doc.data();
            this.commit("setcurrentDayData", uid, { root: true });
        });
    },
    logout(state) {
        state.user = "";
        this.commit("deletecurrentDayData", { root: true });
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}