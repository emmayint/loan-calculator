//initialize initial state for Reducer
const INITIAL_STATE = {
    userInput: "",
    quotes: [
        {
            principalInput: 23,
            interestInput: 42,
            durationInput: 4
          }
    ]
}

//declare userInputReducer
const userInputReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "UPDATE_USERINPUT":
            return{
                //create copy of current state and update userInput value
                ...state,
                userInput: action.userInput
            }

        case "SUBMIT_USER_INPUTS":
            return{
                //create copy of current state and update userInput value
                ...state,
                    quotes: [...state.quotes, action.formValues]
                }
   
        default:
            return state
    }
};

//export userInputReducer
export default userInputReducer