import { connect } from 'react-redux'
import AllFood from './AllFood'
import { 
    getAllAdminFood,
    updateRootMenuInfo,
    insertRootMenuInfo,
    deleteRootMenuInfo,
 } from '../../actions/AllFoodActions'

const mapStateToProps = (state, ownProps) => {
    const { AllFoodReducer } = state;
    return Object.assign({}, AllFoodReducer);
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getAllAdminFood: () => dispatch(getAllAdminFood()),
        editRootMenuInfo: (id, typeName) => dispatch(updateRootMenuInfo(id, typeName)),
        insertMenuInfo: (typeName) => dispatch(insertRootMenuInfo(typeName)),
        deleteMenuInfo: (id) => dispatch(deleteRootMenuInfo(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllFood);