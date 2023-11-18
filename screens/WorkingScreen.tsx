import { StyleSheet, View, Text, SafeAreaView } from 'react-native';

export default function WorkingScreen() {

    return (
        <SafeAreaView style={styles.container}>
           
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
