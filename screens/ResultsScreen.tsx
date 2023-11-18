import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

export default function ResultsScreen() {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row-reverse',
    backgroundColor: '#F0E9EB',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});
