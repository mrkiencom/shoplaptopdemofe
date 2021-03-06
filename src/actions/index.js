import callAPI from '../callAPI/callAPI';
import * as Types from './../constants/ActionType';

export const showProducts = (products) => {
  return {
    type: Types.SHOW_PRODUCTS,
    products
  }
}

export const dataProductAPI = () => {
  return dispatch => {
    callAPI.callAPI('products', 'GET', null, null).then(res => {
      dispatch(showProducts(res.data['data']))
    }).catch(err => {
    })
  }
}