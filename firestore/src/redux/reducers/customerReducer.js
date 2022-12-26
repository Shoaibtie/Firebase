/* eslint-disable prettier/prettier */
/* eslint-disable no-unreachable */
/* eslint-disable prettier/prettier */
const INITIAL_STATE = {
    stateData: {},
  };

  export default function customer(state = INITIAL_STATE, action) {
  // console.log('customerfilterData=====>', action);
    switch (action.type) {
          case 'STATE_LIST':
            return {
              ...state,
              stateData:action.stateData,
            };
            break;
            case 'CUSTOMER_FILTER':
            return {
              ...state,
              customerfilterData:action.customerfilterData,
            };
            break;
      default:
        return state;
    }
  }
  