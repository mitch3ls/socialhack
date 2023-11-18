import { StyleSheet, View, Text, SafeAreaView, Image } from 'react-native';
import { normalizeHeight } from '../util/normalize';
import { useEffect } from 'react';

const workingDuration = 2000;

export default function WorkingScreen({ navigation }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Results')
        }, workingDuration);
        return () => clearTimeout(timer);
      }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Image source={require('../assets/Egg.png')} style={styles.eggImage} />
                <Text style={styles.infoText}>Calculating your results...</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F0E9EB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    eggImage: {
        width: normalizeHeight(45),
        height: normalizeHeight(64)
    },
    infoText: {
        marginTop: normalizeHeight(64),
        textAlign: 'center',
        color: '#16352F',
        fontSize: normalizeHeight(28),
        fontFamily: 'Montserrat-Black'
    }
});
