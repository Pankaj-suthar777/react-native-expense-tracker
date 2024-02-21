import React from 'react';
import ExpensesOutput from '../components/ExpenceOutput/ExpensesOutput';
import {useSelector} from 'react-redux';

const AllExpense = () => {
  const {expenses} = useSelector(state => state.expenses);
  return (
    <ExpensesOutput
      expenses={expenses}
      expensesPeriod="Total"
      fallBackText="No registered expenses found!"
    />
  );
};

export default AllExpense;
