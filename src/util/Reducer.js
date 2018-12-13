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
        gen: 0
      };
    case 'START':
      return {
        ...state,
        run: !state.run,
        currentGen: action.payload
      };
    case 'STOP':
      return {
        ...state,
        run: !state.run
      };
    default:
      break;
  }
}

export default Reducer;
