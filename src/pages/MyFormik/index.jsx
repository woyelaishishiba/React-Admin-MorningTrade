import { connect } from 'react-redux'
import formikList from './formikList'
import { testAdd } from '../../actions/TestActions'

const mapStateToProps = (state, ownProps) => {
    const { TestReducer } = state;
    return Object.assign({}, TestReducer);
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toAdd: () => dispatch(testAdd())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(formikList);