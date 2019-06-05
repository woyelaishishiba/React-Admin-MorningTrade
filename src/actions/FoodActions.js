import fakeEvaluation from '../pages/Food/fakeevaluation.json'

export const updateComments = (values) => {

    return {
        type: "UPDATE_COMMENTS",
        info: values
    }

}


export const getAllComments = () => {
    return {
        type: "GET_ALL_COMMENTS",
        allComments: fakeEvaluation,
    }
}
