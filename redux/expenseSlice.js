import {createSlice} from '@reduxjs/toolkit';

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: {
    expenses: [],
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses.unshift({...action.payload});
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
    setExpense: (state, action) => {
      const inverted = action.payload.reverse();
      state.expenses = [...inverted];
    },
  },
});

export const addExpense = expenseSlice.actions.addExpense;
export const deleteExpense = expenseSlice.actions.deleteExpense;
export const updateExpense = expenseSlice.actions.updateExpense;
export const setExpense = expenseSlice.actions.setExpense;
export default expenseSlice.reducer;
