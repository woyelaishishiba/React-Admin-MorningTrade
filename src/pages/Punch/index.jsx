import { connect } from 'react-redux'
import punch from './punch'
import { testAdd,
    addMessageNum,
    resetMessageNum,
    fetchFakeData,
    updateGoodsNum,
 } from '../../actions/TestActions'

const mapStateToProps = (state, ownProps) => {
    const { TestReducer } = state;
    return Object.assign({}, TestReducer);
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toAdd: () => dispatch(testAdd()),
        addMessageNum: (messageNum) => dispatch(addMessageNum(messageNum)),
        resetMessageNum: () => dispatch(resetMessageNum()),
        getFakeData: () => dispatch(fetchFakeData()),
        updateGoods: (number, nowGoods) => dispatch(updateGoodsNum(number, nowGoods))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(punch);