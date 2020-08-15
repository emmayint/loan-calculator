export const updateUserInput = userInput => ({
    type: "UPDATE_USERINPUT",
    userInput //userInput: userInput
});

export const updatePrincipalInput = principalInput => ({
    type: "UPDATE_PRINCIPAL_INPUT",
    principalInput
});

export const updateInterestInput = interestInput => ({
    type: "UPDATE_INTEREST_INPUT",
    interestInput
});

export const updateDurationInput = durationInput => ({
    type: "UPDATE_DURATION_INPUT",
    durationInput
});
