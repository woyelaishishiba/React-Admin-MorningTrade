import { connect } from 'react-redux'
import Food from './Food'
import { 
    updateComments,
    getAllComments
 } from '../../actions/FoodActions'

const mapStateToProps = (state, ownProps) => {
    const { FoodReducer } = state;
    return Object.assign({}, FoodReducer);
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        submitMyComments: (values) => dispatch(updateComments(values)),
        getAllComments: () => dispatch(getAllComments())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Food);