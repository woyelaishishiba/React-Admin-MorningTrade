import axios from 'axios';
import moment from "moment";
import { myUrl } from './urlConfig';

export const getAllTrade = () => {

    return async dispatch => {
        dispatch(getAllStart())
        try {
            const result = await axios.get(myUrl + '/getFoodInfoList');
            dispatch(getAllSuccess(result))
        } catch (err) {
            console.log(err)
        }
    }

}

export const changeTriggerReady = (id, isReady) => {
    return async dispatch => {
        dispatch(triggerStart())
        var url = myUrl + '/changeTriggerReady?id=' + id +
         "&isReady=" + isReady;
        try {
            const result = await axios.get(url);
            dispatch(triggerSuccess(result));
            dispatch(getAllTrade());
        } catch (err) {
            console.log(err)
            dispatch(getAllTrade());
        }
    }
}

export const changeTriggerFinished = (id, isFinished) => {
    return async dispatch => {
        dispatch(triggerStart())
        var url = myUrl + '/changeTriggerFinished?id=' + id +
         "&isFinished=" + isFinished;
        try {
            const result = await axios.get(url);
            dispatch(triggerSuccess(result));
            dispatch(getAllTrade());
        } catch (err) {
            console.log(err)
            dispatch(getAllTrade());
        }
    }
}

const triggerStart = () => {
    return {
        type: "TRIGGER_START",
    }
}

const triggerSuccess = () => {
    return {
        type: "TRIGGER_SUCCESS",
    }
}

const getAllStart = () => {
    return {
        type: "GET_ALL_FOODINFO_START",
    }
}

const getAllSuccess = (res) => {
    const newlist = res.data.map((item) => {
        const date = new Date(item.getTime);
        item.getTime = moment(date).format("YYYY-MM-DD HH:mm:ss")
        return item;
    })
    return {
        type: "GET_ALL_FOODINFO_SUCCESS",
        list: newlist,
    }
}
