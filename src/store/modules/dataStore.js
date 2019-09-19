import db from "../../firestore";
import moment from "moment";

const state = {
    currentDate: "",
    currentDayData: {},
    currentDayTotal: 0,
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
    setSelectedDay(state, uid, date = moment()) {
        state.currentDate = date;
        state.dayRef = db
            .collection("users")
            .doc(uid)
            .collection("days")
            .doc(
                state.currentDate
                    .format("YYYYMMDD")
                    .toString()
            );


        state.dayRef.get().then(doc => {
            if (doc.exists) {
                state.currentDayTotal = doc.data().score;
            }
        })

        db.collectionGroup('foods').get().then((foods) => {
            if (foods.size > 0) {
                let foodObject = {};
                foods.forEach(food => {
                    foodObject[food.id] = food.data();
                });
                state.currentDayData = foodObject;
            }
        })
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}