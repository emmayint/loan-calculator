import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import * as inputActions from './actions/userInputAction';
// import { updateUserInput, updatePrincipalInput, updateInterestInput, updateDurationInput } from './actions/userInputAction';

const ReduxStateExample = ({dispatch, userInput, principalInput, interestInput, durationInput}) => {
  // set up local state with useState hook
  // const [ userInput, setUserInput ] = useState("");

  return (
      <div className="content-container">
          <div className="content">
              <div className="content-centered content-container">
                <h4>Quick prototype user inputs and display</h4>
                <p>This component dispatches actions to update the userInput value in the redux store. React-redux's connect method and the mapStateToProps function defined in this component are used to read from the redux store. Input text below and see the "User Input" value update.</p>
                <p>Input Text: <input className="input-field" onChange={e => dispatch(inputActions.updateUserInput(e.target.value))} value={userInput}/></p>
                <p>Principal: <input className="input-field" onChange={e => dispatch(inputActions.updatePrincipalInput(e.target.value))} value={principalInput}/></p>
                <p>Interest Rate: <input className="input-field" onChange={e => dispatch(inputActions.updateInterestInput(e.target.value))} value={interestInput}/></p>
                <p>Duration (in years): <input className="input-field" onChange={e => dispatch(inputActions.updateDurationInput(e.target.value))} value={durationInput}/></p>
              </div>
              <div className="content-centered content-container form-results">
                <p>User Input: {userInput}</p>
                <p>Principal Input: {principalInput}</p>
                <p>Interest Input: {interestInput}</p>
                <p>Duration Input: {durationInput}</p>
              </div>
          </div>
      </div>
  )
}

//map redux state to component
const mapStateToProps = state => {
  return({
      userInput: state.userInputReducer.userInput,
      principalInput: state.userInputReducer.principalInput,
      interestInput: state.userInputReducer.interestInput,
      durationInput: state.userInputReducer.durationInput
  })
}

export default connect(mapStateToProps)(ReduxStateExample);
