import { connect } from 'react-redux'
import FoodTrade from './FoodTrade'
import { 
    getAllTrade,
    changeTriggerReady,
    changeTriggerFinished,
 } from '../../actions/FoodTradeActions'

const mapStateToProps = (state, ownProps) => {
    const { FoodTradeReducer } = state;
    return Object.assign({}, FoodTradeReducer);
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // submitMyComments: (values) => dispatch(updateComments(values)),
        getAllFoodInfoList: () => dispatch(getAllTrade()),
        changeTriggerReady: (id, isReady) => dispatch(changeTriggerReady(id, isReady)),
        changeTriggerFinished: (id, isFinished) => dispatch(changeTriggerFinished(id, isFinished))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodTrade);