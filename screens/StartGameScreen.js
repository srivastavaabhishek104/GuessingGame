import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  Alert,
} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors';
import colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
const StartGameScreen = props => {
  	const [enteredValue, setEnteredValue] = useState('');
	const [confirmed,setConfirmed] = useState(false);
	const [selectedNumber,setSelectedNumber] = useState()
	
	const numberInputHandler = inputText => {
    	setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  	};

	const resetInputHandler = () => {
		setEnteredValue('');
		setConfirmed(false);
	};

	const confirmInputHandler = () => {
		const choosenNumber = parseInt(enteredValue)
		if(isNaN(choosenNumber) || choosenNumber<=0 || choosenNumber > 100) {
			Alert.alert('Invalid number!',
				'Nuber has to be a number between 1 to 99.',
				[{text:'Okay',style:'destructive',onPress: resetInputHandler}]
			);
			return;
		}
		setConfirmed(true);
		setEnteredValue('');
		setSelectedNumber(choosenNumber)
		Keyboard.dismiss();
	};

	let confirmedOutput;
	if(confirmed) {
		confirmedOutput = <Card style={styles.summaryContainer}>
			<Text>You Selected</Text>
			<NumberContainer>{selectedNumber}</NumberContainer>
			<Button title="START GAME" onPress={()=> props.onStartGame(selectedNumber)}/>
		</Card>
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		<View style={styles.screen}>
			<Text style={styles.title}>Start a New Game!</Text>
			<Card style={styles.inputContainer}>
			<Text>Select a Number</Text>
			<Input
				blurOnSubmit
				autoCapitalize="none"
				autoCorrect={false}
				keyboardType="number-pad"
				maxLength={2}
				style={styles.input}
				value={enteredValue}
				onChangeText={numberInputHandler}
			/>
			<View style={styles.buttonContainer}>
				<View style={styles.button}>
				<Button
					title="Reset"
					color={colors.accent}
					onPress={resetInputHandler}
				/>
				</View>
				<View style={styles.button}>
				<Button
					title="Confirm"
					color={Colors.primary}
					onPress={confirmInputHandler}
				/>
				</View>
			</View>
			</Card>
			{confirmedOutput}
		</View>
		</TouchableWithoutFeedback>
	);
};

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  button: {
    width: 100,
  },
  input: {
    width: 50,
	textAlign: 'center',
	marginBottom:20,
  },
  summaryContainer: {
	  marginTop:20,
	  alignItems:'center',
  },
});
