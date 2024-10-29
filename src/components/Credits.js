/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import React, { useState } from 'react';
import '../CSS/credits.css' //my stylings for the page

const Credits = (props) => {
  const [description, setDescription] = useState(''); //init my state strings
  const [amount, setAmount] = useState(''); //init my state strings

  //Create list of Credit items - adapted from Debit starter code
  let creditsView = () => {
    const { credits } = props;
    return credits.map((credit) => {
      let date = credit.date.slice(0, 10);
      return <li key={credit.id}> ${credit.amount} ** <strong>{credit.description}</strong> ** {date}</li>
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); //NEED THIS! Stops strange 'page refresh' from occuring which deleted user entry
    const newCredit = {
      amount: parseFloat(amount),
      description,
      date: new Date().toISOString()
    };
    props.addCredit(newCredit);  // Pass the new credit object up to App.js
    setDescription('');
    setAmount('');
  };

  return (
    <div className = 'credits'> {/*css container*/}
      <h1>Credits</h1>

      {creditsView()}
      {/*Drew! Do not mess with the handleSubmit here. This is what was causing your problems! */}
      <form onSubmit={handleSubmit}> 
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)} //this is my listener for user action
          placeholder="Description"
          required
        />
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)} //this is my listener for user action
          placeholder="Amount"
          required
        />
        <button type="submit">Add Credit</button>
      </form>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits;

