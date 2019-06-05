const InitState = {
    foodAdminList: [],
    lock: false,
}

const AllFoodReducer = (state = InitState, action) => {
    const { type } = action;
    switch (type) {
        case "GET_ADMIN_ALL_FOODINFO_START":
            return Object.assign({}, state, {
                foodAdminList: [],
                lock: true,
            });

        case "GET_ADMIN_ALL_FOODINFO_SUCCESS":
            return Object.assign({}, state, {
                foodAdminList: action.list,
                lock: false,
            });

        case "UPDATE_ROOT_MENU_START":
            return Object.assign({}, state, {
                lock: true,
            })

        case "UPDATE_ROOT_MENU_SUCCESS":
            return Object.assign({}, state, {
                lock: false,
            });

        default:
            return state;
    }

}

export default AllFoodReducer;
