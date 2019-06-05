

const InitState = {
    foodInfoList: [],
    lock: false,
}

const FoodTradeReducer = (state = InitState, action) => {
    const { type } = action;
    switch (type) {
        case "GET_ALL_FOODINFO_START":
            return Object.assign({}, state, {
                foodInfoList: [],
                lock: true,
            });

        case "GET_ALL_FOODINFO_SUCCESS":
            return Object.assign({}, state, {
                foodInfoList: action.list,
                lock: false,
            });

        case "TRIGGER_START":
            return Object.assign({}, state, {
                lock: true,
            });

        case "TRIGGER_SUCCESS":
            return Object.assign({}, state, {
                lock: false,
            });

        default:
            return state;
    }

}

export default FoodTradeReducer;