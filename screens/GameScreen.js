import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    ScrollView,
    FlatList,
    Dimensions

} from 'react-native';


import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import Icon from 'react-native-vector-icons/Ionicons';



const genrateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.ceil(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return genrateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }

};

const renderlistitem = (listLength, itemData) => {
    <View style={styles.listItem}>
        <Text>{listLength - itemData.index}</Text>
        <Text>{itemData.item}</Text>
    </View>

};

const GameScreen = props => {
    const initialGuess = genrateRandomBetween(1, 100, props.userChoice);



    const [currentGuess, setcurrentGuess] = useState(initialGuess);
    const [pastGuesses, setpastGuesses] = useState([initialGuess.toString()]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }

    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie!', 'You know that this is wromg....', [{ text: 'Sorry', style: 'cancel' }]);
            return;

        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = genrateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setcurrentGuess(nextNumber);
        // setrounds(curRounds => curRounds + 1);
        setpastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
    };

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttoncontainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                    <Icon name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')} >
                    <Icon name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                {pastGuesses.map((guess,index ) => renderlistitem(guess, pastGuesses.length - index))}
            </ScrollView> */}

                <FlatList
                    keyExtractor={item => item}
                    data={pastGuesses}
                    renderItem={renderlistitem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttoncontainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height >600 ? 10 : 10,
        width: 400,
        maxWidth: '90%'
    },
    listContainer: {
        flex: 1,
        width: Dimensions.get('window').width > 350 ? '60%' : '80%',

    },
    list: {
        flexGrow: 1,
        // alignItems: 'center',
        justifyContent: 'flex-start'

    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
});

export default GameScreen;