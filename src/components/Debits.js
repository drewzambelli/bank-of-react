/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import React, { useState } from 'react';
import '../CSS/debits.css' //my stylings for the page

const Debits = (props) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  // Create the list of Debit items
  let debitsView = () => {
    const { debits } = props;
    return debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date.slice(0,10);
      return <li key={debit.id}> ${debit.amount} ** <strong>{debit.description}</strong> ** {date}</li>
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault(); //NEED THIS! Stops strange 'page refresh' from occuring which deleted user entry
    const newDebit = {
      amount: parseFloat(amount),
      description,
      date: new Date().toISOString()
    };
    props.addDebit(newDebit);  // Pass the new debit object up to App.js
    setDescription('');
    setAmount('');
  };

  // Having a problem using toFixed so i needed to write
  //this function to stop user entering more than 2 decimal places
  const handleDecimals = (e) => {
    const value = e.target.value;
    // only allow at most 2 decimal places
    const testValue = /^\d*\.?\d{0,2}$/;

    // Validate and set amount if valid
    if (testValue.test(value) || value === '') {
      setAmount(value);
    }
  };

  // Render the list of Debit items and a form to input new Debit item
  return (
    <div className = 'debits'> {/*css container*/}
      <h1>Debits</h1>

      {debitsView()}

      <form onSubmit={handleSubmit}>
        
        <input type="text" 
        name="description" 
        value = {description} 
        onChange={(e) => setDescription(e.target.value)} //this is my listener for user action
        placeholder="Description"
        required />

        <input 
        type="number" 
        name="amount" 
        value = {amount}
        onChange = {handleDecimals} //{(e) => setAmount(e.target.value)} //this is my listener for user action
        placeholder="Amount"
        required/>

        <button type="submit">Add Debit</button>
      </form>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Debits;
