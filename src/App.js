import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as inputActions from './actions/userInputAction';
 

const ReduxStateExample = ({dispatch, userInput, quotes}) => {
  // set up local state with useState hook
  // const [ userInput, setUserInput ] = useState("");
  const [ principalInput, setPrincipalInput] = useState("");
  const [ interestInput, setInterestInput ] = useState("3.5");
  const [ durationInput, setDurationInput ] = useState("");
  const [ payment, setPayment] = useState("1");
  const [ displayFormError, setDisplayFormError ] = useState(false);
  const [ userQuotes, setUserQuotes ] = useState([]);
  const [ amortTable, setAmortTable] = useState("");

  useEffect(() => {
    setUserQuotes(quotes);
    calculateMonthly(quotes)
  }, [quotes]);

  function calculateMonthly(currentQuote){
    let c = currentQuote.interestInput/100/12;
    let n = 12*currentQuote.durationInput;
    let p = currentQuote.principalInput;
    setPayment((p * (c* Math.pow((1+c), n)) / (Math.pow((1+c), n)-1)).toFixed(2))
    console.log("calculating monthly");
  }

  function amort(balance, interestRate, terms){
    //Calculate the per month interest rate
    var monthlyRate = interestRate/12;
	
	//Calculate the payment
    var payment = balance * (monthlyRate/(1-Math.pow(
        1+monthlyRate, -terms)));
	    
	//begin building the return string for the display of the amort table
    var result = "<br /> Amortation: <br /> Loan amount: $" + (balance*1.0).toFixed(2) +  "<br />" + 
        "Interest rate: " + (interestRate*100).toFixed(2) +  "%<br />" +
        "Number of months: " + terms + "<br />" +
        "Monthly payment: $" + payment.toFixed(2) + "<br />" +
        "Total paid: $" + (payment * terms).toFixed(2) + "<br /><br />";
        
    //add header row for table to return string
	result += "<table border='1'><tr><th>Month #</th><th>Balance</th>" + 
        "<th>Interest</th><th>Principal</th>";
    
    /**
     * Loop that calculates the monthly Loan amortization amounts then adds 
     * them to the return string 
     */
	for (var count = 0; count < terms; ++count)
	{ 
		//in-loop interest amount holder
		var interest = 0;
		
		//in-loop monthly principal amount holder
		var monthlyPrincipal = 0;
		
		//start a new table row on each loop iteration
		result += "<tr align=center>";
		
		//display the month number in col 1 using the loop count variable
		result += "<td>" + (count + 1) + "</td>";
		
		
		//code for displaying in loop balance
		result += "<td> $" + (balance*1.0).toFixed(2) + "</td>";
		
		//calc the in-loop interest amount and display
		interest = balance * monthlyRate;
		result += "<td> $" + interest.toFixed(2) + "</td>";
		
		//calc the in-loop monthly principal and display
		monthlyPrincipal = payment - interest;
		result += "<td> $" + monthlyPrincipal.toFixed(2) + "</td>";
		
		//end the table row on each iteration of the loop	
		result += "</tr>";
		
		//update the balance for each loop iteration
		balance = balance - monthlyPrincipal;		
	}
	
	//Final piece added to return string before returning it - closes the table
    result += "</table>";
	
	//returns the concatenated string to the page
    return {__html: result};
}


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
      setInterestInput("3.5");
      setDurationInput("");
    } else {
      setDisplayFormError(true);
    }
  }

  return (
      <div className="content-container">
          <div className="content">
          <h1>Loan Calculator</h1>
             <p>Fill out the field below to calculate monthly loan payments.</p>
             {displayFormError? (
               <p className="input-error">Please enter a valid value for all fields</p>
             ) : (
               ""
             )}
             <div className="form">
               <div className="form-input">
                 <label for="principal">Amount($)</label>
                 <p><input id="principal" type="number" className="input-field" onChange={e => setPrincipalInput(e.target.value)} value={principalInput}/></p>
               </div>
               <div className="form-input">
                 <label for="interest">Interest Rate(%)</label>
                 <p><input id="interest" type="number" className="input-field" list="interestRates" onChange={e => setInterestInput (e.target.value)} value={interestInput}/></p>
                 <datalist id="interestRates">
                   <option value="3.5"></option>
                 </datalist>
               </div>
               <div className="form-input">
                 <label for="duration">Duration (years)</label>
                 <p><input id="duration" type="number" className="input-field" list="loanDuration" onChange={e => setDurationInput(e.target.value)} value={durationInput}/></p>
                 <datalist id="loanDuration">
                   <option value="10"></option>
                   <option value="15"></option>
                   <option value="20"></option>
                   <option value="30"></option>
                 </datalist>
               </div>
              </div>
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
                   <tr>
                    <td>{quotes.principalInput}</td>
                    <td>{quotes.interestInput}</td>
                    <td>{quotes.durationInput}</td>
                    <td>{payment}</td>
                   </tr>
                 </table>
                 {quotes.principalInput?(
                   <div dangerouslySetInnerHTML={amort(quotes.principalInput, quotes.interestInput/100, quotes.durationInput*12)}></div>
                 ) : (
                  <span></span>
                 )}
                  
                {/* <div dangerouslySetInnerHTML={amortTable}></div> */}
                {/* <div>{amortTable}</div> */}
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
