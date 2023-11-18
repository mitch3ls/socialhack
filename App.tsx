import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TinderCard from './components/TinderCard';
import { useAnimatedReaction } from 'react-native-reanimated';

const data = [
  {
    question: '¿Ha dormido bien? ¿Ha dormido bien?'
  },
  {
    question: '¿Ha dormido bien? ¿Ha dormido bien?'
  }
];

export default function App() {
  const OverlayRight = () => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: 'green',
          },
        ]}
      >
        <Text style={styles.overlayLabelText}>Like</Text>
      </View>
    );
  };
  const OverlayLeft = () => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: 'red',
          },
        ]}
      >
        <Text style={styles.overlayLabelText}>Nope</Text>
      </View>
    );
  };
  const OverlayTop = () => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: 'blue',
          },
        ]}
      >
        <Text style={styles.overlayLabelText}>Super Like</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.optionContainer}>
        <View style={styles.optionStronglyAgree}></View>
        <View style={styles.optionAgree}></View>
        <View style={styles.optionDisagree}></View>
        <View style={styles.optionStronglyDisagree}></View>
      </View>

      <GestureHandlerRootView style={styles.cardWrapper}>
        {data.map((item, index) => {
          return (
            <View
              style={styles.cardContainer}
              pointerEvents="box-none"
              key={index}
            >
              <TinderCard
                cardWidth={280}
                cardHeight={400}
                OverlayLabelRight={OverlayRight}
                OverlayLabelLeft={OverlayLeft}
                OverlayLabelTop={OverlayTop}
                cardStyle={styles.card}
                onSwipedRight={() => {
                  Alert.alert('Swiped right');
                }}
                onSwipedTop={() => {
                  Alert.alert('Swiped Top');
                }}
                onSwipedLeft={() => {
                  Alert.alert('Swiped left');
                }}
              >
                <Text style={styles.cardProgressLabel}>Pregunta {index} de {data.length}</Text>
                <Text style={styles.cardQuestion}>{item.question}</Text>
              </TinderCard>
              <StatusBar style="auto" />
            </View>
          );
        })}
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row-reverse',
    backgroundColor: '#F0E9EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionContainer: {
    height: '70%',
    width: 40,
    marginRight: 20,
  },
  optionStronglyAgree: {
    backgroundColor: '#306F63',
    flexGrow: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  optionAgree: {
    backgroundColor: '#ADD4C2',
    flexGrow: 1
  },
  optionDisagree: {
    backgroundColor: '#FFB4D2',
    flexGrow: 1
  },
  optionStronglyDisagree: {
    backgroundColor: '#FE4102',
    flexGrow: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  cardWrapper: {
    flex: 1,
    margin: 20,
    height: 400
  },
  cardContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 3,
  },
  cardProgressLabel: {
    color: '#D86775',
    fontSize: 15
  },
  cardQuestion: {
    fontSize: 20,
    marginTop: 20
  },
  overlayLabelContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayLabelText: { color: 'white', fontSize: 32, fontWeight: 'bold' },
});
