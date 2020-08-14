import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity

} from 'react-native';

import Colors from '../constant/colors';
// import {font} from  '../constant/font';


const MainButton = props => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
            <View style={styles.button}>
    <Text style={styles.buttonText}>{props.children}</Text>

            </View>

        </TouchableOpacity>

    )
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25



    },
    buttonText: {
        color: 'white',
        fontSize: 18


    }

});

export default MainButton;