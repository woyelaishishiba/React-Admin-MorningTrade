

const InitState = {
    allComments: [],
}

const FoodReducer = (state = InitState, action) => {
    const { type } = action;
    switch(type){
        case "GET_ALL_COMMENTS":
            return Object.assign({},state,{
                allComments: action.allComments
            });

        case "UPDATE_COMMENTS":
            const newComments = state.allComments.concat(action.info)
            return Object.assign({},state,{
                allComments: newComments
            });

        default:
            return state;
    }

}

export default FoodReducer;