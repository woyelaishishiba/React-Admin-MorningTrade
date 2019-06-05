import fakeData from '../pages/Punch/fakelist.json'


let myFakeData = fakeData;

export const testAdd = () => {

    return {
        type: "ADD"
    }

}

export const addMessageNum = (messageNum) => {
    return {
        type: "ADDNUM",
        number: messageNum
    }
}

export const resetMessageNum = () => {
    return {
        type: "RESET",
    }
}

export const fetchFakeData = () => {
    return async (dispatch, getState) => {
        dispatch(fetchStart())
        setTimeout(()=>{dispatch(fetchSuccess())},10)
    }
}

const fetchStart = () => {
    return {
        type: "GET_FAKEDATA_START",
    }
}

const fetchSuccess = () => {
    const list = myFakeData;
    return {
        type: "GET_FAKEDATA_SUCCESS",
        fakelist: list,
    }
}

export const updateGoodsNum = (number, newGoods) => {
    let list = fakeData;
    const newlist = list.map((item) => {
        if(item.number === number){
            item.goodNumber = newGoods;
        }
        return item;
    })
    myFakeData = newlist;
    return {
        type: "ADD_GOODSNUM_SUCCESS",
        fakelist: newlist,
    }
}