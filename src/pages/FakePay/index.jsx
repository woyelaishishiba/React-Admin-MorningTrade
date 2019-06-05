import { connect } from 'react-redux'
import FakePay from './FakePay'

const mapStateToProps = (state, ownProps) => {
    const { TestReducer } = state;
    return Object.assign({}, TestReducer);
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FakePay);