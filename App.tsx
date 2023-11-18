import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TinderCard, { CardItemHandle } from './components/TinderCard';

import normalize from './util/normalizeFontSize';
import { ItemData, data } from './util/questions'

const OverlayStronglyAgree = () => {
  return (
    <View
      style={[
        styles.overlayLabelContainer,
        {
          backgroundColor: '#306F63',
        },
      ]}
    >
      <Text style={styles.overlayLabelText}>Strongly Agree</Text>
    </View>
  );
};

const OverlayAgree = () => {
  return (
    <View
      style={[
        styles.overlayLabelContainer,
        {
          backgroundColor: '#ADD4C2',
        },
      ]}
    >
      <Text style={styles.overlayLabelText}>Agree</Text>
    </View>
  );
};

const OverlayDisagree = () => {
  return (
    <View
      style={[
        styles.overlayLabelContainer,
        {
          backgroundColor: '#FFB4D2',
        },
      ]}
    >
      <Text style={styles.overlayLabelText}>Disagree</Text>
    </View>
  );
};

const OverlayStronglyDisagree = () => {
  return (
    <View
      style={[
        styles.overlayLabelContainer,
        {
          backgroundColor: '#FE4102',
        },
      ]}
    >
      <Text style={styles.overlayLabelText}>Stronly Disagree</Text>
    </View>
  );
};


export default function App() {

  const [currentIndex, setCurrentIndex] = useState(0);
  const topCardRef = useRef<CardItemHandle>();

  const stronglyAgreeRef = useRef<View>();
  const agreeRef = useRef<View>();
  const disagreeRef = useRef<View>();
  const stronglyDisagreeRef = useRef<View>();
  const [optionsX, setOptionsX] = useState(0);
  const [stronglyAgreeTop, setStronglyAgreeTop] = useState(0);
  const [agreeTop, setAgreeTop] = useState(0);
  const [disagreeTop, setDisagreeTop] = useState(0);
  const [stronglyDisagreeTop, setStronglyDisagreeTop] = useState(0);
  const [stronglyDisagreeBottom, setStronglyDisagreeBottom] = useState(0);

  function ClimatchTinderCard({ index, item }: { index: number, item: ItemData }) {
    return (
      <View
        style={styles.cardContainer}
        pointerEvents="box-none"
      >
        <TinderCard
          ref={topCardRef}
          cardWidth={normalize(220)}
          cardHeight={normalize(300)}
          optionsX={optionsX}
          stronglyAgreeTop={stronglyAgreeTop}
          agreeTop={agreeTop}
          disagreeTop={disagreeTop}
          stronglyDisagreeTop={stronglyDisagreeTop}
          stronglyDisagreeBottom={stronglyDisagreeBottom}
          OverlayLabelStronglyAgree={OverlayStronglyAgree}
          OverlayLabelAgree={OverlayAgree}
          OverlayLabelDisagree={OverlayDisagree}
          OverlayLabelStronglyDisagree={OverlayStronglyDisagree}
          cardStyle={[styles.card]}
          onSwipedStronglyAgree={() => {
            //Alert.alert('Swiped strongly agree');
            setCurrentIndex(currIndex => currIndex + 1);
          }}
          onSwipedAgree={() => {
            //Alert.alert('Swiped sagree');
            //setCurrentIndex(currIndex => currIndex + 1);
          }}
          onSwipedDisagree={() => {
            //Alert.alert('Swiped disagree');
            //setCurrentIndex(currIndex => currIndex + 1);
          }}
          onSwipedStronglyDisagree={() => {
            //Alert.alert('Swiped strongly disagree');
            //setCurrentIndex(currIndex => currIndex + 1);
          }}
        >
          <Text style={styles.cardProgressLabel}>Pregunta {data.length - index} de {data.length}</Text>
          <Text style={styles.cardQuestion}>{item.question}</Text>
        </TinderCard>
      </View>
    )
  }

  console.log(currentIndex, data.length)

  return (
    <View style={styles.container}>
      <View style={styles.optionContainer}>
        <View style={styles.optionStronglyAgree} ref={stronglyAgreeRef} onLayout={() => {
          stronglyAgreeRef.current.measure((_fx, _fy, _width, _height, px, py) => {
            setOptionsX(px);
            setStronglyAgreeTop(py);
          })
        }}></View>
        <View style={styles.optionAgree} ref={agreeRef} onLayout={() => {
          agreeRef.current.measure((_fx, _fy, _width, _height, _px, py) => {
            setAgreeTop(py);
          })
        }}></View>
        <View style={styles.optionDisagree} ref={disagreeRef} onLayout={() => {
          disagreeRef.current.measure((_fx, _fy, _width, _height, _px, py) => {
            setDisagreeTop(py);
          })
        }}></View>
        <View style={styles.optionStronglyDisagree} ref={stronglyDisagreeRef} onLayout={() => {
          stronglyDisagreeRef.current.measure((_fx, _fy, _width, height, _px, py) => {
            setStronglyDisagreeTop(py);
            setStronglyDisagreeBottom(py + height);
          })
        }}></View>
      </View>

      <View style={styles.spacer} />

      <GestureHandlerRootView style={styles.cardWrapper}>
        {data.map((item, index) =>
          <ClimatchTinderCard key={index} index={index} item={item} />
        )}
      </GestureHandlerRootView>

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
  },
  optionContainer: {
    height: '70%',
    width: normalize(30),
    marginRight: normalize(20),
  },
  optionStronglyAgree: {
    backgroundColor: '#306F63',
    flexGrow: 1,
    borderTopLeftRadius: normalize(10),
    borderTopRightRadius: normalize(10)
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
    borderBottomLeftRadius: normalize(10),
    borderBottomRightRadius: normalize(10)
  },
  spacer: {
    flex: 1
  },
  cardWrapper: {
    margin: normalize(20),
    height: normalize(300),
    width: normalize(220)
  },
  cardContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    borderRadius: normalize(20),
    padding: normalize(20),
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  topCardShadow: {
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowRadius: normalize(15),
    elevation: 3,
  },
  nextCardShadow: {
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0
  },
  cardProgressLabel: {
    color: '#D86775',
    fontSize: normalize(12)
  },
  cardQuestion: {
    fontSize: normalize(18),
    marginTop: 20
  },
  overlayLabelContainer: {
    width: '100%',
    height: '100%',
    borderRadius: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayLabelText: { color: 'white', fontSize: 32, fontWeight: 'bold' },
});
