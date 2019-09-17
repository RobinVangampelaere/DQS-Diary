import db from "../../firestore";
import moment from "moment";

const state = {
    currentDate: "",
    currentDayData: ""
};

const getters = {

};

const actions = {

};

const mutations = {
    setcurrentDayData(state, uid, date = moment().startOf('day').format()) {
        //console.log(moment().startOf('day').format())
        db.collection('users').doc(uid).collection('days').doc(date).get().then((doc) => {
            state.currentDayData = doc.data();
        });
    },
    deletecurrentDayData() {
        state.currentDayData = ""
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}