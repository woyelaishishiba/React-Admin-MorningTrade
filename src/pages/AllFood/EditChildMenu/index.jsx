import { connect } from 'react-redux'
import EditChildMenu from './EditChildMenu'
import { 
    getChildInfo,
    editChildInfo,
    deleteChindMenu,
    insertChildInfo,
 } from '../../../actions/EditChildActions'

const mapStateToProps = (state, ownProps) => {
    const { ChildFoodReducer } = state;
    return Object.assign({}, ChildFoodReducer);
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getChildInfo: (id) => dispatch(getChildInfo(id)),
        editChildInfo: (payload, history) => dispatch(editChildInfo(payload, history)),
        deleteChindMenu: (id, history) => dispatch(deleteChindMenu(id, history)),
        insertChildInfo: (payload, history) => dispatch(insertChildInfo(payload, history)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditChildMenu);