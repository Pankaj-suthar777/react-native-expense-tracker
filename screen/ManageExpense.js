import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import IconButton from '../components/ui/IconButton';
import {GlobalStyles} from '../constants/styles';
import {useDispatch, useSelector} from 'react-redux';
import {addExpense, deleteExpense, updateExpense} from '../redux/expenseSlice';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import {
  deleteExpenseAxios,
  storeExpense,
  updateExpenseAxios,
} from '../utils/http';
import Loading from '../components/ui/Loading';
import ErrorOverlay from '../components/ui/ErrorOverlay';

const ManageExpense = ({route, navigation}) => {
  const [error, setError] = useState();
  const [isSubmiting, setIsSubmiting] = useState(false);
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

  async function deleteExpenseHandler() {
    setIsSubmiting(true);
    try {
      await deleteExpenseAxios(editedExpenseId);
      dispatch(deleteExpense(editedExpenseId));
      navigation.goBack();
    } catch (err) {
      setError('Could not delete expense - please try again later');
      setIsSubmiting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmiting(true);
    try {
      if (isEditing) {
        dispatch(
          updateExpense({
            id: editedExpenseId,
            data: expenseData,
          }),
        );
        await updateExpenseAxios(editedExpenseId, expenseData);
        navigation.goBack();
      } else {
        const id = await storeExpense(expenseData);
        dispatch(addExpense({id, ...expenseData}));
        navigation.goBack();
      }
    } catch (err) {
      setError('Could not save data - please try again later!');
      setIsSubmiting(false);
    }
  }

  if (error) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmiting) {
    return <Loading />;
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
