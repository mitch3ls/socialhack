import { StatusBar } from 'expo-status-bar';
import { useMemo, useRef, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TinderCard, { CardItemHandle } from '../components/TinderCard';

import { AnswerStatement, ItemData, data } from '../util/questions'
import { useAnswers, useAppDispatch } from '../state/hooks';
import { addAnswer } from '../state/answerSlice';
import { normalizeHeight, normalizeWidth } from '../util/normalize';

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
            <Text style={styles.overlayLabelText}>totalmente si</Text>
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
            <Text style={styles.overlayLabelText}>de acuerdo</Text>
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
            <Text style={styles.overlayLabelText}>en desacuerdo</Text>
        </View>
    );
};

const OverlayStronglyDisagree = () => {
    return (
        <View
            style={[
                styles.overlayLabelContainer,
                {
                    backgroundColor: '#81002A',
                },
            ]}
        >
            <Text style={styles.overlayLabelText}>totalmente no</Text>
        </View>
    );
};

function ProgressBar() {
    const answers = useAnswers();

    const progress = answers.length * 100 / data.length;

    return (
        <View style={styles.progressBar}>
            <View style={[styles.progressMarker, {
                width: `${progress}%`
            }]}></View>
        </View>
    )
}


export default function SwipeScreen({ navigation }) {
    const dispatch = useAppDispatch();
    const randomizedQuestions = useMemo(() => {
        const randomizedQuestions = data;
        randomizedQuestions.sort(() => 0.5 - Math.random());
        return randomizedQuestions;
    }, [data]);

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
                    cardWidth={normalizeWidth(257)}
                    cardHeight={normalizeHeight(511)}
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
                    cardStyle={styles.card}
                    onSwipedStronglyAgree={() => {
                        dispatch(addAnswer({
                            category: item.category,
                            answer: AnswerStatement.StronglyAgree
                        }))
                    }}
                    onSwipedAgree={() => {
                        dispatch(addAnswer({
                            category: item.category,
                            answer: AnswerStatement.Agree
                        }))
                    }}
                    onSwipedDisagree={() => {
                        dispatch(addAnswer({
                            category: item.category,
                            answer: AnswerStatement.Disagree
                        }))
                    }}
                    onSwipedStronglyDisagree={() => {
                        dispatch(addAnswer({
                            category: item.category,
                            answer: AnswerStatement.StronglyDisagree
                        }))
                    }}
                >
                    {item.imageURI && <Image source={{ uri: item.imageURI }} style={styles.cardImage} />}
                    <View style={styles.cardContent}>
                        <Text style={styles.cardQuestion}>{item.question}</Text>
                    </View>

                </TinderCard>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/logo.png')} style={styles.logoImage} />
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.optionContainer}>
                    <View style={[styles.option, styles.optionStronglyAgree]} ref={stronglyAgreeRef} onLayout={() => {
                        stronglyAgreeRef.current.measure((_fx, _fy, _width, _height, px, py) => {
                            setOptionsX(px);
                            setStronglyAgreeTop(py);
                        })
                    }}>
                        <Text style={styles.optionLabel}>muy de acuerdo</Text>
                    </View>
                    <View style={[styles.option, styles.optionAgree]} ref={agreeRef} onLayout={() => {
                        agreeRef.current.measure((_fx, _fy, _width, _height, _px, py) => {
                            setAgreeTop(py);
                        })
                    }}>
                        <Text style={styles.optionLabel}>más bien sí</Text>
                    </View>
                    <View style={[styles.option, styles.optionDisagree]} ref={disagreeRef} onLayout={() => {
                        disagreeRef.current.measure((_fx, _fy, _width, _height, _px, py) => {
                            setDisagreeTop(py);
                        })
                    }}>
                        <Text style={styles.optionLabel}>más bien no</Text>
                    </View>
                    <View style={[styles.option, styles.optionStronglyDisagree]} ref={stronglyDisagreeRef} onLayout={() => {
                        stronglyDisagreeRef.current.measure((_fx, _fy, _width, height, _px, py) => {
                            setStronglyDisagreeTop(py);
                            setStronglyDisagreeBottom(py + height);
                        })
                    }}>
                        <Text style={styles.optionLabel}>muy en desacuerdo</Text>
                    </View>
                </View>

                <View style={styles.leftColumnContainer}>
                    <Text style={styles.title}>Que piensas de esta blabla</Text>
                    <GestureHandlerRootView style={styles.cardWrapper}>
                        <View
                            style={styles.cardContainer}
                            pointerEvents="box-none"
                        >
                            <View style={[styles.card, {
                                width: normalizeWidth(257),
                                height: normalizeHeight(511),
                                backgroundColor: '#D86775'
                            }]}>
                                <Text style={[styles.cardQuestion, { color: 'white' }]}>Done!</Text>
                                <Button
                                    title="Go to Results"
                                    onPress={() => navigation.navigate('Working')}
                                />
                            </View>
                        </View>
                        {randomizedQuestions.map((item, index) =>
                            <ClimatchTinderCard key={index} index={index} item={item} />
                        )}
                    </GestureHandlerRootView>
                    <View style={styles.controls}>
                        {/* TODO make work (what does it even do) */}
                        <Image source={require('../assets/icons/go-back.png')} style={styles.revertIcon} />
                        <ProgressBar />
                    </View>
                </View>
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F0E9EB',
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImage: {
        width: normalizeHeight(32),
        height: normalizeHeight(32)
    },
    mainContainer: {
        height: normalizeHeight(660),
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: normalizeWidth(30),
        marginRight: normalizeWidth(30),
        marginBottom: normalizeWidth(30)
    },
    optionContainer: {
        height: normalizeHeight(660),
        width: normalizeWidth(40),
    },
    optionLabel: {
        color: 'white',
        fontSize: normalizeHeight(15),
        textAlign: 'center',
        width: normalizeHeight(165),
        height: normalizeWidth(16),
        transform: [{
            rotate: '90deg'
        }]
    },
    option: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    optionStronglyAgree: {
        backgroundColor: '#306F63',
        borderTopLeftRadius: normalizeWidth(12),
        borderTopRightRadius: normalizeWidth(12),

    },
    optionAgree: {
        backgroundColor: '#ADD4C2',
    },
    optionDisagree: {
        backgroundColor: '#FFB4D2',
    },
    optionStronglyDisagree: {
        backgroundColor: '#81002A',
        flexGrow: 1,
        borderBottomLeftRadius: normalizeWidth(10),
        borderBottomRightRadius: normalizeWidth(10)
    },
    leftColumnContainer: {
        width: normalizeWidth(257),
        height: normalizeHeight(660)
    },
    title: {
        color: '#16352F',
        fontSize: normalizeHeight(28),
        flex: 1,
        fontFamily: 'Montserrat-Black'
    },
    cardWrapper: {
        height: normalizeHeight(511),
        width: normalizeWidth(257)
    },
    cardContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        borderRadius: normalizeWidth(20),
        backgroundColor: '#ADD4C2',
        position: 'relative',
    },
    cardContent: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: normalizeWidth(20),
        padding: normalizeWidth(20),
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent'
    },
    cardImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: normalizeWidth(20)
    },
    topCardShadow: {
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'black',
        shadowOpacity: 0.15,
        shadowRadius: normalizeWidth(15),
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
        fontSize: normalizeWidth(12)
    },
    cardQuestion: {
        fontSize: normalizeWidth(18),
        marginTop: 20,
        fontFamily: 'Inter-Regular',
        color: 'white'
    },
    overlayLabelContainer: {
        width: '100%',
        height: '100%',
        borderRadius: normalizeWidth(20),
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayLabelText: { color: 'white', fontSize: 32, fontWeight: 'bold' },
    controls: {
        height: normalizeHeight(64),
        flexDirection: 'row',
        alignItems: 'center'
    },
    revertIcon: {
        width: normalizeWidth(16),
        height: normalizeWidth(16),
        marginRight: normalizeWidth(16)
    },
    progressBar: {
        flex: 1,
        height: normalizeWidth(8),
        borderRadius: normalizeWidth(4),
        backgroundColor: '#ADD4C2',
        position: 'relative'
    },
    progressMarker: {
        position: 'absolute',
        borderRadius: normalizeWidth(4),
        height: normalizeWidth(8),
        backgroundColor: '#16352F',
    }
});
