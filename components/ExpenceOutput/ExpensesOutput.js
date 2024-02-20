import React from 'react';
import {StyleSheet, View} from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import {GlobalStyles} from '../../constants/styles';

const DUMMT_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    date: new Date('2021-12-19'),
    amount: 67.23,
  },
  {
    id: 'e2',
    description: 'A pair of trouser',
    date: new Date('2022-01-05'),
    amount: 99.23,
  },
  {
    id: 'e3',
    description: 'Some bananas',
    date: new Date('2021-12-01'),
    amount: 5.23,
  },
  {
    id: 'e4',
    description: 'A book',
    date: new Date('2022-02-19'),
    amount: 14,
  },
  {
    id: 'e5',
    description: 'another book',
    date: new Date('2022-02-18'),
    amount: 19,
  },
  {
    id: 'e6',
    description: 'A pair of shoes',
    date: new Date('2021-12-19'),
    amount: 67.23,
  },
  {
    id: 'e7',
    description: 'A pair of trouser',
    date: new Date('2022-01-05'),
    amount: 99.23,
  },
  {
    id: 'e8',
    description: 'Some bananas',
    date: new Date('2021-12-01'),
    amount: 5.23,
  },
  {
    id: 'e9',
    description: 'A book',
    date: new Date('2022-02-19'),
    amount: 14,
  },
  {
    id: 'e10',
    description: 'another book',
    date: new Date('2022-02-18'),
    amount: 19,
  },
];

const ExpensesOutput = ({expenses, expensesPeriod}) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMT_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMT_EXPENSES} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
});

export default ExpensesOutput;
