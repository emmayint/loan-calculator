import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as inputActions from './actions/userInputAction';
 

const ReduxStateExample = ({dispatch, userInput, quotes}) => {
  // set up local state with useState hook
  // const [ userInput, setUserInput ] = useState("");
  const [ principalInput, setPrincipalInput] = useState("");
  const [ interestInput, setInterestInput ] = useState("");
  const [ durationInput, setDurationInput ] = useState("");
  const [ displayFormError, setDisplayFormError ] = useState(false);
  const [ userQuotes, setUserQuotes ] = useState([])

  useEffect(() => {
    setUserQuotes(quotes)
  }, [quotes]);

  function handleFormSubmit() {
    setDisplayFormError(false);
    if(principalInput && interestInput && durationInput ){
      let formValues = {
        principalInput: principalInput,
        interestInput: interestInput,
        durationInput: durationInput
      }
      dispatch(inputActions.submitUserInputs(formValues));
      setPrincipalInput("");
      setInterestInput("");
      setDurationInput("");
    } else {
      setDisplayFormError(true);
    }
  }

  return (
      <div className="content-container">
          <div className="content">
          <h4>Quick example using redux to create a centralized source of truth</h4>
             <p>This component dispatches actions to update the userInput value in the redux store. React-redux's connect method and the mapStateToProps function defined in this component are used to read from the redux store. Input text below and see the "User Input" value update.</p>
             <div className="form-inputs">
               <div>
                 <p>Principal Input: {principalInput}</p>
                 <p>Principal: <input type="number" className="input-field" onChange={e => setPrincipalInput(e.target.value)} value={principalInput}/></p>
               </div>
               <div>
                 <p>Interest Input: {interestInput}</p>
                 <p>Interest Rate: <input type="number" className="input-field" list="interestRates" placeholder="3.5" onChange={e => setInterestInput (e.target.value)} value={interestInput}/></p>
                 <datalist id="interestRates">
                   <option value="3.0"></option>
                   <option value="3.25"></option>
                   <option value="3.5"></option>
                   <option value="3.75"></option>
                   <option value="4.0"></option>
                   <option value="4.25"></option>
                   <option value="4.5"></option>
                   <option value="4.75"></option>
                 </datalist>
               </div>
               <div>
                <p>Principal Input: {principalInput}</p>
                <p>Duration (in years): <input type="number" className="input-field" list="loanDuration" onChange={e => setDurationInput(e.target.value)} value={durationInput}/></p>
                 <datalist id="loanDuration">
                   <option value="10"></option>
                   <option value="15"></option>
                   <option value="20"></option>
                   <option value="30"></option>
                 </datalist>
               </div>
              </div>
              {displayFormError? (
               <p className="input-error">Please enter a value for all fields</p>
             ) : (
               ""
             )}
             <button className="form-submit" onClick={handleFormSubmit}>
             {/* <button onClick={dispatch(inputActions.submitUserInputs(principalInput, interestInput, durationInput))}> */}
               Submit
             </button>

             {userQuotes? (
               <div className="content-centeredform-results">
                 <table className="results-table">
                   <tr>
                     <th>Amount</th>
                     <th>Interest Rate</th>
                     <th>Number of Years</th>
                     <th>Monthly Payment</th>
                   </tr>
                   { userQuotes.map((currentQuote) => {
                     return(
                       <tr>
                         <td>{currentQuote.principalInput}</td>
                         <td>{currentQuote.interestInput}</td>
                         <td>{currentQuote.durationInput}</td>
                       </tr>
                     );
                   })}
                 </table>
              </div>
              ) : (
                <span></span>
              )}
          </div>
      </div>
  )
}

//map redux state to component
const mapStateToProps = state => {
  return({
      userInput: state.userInputReducer.userInput,
      quotes: state.userInputReducer.quotes
  })
}

export default connect(mapStateToProps)(ReduxStateExample);
