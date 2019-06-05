import axios from 'axios';
import { myUrl } from './urlConfig';

export const getAllAdminFood = () => {
    return async dispatch => {
        dispatch(getAllStart())
        try {
            const result = await axios.get(myUrl + '/restaurant/menu');
            // const result = await axios.get('https://www.easy-mock.com/mock/5cdccd6645a4a610b39976ab/example/restaurant/menu');
            dispatch(getAllSuccess(result))
        } catch (err) {
            console.log(err)
        }
    }
}

export const updateRootMenuInfo = (id, typeName) => {
    return async dispatch => {
        dispatch(updateRootMenuStart())
        const payload = {
            "id": id,
            "typeName": typeName
        }
        try {
            const result = await axios.post(myUrl + '/restaurant/updaterootmenu', payload);
            dispatch(updateRootMenuSuccess(result))
        } catch (err) {
            console.log(err)
        }
        dispatch(getAllAdminFood())
    }
}

export const insertRootMenuInfo = (typeName) => {
    return async dispatch => {
        dispatch(updateRootMenuStart())
        const payload = {
            "typeName": typeName
        }
        try {
            const result = await axios.post(myUrl + '/restaurant/insertrootmenu', payload);
            dispatch(updateRootMenuSuccess(result))
        } catch (err) {
            console.log(err)
        }
        dispatch(getAllAdminFood())
    }
}

export const deleteRootMenuInfo = (id) => {
    return async dispatch => {
        dispatch(updateRootMenuStart())
        try {
            const result = await axios.get(myUrl + '/restaurant/deleterootmenu?id=' + id);
            dispatch(updateRootMenuSuccess(result))
        } catch (err) {
            console.log(err)
        }
        dispatch(getAllAdminFood())
    }

}

const getAllStart = () => {
    return {
        type: "GET_ADMIN_ALL_FOOD_START",
    }
}

const getAllSuccess = (res) => {
    const convert = res.data.map(item => {
        return {
            "id": item.id,
            "count": item.menuContent.length,
            "typeName": item.typeName,
            "isShown": true,
            "menuContent": item.menuContent
        }
    })
    return {
        type: "GET_ADMIN_ALL_FOODINFO_SUCCESS",
        list: convert,
    }
}


const updateRootMenuStart = () => {
    return {
        type: "UPDATE_ROOT_MENU_START",
    }
}

const updateRootMenuSuccess = (result) => {
    console.log(result.data)
    return {
        type: "UPDATE_ROOT_MENU_SUCCESS",
    }
}

