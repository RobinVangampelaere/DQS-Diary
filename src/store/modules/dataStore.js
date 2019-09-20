import firebase from 'firebase/app'
import 'firebase/firebase-firestore'
import Vue from 'vue'
import db from "../../firestore";
import Moment from "moment";
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

const state = {
    currentDate: "",
    currentDayData: {},
    currentDayTotal: 0,
    currentWeekTotal: [0, 0, 0, 0, 0, 0, 0],
    categories: [
        {
            "name": "High Quality Foods",
            "id": "high",
            "foods": [
                { "intakes": [2, 2, 2, 1, 0, 0], "name": "Vegetables", "id": "vegetables" },
                { "intakes": [2, 2, 2, 1, 0, 0], "name": "Fruit", "id": "fruit" },
                { "intakes": [2, 2, 1, 0, 0, -1], "name": "Nuts, seeds, etc.", "id": "nuts" },
                { "intakes": [2, 2, 1, 0, 0, -1], "name": "Whole grains", "id": "wholegrains" },
                { "intakes": [2, 1, 1, 0, -1, -2], "name": "Dairy", "id": "dairy" },
                { "intakes": [2, 1, 1, 0, -1, -2], "name": "Seafood & HQ meat", "id": "fish" },
            ]
        },
        {
            "name": "Low Quality Foods",
            "id": "low",
            "foods": [
                { "intakes": [-1, -1, -2, -2, -2, -2], "name": "Refined grains", "order": 1, "id": "grains" },
                { "intakes": [-2, -2, -2, -2, -2, -2], "name": "Sweets", "order": 2, "id": "sweets" }
            ]
        }],
    dayRef: "",
};

const getters = {
    // getCategoryNames: state => getters => {
    //     let categoryNameList = {};
    //     state.categories.forEach((category) => {
    //         let foodObject = {};
    //         category.foods.forEach((food) => {
    //             foodObject[food.id] = 0;
    //         });
    //         categoryNameList[category.id] = foodObject;
    //     })
    //     return categoryNameList;
    // }
};

const actions = {

};

const mutations = {
    setSelectedDay(state, data) {
        state.currentDate = data.date;
        state.dayRef = db
            .collection(`users/${data.uid}/days`)
            .doc(
                state.currentDate
                    .format("YYYYMMDD")
                    .toString()
            );


        state.dayRef.get().then(doc => {
            if (doc.exists) {
                state.currentDayTotal = doc.data().score;
                state.dayRef.collection('foods').get().then((foods) => {
                    if (foods.size > 0) {
                        let foodObject = {};
                        foods.forEach(food => {
                            foodObject[food.id] = food.data();
                        });
                        state.currentDayData = foodObject;
                    } else {
                        state.currentDayData = {};
                    }
                })
            } else {
                state.currentDayTotal = 0;
                state.currentDayData = {};
            }
        })
    },
    setLastWeek(state, data) {
        const dates = moment.range(moment().add(-6, "days"), moment());
        let array = [];
        for (let day of dates.by('day')) {
            array.push(day.format('YYYYMMDD'));
            db.collection(`users/${data.uid}/days`).doc(day.format('YYYYMMDD')).onSnapshot(doc => {
                if (doc.exists) {
                    state.currentWeekTotal.splice(array.indexOf(day.format('YYYYMMDD')), 1, doc.data().score);
                }
            });
        }
    },

    cleanSelectedDate(state) {
        state.currentDate = "";
        state.currentDayData = {};
        state.currentDayTotal = 0;
        state.dayRef = "";
        state.currentWeekTotal = [0, 0, 0, 0, 0, 0, 0]
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}