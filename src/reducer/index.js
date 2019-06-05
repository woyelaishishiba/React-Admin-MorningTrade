import TestReducer from './TestReducer';
import FoodReducer from './FoodReducer';
import FoodTradeReducer from './FoodTradeReducer';
import AllFoodReducer from './AllFoodReducer';
import ChildFoodReducer from './ChildFoodReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    TestReducer: TestReducer,
    FoodReducer: FoodReducer,
    FoodTradeReducer: FoodTradeReducer,
    AllFoodReducer: AllFoodReducer,
    ChildFoodReducer: ChildFoodReducer,
});


export default rootReducer;