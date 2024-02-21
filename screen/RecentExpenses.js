import React, {useEffect, useState} from 'react';
import ExpensesOutput from '../components/ExpenceOutput/ExpensesOutput';
import {useDispatch, useSelector} from 'react-redux';
import {getDateminusDays} from '../utils/data';
import {fetchExpenses} from '../utils/http';
import {setExpense} from '../redux/expenseSlice';
import Loading from '../components/ui/Loading';

const RecentExpenses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const {expenses} = useSelector(state => state.expenses);

  const recentExpenses = expenses.filter(expense => {
    const today = new Date();
    const date7DaysAgo = getDateminusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      const FetchedExpenses = await fetchExpenses();
      setIsLoading(false);
      dispatch(setExpense(FetchedExpenses));
    }
    getExpenses();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallBackText="No expenses registered for the last 7 days."
    />
  );
};

export default RecentExpenses;
