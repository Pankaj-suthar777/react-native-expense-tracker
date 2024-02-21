import React from 'react';
import ExpensesOutput from '../components/ExpenceOutput/ExpensesOutput';
import {useSelector} from 'react-redux';
import {getDateminusDays} from '../utils/data';

const RecentExpenses = () => {
  const {expenses} = useSelector(state => state.expenses);
  console.log(expenses);
  const recentExpenses = expenses.filter(expense => {
    const today = new Date();
    const date7DaysAgo = getDateminusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallBackText="No expenses registered for the last 7 days."
    />
  );
};

export default RecentExpenses;
