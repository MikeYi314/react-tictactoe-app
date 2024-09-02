import React, { Component } from 'react'
import './ExpenseList.css';
import ExpenseItem from './ExpenseItem'
import { MdDelete } from 'react-icons/md';


export class ExpenseList extends Component {
  render() {
    console.log(this.props.expenses)
    return (
      <>
        <ul className='list'>
          {this.props.expenses.map(expenses => {
            return (
              <ExpenseItem 
                expenses={expenses}
                key={expenses.id}
                handleDelete={this.props.handleDelete}
              />
            )
          })}
        </ul>
        <button className='btn'>
          목록 지우기
          <MdDelete className='btn-icon'/>
        </button>
      </> 
    )
  }
}

export default ExpenseList