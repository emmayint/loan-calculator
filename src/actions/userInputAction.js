export const updateUserInput = userInput => ({
    type: "UPDATE_USERINPUT",
    userInput //userInput: userInput
});

export const submitUserInputs = (formValues) => ({
    type: "SUBMIT_USER_INPUTS",
    formValues
})