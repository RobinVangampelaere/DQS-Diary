import db from "../../firestore";
import moment from "moment";

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
            this.commit("setSelectedDay", { uid: uid, date: moment() }, { root: true });
        });
    },
    logout(state) {
        state.user = "";
        this.commit("cleanSelectedDate", { root: true });
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}