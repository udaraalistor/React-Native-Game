import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView


} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constant/colors';
import NumberContainer from '../components/NumberContainer';
import { font } from '../constant/font';
import MainButton from '../components/MainButton';


const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setconfirmed] = useState(false);
    const [selectednumber, setselectednumber] = useState();
    const [buttonwidth, setbuttonwidth] = useState(Dimensions.get('window').width / 4);


   

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setconfirmed(false);

    }

    useEffect(() => {
        const updateLayout = () => {
            setbuttonwidth(Dimensions.get('window').width / 4);
    
        }
    
        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };

    })

    const confirmInputHandler = () => {
        const choseNumber = parseInt(enteredValue);
        if (isNaN(choseNumber) || choseNumber <= 0 || choseNumber > 99) {
            Alert.alert('Invalid Number!', 'Number has to be a number between 1 and 99.', [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }])
            return;
        }
        setconfirmed(true);
        setselectednumber(choseNumber);
        setEnteredValue('');
        Keyboard.dismiss();

    };

    let confirmedOutPut;

    if (confirmed) {
        confirmedOutPut =
            <Card style={styles.summarycontainer}>
                <Text>You Selected: </Text>
                <NumberContainer>{selectednumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectednumber)}>
                    START GAME
                 </MainButton>

            </Card>

    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss();

                }}>
                    <View style={styles.screen}>
                        <Text style={styles.title}>Start a New Game</Text>
                        <Card style={styles.inputcontainer}>
                            <Text>Select a Number</Text>
                            <Input
                                style={styles.input}
                                blurOnSubmit
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType='number-pad'
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={enteredValue}

                            />
                            <View style={styles.buttoncontainer}>
                                <View style={{width: buttonwidth}}><Button title="Reset" onPress={resetInputHandler} color={Colors.accent} /></View>
                                <View style={{width: buttonwidth}}><Button title="Confirm" onPress={confirmInputHandler} color={Colors.secondry} /></View>
                            </View>
                        </Card>
                        {confirmedOutPut}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        // fontFamily: font.josefinSansLight
        // fontFamily: 'JosefinSans-Light',

    },
    inputcontainer: {
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center',
    },
    buttoncontainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15

    },
    // button: {
    //     // width: 100,
    //     width: Dimensions.get('window').width / 4


    // },
    input: {
        width: 50,
        textAlign: 'center',
    },
    summarycontainer: {
        marginTop: 20,
        alignItems: 'center',


    }




});

export default StartGameScreen;