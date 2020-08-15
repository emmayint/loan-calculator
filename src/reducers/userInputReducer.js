//initialize initial state for Reducer
const INITIAL_STATE = {
    userInput: "",
    principalInput: "",
    interestInput: "",
    durationInput: ""
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

        case "UPDATE_PRINCIPAL_INPUT":
            return{
                //create copy of current state and update userInput value
                ...state,
                principalInput: action.principalInput
            }

        case "UPDATE_INTEREST_INPUT":
            return{
                //create copy of current state and update userInput value
                ...state,
                interestInput: action.interestInput
            }

        case "UPDATE_DURATION_INPUT":
            return{
                //create copy of current state and update userInput value
                ...state,
                durationInput: action.durationInput
            }

        default:
            return state
    }
};

//export userInputReducer
export default userInputReducer