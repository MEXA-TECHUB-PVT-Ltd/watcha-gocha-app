import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
const STYLES = StyleSheet.create({
    bg: {
        // height:800,
        backgroundColor: '#FACA4E'
    },
    mainv: {
        flex: 1,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        marginTop: '15%',
        backgroundColor: 'white'
    },

    txt: {
        color: '#333333',
        fontSize: wp(6),
        fontFamily: 'Inter-Bold',
        alignSelf: 'center',
        marginTop:'10%'
    },
    txt1: {
        color: '#9597A6',
        fontSize: wp(3.8),
        fontFamily: 'Inter-Regular',
        alignSelf: 'center',
        marginTop:'2%'
    },
    button: {
        // flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: '#FACA4E',
        borderRadius: 25,
        width: 150,
        marginBottom: '5%',
    },
})

export default STYLES; 