import {createSlice} from '@reduxjs/toolkit';

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: {
    expenses: [
      {
        id: 'e1',
        description: 'A pair of shoes',
        date: new Date('2021-12-19'),
        amount: 67.23,
      },
      {
        id: '568',
        description: 'A pair of bob',
        date: new Date('2024-02-19'),
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
    ],
  },
  reducers: {
    addExpense: (state, action) => {
      const id = Math.random().toString();
      state.expenses.unshift({...action.payload, id: id});
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        expense => expense.id !== action.payload,
      );
    },
    updateExpense: (state, action) => {
      const updatebleExpenseIndex = state.expenses.findIndex(
        expense => expense.id === action.payload.id,
      );
      //   const updatebleItem = state.expenses[updatebleExpenseIndex];
      //   const updatedItem = {...updatebleItem, ...action.payload.data};
      const updatebleItem = state.expenses[updatebleExpenseIndex];

      state.expenses[updatebleExpenseIndex] = {
        ...updatebleItem,
        ...action.payload.data,
      };
    },
  },
});

export const addExpense = expenseSlice.actions.addExpense;
export const deleteExpense = expenseSlice.actions.deleteExpense;
export const updateExpense = expenseSlice.actions.updateExpense;
export default expenseSlice.reducer;
