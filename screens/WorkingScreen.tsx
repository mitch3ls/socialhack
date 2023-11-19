import { StyleSheet, View, Text, SafeAreaView, Image } from 'react-native';
import { normalizeHeight } from '../util/normalize';
import { useEffect } from 'react';
import { useAnswers, useAppDispatch } from '../state/hooks';
import { calculateCategoryWeights } from '../util/questions';
import { setResults } from '../state/resultSlice';

const workingDuration = 2000;

export default function WorkingScreen({ navigation }) {

    const answers = useAnswers();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const results = calculateCategoryWeights(answers);
        dispatch(setResults(results));
    }, [answers])

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
                <Text style={styles.infoText}>Calculando tus resultados...</Text>
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
