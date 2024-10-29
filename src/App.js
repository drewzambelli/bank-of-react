/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 0.00, //cleared out dummy value provided with assignment
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }
  //Get Data for assignment from assignment links
  async componentDidMount() {
    try {
      // Fetch credits and debits data
      const creditsResponse = await fetch('https://johnnylaicode.github.io/api/credits.json');
      const debitsResponse = await fetch('https://johnnylaicode.github.io/api/debits.json');
      const creditsData = await creditsResponse.json();
      const debitsData = await debitsResponse.json();

      // Calc intital balance using accumulator and api data from professor
      const totalCredits = creditsData.reduce((acc, credit) => acc + credit.amount, 0);
      const totalDebits = debitsData.reduce((acc, debit) => acc + debit.amount, 0);
      const accountBalance = totalCredits - totalDebits; //this is the value I must pass to setState

      // Update page with professor's data
      this.setState({ creditList: creditsData, debitList: debitsData, accountBalance });
    } catch (error) { //if fetch fails, need to notify user - DZ this seems to solve spotty internet connection issue
      console.error("Error fetching credits or debits data:", error);
    }
  }

    // DZ added function - 10.28.24 credit array
    addCredit = (newCredit) => {
      this.setState((prevState) => ({
        creditList: [...prevState.creditList, newCredit],
        accountBalance: prevState.accountBalance + newCredit.amount
      }));
    }
  
    // DZ added function - 10.28.24 debit array
    addDebit = (newDebit) => {
      this.setState((prevState) => ({
        debitList: [...prevState.debitList, newDebit],
        accountBalance: prevState.accountBalance - newDebit.amount
      }));
    }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} addCredit={this.addCredit}/>) //added my Credit function
    const DebitsComponent = () => (<Debits debits={this.state.debitList} addDebit={this.addDebit}/>) //added my Debit function

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/bank-of-react">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;