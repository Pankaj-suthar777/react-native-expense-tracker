import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import Input from './Input';
import Button from '../ui/Button';
import {GlobalStyles} from '../../constants/styles';

const ExpenseForm = ({onCancel, isEditing, onSubmit, defaultValue}) => {
  const [inputValues, setInputValues] = useState({
    amount: {
      value: defaultValue ? defaultValue.amount?.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValue ? defaultValue.date?.toISOString().slice(0, 10) : '',
      isValid: true,
    },
    description: {
      value: defaultValue ? defaultValue.description : '',
      isValid: true,
    },
  });
  function inputChangeHandler(inputIdentifier, eneteredValue) {
    setInputValues(pre => {
      return {
        ...pre,
        [inputIdentifier]: {value: eneteredValue, isValid: true},
      };
    });
  }
  function submitHandler() {
    const expenseData = {
      amount: +inputValues.amount.value,
      date: new Date(inputValues.date.value),
      description: inputValues.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description?.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert('Invalid input', 'please check your input values');
      // return;

      setInputValues(curInputs => {
        return {
          amount: {values: curInputs.amount.value, isValid: amountIsValid},
          date: {values: curInputs.date.value, isValid: dateIsValid},
          description: {
            values: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          invalid={!inputValues.amount.isValid}
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputValues.amount.value,
          }}
        />
        <Input
          invalid={!inputValues.date.isValid}
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: inputValues.date.value,
          }}
        />
      </View>

      <Input
        invalid={!inputValues.description.isValid}
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, 'description'),
          value: inputValues.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your enterd data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  form: {
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 24,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
export default ExpenseForm;
