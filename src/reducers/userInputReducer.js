//initialize initial state for Reducer
const INITIAL_STATE = {
    quotes: ""
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
                    quotes: action.formValues
                }
   
        default:
            return state
    }
};

//export userInputReducer
export default userInputReducer