/*==================================================
src/components/AccountBalance.js

The AccountBalance component displays account balance. It is included in other page views.
==================================================*/
import React, {Component} from 'react';

class AccountBalance extends Component {
  // Display account balance
  render() {
    return (
      <div>
        <strong>Balance: $ {this.props.accountBalance.toFixed(2)}</strong>
      </div>
    );
  }
}

export default AccountBalance;