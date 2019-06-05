

const InitState = {
    num: 0,
    fakeData: []
}

const TestReducer = (state = InitState, action) => {
    const { type } = action;
    switch(type){
        case "ADD":
            return Object.assign({},state,{
                num: state.num + 1,
            });

        case "ADDNUM":
            let nowNum = state.num
            return Object.assign({},state,{
                num: nowNum + action.number ,
            });

        case "RESET":
            return Object.assign({},state,{
                num: 0
            });

        case "GET_FAKEDATA_START":
            return Object.assign({},state,{
                fakeData: [],
            });
    
        case "GET_FAKEDATA_SUCCESS":
            return Object.assign({},state,{
                fakeData: action.fakelist,
            });

        case "ADD_GOODSNUM_SUCCESS":
            return Object.assign({},state,{
                fakeData: action.fakelist,
            });
        
        default:
            return state;
    }

}

export default TestReducer;