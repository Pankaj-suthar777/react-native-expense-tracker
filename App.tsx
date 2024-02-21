import React from 'react';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllExpense from './screen/AllExpense';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ManageExpense from './screen/ManageExpense';
import RecentExpenses from './screen/RecentExpenses';
import {GlobalStyles} from './constants/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import IconButton from './components/ui/IconButton';
import {store} from './redux/store';
import {Provider} from 'react-redux';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function AddExpenseButton({tintColor, navigation}) {
  return (
    <IconButton
      name="plus"
      size={16}
      color={tintColor}
      onPress={() => navigation.navigate('ManageExpense')}
    />
  );
}

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({navigation}) => ({
        headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor: 'white',
        tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({tintColor}) => (
          <AddExpenseButton navigation={navigation} tintColor={tintColor} />
        ),
        //headerRight: addHandler,
      })}>
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({color, size}) => {
            return <Icon name="hourglass" size={size} color={color} />;
          },
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpense}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({color, size}) => {
            return <Icon name="calendar" size={size} color={color} />;
          },
        }}
      />
    </BottomTabs.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
            headerTintColor: 'white',
          }}>
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpensesOverview}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ManageExpense"
            component={ManageExpense}
            options={{
              presentation: 'card',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default App;
