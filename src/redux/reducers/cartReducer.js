import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function cartReducer(state = initialState.cart, action) {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      var addedItem = state.find(
        // ürün daha önce sepete eklendiyse +1 olarak göstereceğim. O nedenle bu değikeni oluşturdum
        (c) => c.product.id === action.payload.product.id
      );
      if (addedItem) {
        var newState = state.map((cartItem) => {
          if (cartItem.product.id === action.payload.product.id) {
            return Object.assign({}, addedItem, {
              quantity: addedItem.quantity + 1,
            }); // sistemde olan addedItem'ın miktarını 1 arttırdım
          }
          return cartItem; // mapten cartItem'ı returnledim
        });
        return newState;
      } else {
        return [...state, { ...action.payload }]; // state'in kopyasına actionla gelen payloadı ekledim
      }
    case actionTypes.REMOVE_FROM_CART:
      const newState2 = state.filter(
        (cartItem) => cartItem.product.id !== action.payload.id
      );
      return newState2;
    default:
      return state;
  }
}
