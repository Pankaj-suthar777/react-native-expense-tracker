import React, {useLayoutEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import IconButton from '../components/ui/IconButton';
import {GlobalStyles} from '../constants/styles';
import Button from '../components/ui/Button';
import {useDispatch, useSelector} from 'react-redux';
import {addExpense, deleteExpense, updateExpense} from '../redux/expenseSlice';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

const ManageExpense = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {expenses} = useSelector(state => state.expenses);
  const editedExpenseId = route.params?.expenseId;
  //js trick to convert truethy value in true and falsey value in false
  const isEditing = !!editedExpenseId;

  const selectedExpense = expenses.find(
    expense => expense.id === editedExpenseId,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    navigation.goBack();
    dispatch(deleteExpense(editedExpenseId));
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expenseData) {
    if (isEditing) {
      dispatch(
        updateExpense({
          id: editedExpenseId,
          data: expenseData,
        }),
      );
    } else {
      dispatch(addExpense(expenseData));
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        isEditing={isEditing}
        onSubmit={confirmHandler}
        defaultValue={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            name="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});

export default ManageExpense;
