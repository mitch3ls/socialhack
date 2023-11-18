import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { useAnswers } from '../state/hooks';

export default function ResultsScreen() {

    const answers = useAnswers();

    return (
        <SafeAreaView style={styles.container}>
            {answers.map((item, index) => <Text key={index}>
                category: {item.category}: answer: {item.answer}
            </Text>)}
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F0E9EB',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
});
