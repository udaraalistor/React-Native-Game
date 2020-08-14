import React from 'react';
import {
    View,
    Text,
    StyleSheet,

} from 'react-native';

import Colors from '../constant/colors';
// import {font} from  '../constant/font';


const Header = props => {
    return (
        <View style={styles.header}>
            <Text style={styles.headertitle}>{props.title}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headertitle: {
        color: 'black',
        fontSize: 20,
        marginBottom: '10%',
        // fontFamily: font.abbasyCalligraphyTypeface
        // fontFamily: 'Abbasy Calligraphy Typeface'
        fontFamily: 'JosefinSans-Light',
        // fontFamily: font.josefinSansLight

    }

});

export default Header;