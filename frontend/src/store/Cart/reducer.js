import { ADD_ITEM, CLEAR_CART, UPDATE_ITEM } from "./actions";

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      if (state.items.find((item) => item._id === action.payload._id)) {
        return {
          items: state.items.map((item) => {
            if (item._id === action.payload._id) {
              item.count = item.count + 1;
            }
            return item;
          }),
        };
      }

      return {
        items: [...state.items, { ...action.payload, count: 1 }],
      };

    case UPDATE_ITEM:
      if (action.payload.count <= 0) {
        return { items: state.items.filter((item) => item._id !== action.payload._id) };
      }
      return {
        items: state.items.map((item) => {
          if (item._id === action.payload._id) {
            item.count = action.payload.count;
            if (item.movieId !== undefined) {
              item.seatNumbers = action.payload.seatNumbers;
            }
          }
          return item;
        }),
      };

    case CLEAR_CART:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default cartReducer;
