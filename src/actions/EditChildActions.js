import axios from 'axios';
import { myUrl } from './urlConfig';

export const getChildInfo = (id) => {
    return async dispatch => {
        dispatch(getChildInfoStart())
        //刷新添加页面
        await new Promise(resolve => setTimeout(resolve, 100));
        if (id !== "0") {
            try {
                const result = await axios.get(myUrl + '/restaurant/menu/childmenu?id=' + id)
                dispatch(getChildInfoSuccess(result))
            } catch (err) {
                console.log(err)
            }
        } else {
            //刷新添加页面
            // await new Promise(resolve => setTimeout(resolve, 100));
            dispatch({
                type: "GET_CHILD_INFO_SUCCESS",
                foodInfo: {
                    rating: 2.5,
                    id: "0",
                    foodName: "",
                    picUrl: "",
                    isShown: true,
                    price: 0
                },
            })
        }
    }
}

export const editChildInfo = (payload, history) => {
    return async dispatch => {
        dispatch(editChildInfoStart())
        try {
            const result = await axios.post(myUrl + '/restaurant/menu/updatechildmenu', payload)
            dispatch(editChildInfoSuccess(result))
        } catch (err) {
            console.log(err)
        }
        history.push('/choosehome/allfoodlist')
    }
}

export const insertChildInfo = (payload, history) => {
    return async dispatch => {
        dispatch(editChildInfoStart())
        try {
            const result = await axios.post(myUrl +  '/restaurant/menu/insertchildmenu', payload)
            dispatch(editChildInfoSuccess(result))
        } catch (err) {
            console.log(err)
        }
        history.push('/choosehome/allfoodlist')
    }
}

export const deleteChindMenu = (id, history) => {
    return async dispatch => {
        dispatch(deleteChildMenuStart())
        try {
            const result = await axios.get(myUrl + '/restaurant/menu/deletechildmenu?id=' + id)
            dispatch(deleteChildMenuSuccess(result))
        } catch (err) {
            console.log(err)
        }
        history.push('/choosehome/allfoodlist')
    }
}

const getChildInfoStart = () => {
    return {
        type: "GET_CHILD_INFO_START",
    }
}

const getChildInfoSuccess = (res) => {
    return {
        type: "GET_CHILD_INFO_SUCCESS",
        foodInfo: res.data,
    }
}

const editChildInfoStart = () => {
    return {
        type: "EDIT_CHILD_INFO_START",
    }
}

const editChildInfoSuccess = (result) => {
    console.log(result.data)
    return {
        type: "EDIT_CHILD_INFO_SUCCESS",
    }
}

const deleteChildMenuStart = () => {
    return {
        type: "DELETE_CHILD_MENU_START",
    }
}

const deleteChildMenuSuccess = (result) => {
    console.log(result.data)
    return {
        type: "DELETE_CHILD_MENU_SUCCESS",
    }
}
