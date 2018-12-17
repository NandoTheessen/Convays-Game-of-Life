function Reducer(state, action) {
  switch (action.type) {
    case 'NEXT_GEN':
      return {
        ...state,
        currentGen: action.payload,
        gen: (state.gen += 1)
      };
    case 'CLEAR_GRID':
      return {
        ...state,
        currentGen: action.payload,
        gen: 0
      };
    case 'RANDOMIZE':
      return {
        ...state,
        currentGen: action.payload,
        gen: 1
      };
    case 'START':
      return {
        ...state,
        running: true
      };
    case 'STOP':
      return {
        ...state,
        running: false
      };
    default:
      break;
  }
}

export default Reducer;
