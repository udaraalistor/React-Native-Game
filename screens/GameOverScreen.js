import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    Dimensions,
    ScrollView

} from 'react-native';

import Colors from '../constant/colors';
import MainButton from '../components/MainButton';




const GameOverScreen = props => {
    return (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <View style={styles.screen}>
                <Text>The Game is Over.........</Text>
                <View style={styles.imagecontainer}>
                    <Image source={require('../assets/images/3.png')} style={styles.image} resizeMode="cover" />
                    {/* <Image source={{uri
            : ''}} style={styles.image} resizeMode="cover"/> */}
                </View>
                <Text style={styles.textcontainer}>Your Phone  Nedded <Text style={styles.highlight}> {props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text></Text>

                <View style={styles.button}>
                    <MainButton onPress={props.onRestart} >
                        NEWGAME
                </MainButton>
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    image: {
        width: '100%',
        height: '100%',
        // borderRadius: 200


    },
    imagecontainer: {
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.4,
        borderRadius: Dimensions.get('window').width * 0.8 / 2,
        // borderRadius: 300,
        // borderWidth: 3,
        // borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30

    },
    button: {
        borderRadius: 25,
        marginVertical: 30
    },
    highlight: {
        color: Colors.primary,
        fontSize: 20

    },
    textcontainer: {
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 15

    },
    
});

export default GameOverScreen;