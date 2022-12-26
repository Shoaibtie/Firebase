/* eslint-disable prettier/prettier */
/* eslint-disable no-unreachable */
/* eslint-disable prettier/prettier */
const INITIAL_STATE = {
  isLoggedIn: false,
  isLoading: false,
    stateData: {},
  };

  export default function product(state = INITIAL_STATE, action) {
  // console.log('customerfilterData=====>', action);
    switch (action.type) {
          case 'PRODUCT_FILTER':
            return {
              ...state,
              isLoading: false,
              productfilter:action.productfilter,
            };
            break;
            case 'SEARCH_PRODUCT':
              return {
                ...state,
                isLoading: false,
                searchproduct:action.searchproduct,
              };
              break;
              case 'ORDER_CANCEL':
              return {
                ...state,
                isLoading: false,
                cancelorder:action.cancelorder,
              };
              break;
              case 'ORDER_ITEM_CANCEL':
              return {
                ...state,
                isLoading: false,
                cancelitemorder:action.cancelitemorder,
              };
              break;
              case 'CUSTOMER_DIRECT_FILTER':
                return {
                  ...state,
                  isLoading: false,
                  customerdirectfilter:action.customerdirectfilter,
                };
                break;
                case 'ADD_TO_CART':
                  return {
                    ...state,
                    isLoading: false,
                    addtocart:action.addtocart,
                  };
                  break;
                  case 'GET_ADD_TO_CART':
                  return {
                    ...state,
                    isLoading: false,
                    getaddtocart:action.getaddtocart,
                  };
                  break;
                  case 'DELETE_CART_ITEM':
                  return {
                    ...state,
                    isLoading: false,
                    deletecartitem:action.deletecartitem,
                  };
                  break;
                  case 'NOTIFICATION_GET':
                    return {
                      ...state,
                      isLoading: false,
                      notificationget:action.notificationget,
                    };
                    break;
                    case 'UNREAD_NOTIFICATION':
                      return {
                        ...state,
                        isLoading: false,
                        unreadnotification:action.unreadnotification,
                      };
                      break;
      default:
        return state;
    }
  }
  