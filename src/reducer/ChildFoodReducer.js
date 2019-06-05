const InitState = {
    foodInfo: null,
    locked: false,
}

const ChildFoodReducer = (state = InitState, action) => {
    const { type } = action;
    switch (type) {
        case "GET_CHILD_INFO_START":
            return Object.assign({}, state, {
                foodInfo: null,
                locked: true,
            });

        case "GET_CHILD_INFO_SUCCESS":
            return Object.assign({}, state, {
                foodInfo: action.foodInfo,
                locked: false,
            });

        case "EDIT_CHILD_INFO_START":
            return Object.assign({}, state, {
                locked: true,
            });

        case "EDIT_CHILD_INFO_SUCCESS":
            return Object.assign({}, state, {
                locked: false,
            });

        case "DELETE_CHILD_MENU_START":
            return Object.assign({}, state, {
                locked: true,
            });

        case "DELETE_CHILD_MENU_SUCCESS":
            return Object.assign({}, state, {
                locked: false,
            });
            
        default:
            return state;
    }

}

export default ChildFoodReducer;
