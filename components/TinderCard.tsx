import React, {
    forwardRef,
    useImperativeHandle,
    useCallback,
    PropsWithRef,
    PropsWithChildren,
} from 'react';
import Animated, {
    useSharedValue,
    withSpring,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    interpolate,
    Extrapolation,
    runOnJS,
    withTiming,
    Easing,
    useDerivedValue,
} from 'react-native-reanimated';
import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

// TODO add other handles
export type CardItemHandle = {
    swipeBack: () => void;
    // swipeStronglyAgree: () => void;
    /*swipeAgree: () => void;
    swipeDisagree: () => void;
    swipeStronglyDisagree: () => void;*/
}

export type TinderCardOptions = PropsWithChildren<{
    /*
    The width of the card.
    */
    cardWidth?: number;

    /*
    The width of the card.
    */
    cardHeight?: number;

    /*
    The x coordinate range for card translation.
    */
    translateXRange?: number[];

    /*
    The y coordinate range for card translation.
    */
    translateYRange?: number[];

    /*
    The input and output ranges for card rotation.
    */
    inputRotationRange?: number[];
    outputRotationRange?: number[];

    optionsX: number;
    stronglyAgreeTop: number;
    agreeTop: number;
    disagreeTop: number;
    stronglyDisagreeTop: number;
    stronglyDisagreeBottom: number;

    /*
    The style of the card.
    */
    cardStyle?: StyleProp<ViewStyle>;
    /*
    Callbacks for swipe events.
    */
    onSwipedStronglyAgree?: () => void;
    onSwipedAgree?: () => void;
    onSwipedDisagree?: () => void;
    onSwipedStronglyDisagree?: () => void;

    /*
    The scale value for card animation.
    */
    scaleValue?: number;

    /*
    Swipe direction overlay label components.
    */
    OverlayLabelStronglyAgree?: () => JSX.Element;
    OverlayLabelAgree?: () => JSX.Element;
    OverlayLabelDisagree?: () => JSX.Element;
    OverlayLabelStronglyDisagree?: () => JSX.Element;
}>;

import {
    resetPosition,
    snapPoint,
    windowWidth,
    windowHeight,
    userConfig,
} from './TinderCard/utils';
import OverlayLabel from './TinderCard/OverlayLabel';
import { StyleProp, ViewStyle } from 'react-native';

const CardItem = forwardRef<CardItemHandle, PropsWithRef<TinderCardOptions>>(
    (
        {
            cardWidth,
            cardHeight,
            translateXRange,
            cardStyle,
            scaleValue,
            onSwipedStronglyAgree,
            onSwipedAgree,
            onSwipedDisagree,
            onSwipedStronglyDisagree,
            inputRotationRange,
            outputRotationRange,
            optionsX,
            stronglyAgreeTop,
            agreeTop,
            disagreeTop,
            stronglyDisagreeTop,
            stronglyDisagreeBottom,
            OverlayLabelStronglyAgree,
            OverlayLabelAgree,
            OverlayLabelDisagree,
            OverlayLabelStronglyDisagree,
            children,
        },
        ref
    ) => {
        const translateX = useSharedValue(0);
        const translateY = useSharedValue(0);
        const absoluteReferenceX = useSharedValue(0);
        const absoluteReferenceY = useSharedValue(0);
        const scale = useSharedValue(1);
        const polarDistance = useDerivedValue(() => {
            return Math.sqrt(Math.pow(translateX.value, 2) + Math.pow(translateY.value, 2))
        })
        const polarRadians = useDerivedValue(() => {
            return Math.atan2(translateY.value, translateX.value)
        })

        const gestureHandler = useAnimatedGestureHandler<
            PanGestureHandlerGestureEvent,
            {
                startX: number;
                startY: number;
            }
        >({
            onStart: (gestureEvent, ctx) => {
                ctx.startX = translateX.value;
                ctx.startY = translateY.value;

                const { absoluteX, absoluteY, x, y } = gestureEvent;
                const cardCenterX = absoluteX - x + cardWidth / 2;
                const cardCenterY = absoluteY - y + cardHeight / 2;
                absoluteReferenceX.value = cardCenterX;
                absoluteReferenceY.value = cardCenterY;
                if (scaleValue !== 1)
                    scale.value = withTiming(Number(scaleValue), {
                        easing: Easing.inOut(Easing.ease),
                    });
            },
            onActive: ({ translationX, translationY }, ctx) => {
                translateX.value = translationX + ctx.startX;
                translateY.value = translationY + ctx.startY;
            },
            onEnd: ({ velocityX, velocityY }) => {
                const stronglyAgreeMidY = (stronglyAgreeTop + agreeTop) / 2;
                const agreeMidY = (agreeTop + disagreeTop) / 2;
                const disagreeMidY = (disagreeTop + stronglyDisagreeTop) / 2;
                const stronglyDisagreeMidY = (stronglyDisagreeTop + stronglyDisagreeBottom) / 2;

                const yOptions = [stronglyAgreeMidY, agreeMidY, disagreeMidY, stronglyDisagreeMidY]
                    .map(v => v - absoluteReferenceY.value)

                const destX = snapPoint(
                    translateX.value,
                    velocityX,
                    translateXRange ?? []
                );
                const destY = snapPoint(
                    translateY.value,
                    velocityY,
                    yOptions
                );

                if (destX <= 0) {
                    resetPosition(translateX, translateY);
                } else {
                    const flyAwayX = 1.2 * windowWidth;
                    const flyAwayY = interpolate(flyAwayX,
                        [absoluteReferenceX.value, optionsX],
                        [absoluteReferenceY.value, destY]);

                    translateY.value = withSpring(flyAwayY, {
                        velocity: velocityY,
                    });
                    translateX.value = withSpring(flyAwayX, {
                        velocity: velocityX,
                    });

                    const optionIndex = yOptions.indexOf(destY);
                    const handlers = [
                        onSwipedStronglyAgree,
                        onSwipedAgree,
                        onSwipedDisagree,
                        onSwipedStronglyDisagree
                    ];
                    const optionHandler = handlers[optionIndex];
                    optionHandler && runOnJS(optionHandler)();
                }

                if (scaleValue !== 1)
                    scale.value = withTiming(1, {
                        easing: Easing.inOut(Easing.ease),
                    });
            },
        });

        const animatedStyle = useAnimatedStyle(() => {
            const translationX = interpolate(
                translateX.value,
                inputRotationRange ?? [],
                outputRotationRange ?? [],
                {
                    extrapolateRight: Extrapolation.CLAMP,
                }
            );

            return {
                transform: [
                    {
                        translateX: translateX.value,
                    },
                    {
                        translateY: translateY.value,
                    },
                    {
                        rotate: `${translationX}deg`,
                    },
                    {
                        scale: scale.value,
                    },
                ],
            };
        });

        const swipeBack = useCallback(() => {
            translateY.value = withSpring(0, userConfig);
            translateX.value = withSpring(0, userConfig);
        }, [translateY, translateX]);

        // TODO add handles
        /*
        const swipeStronglyAgree = useCallback(() => {
            const stronglyAgreeMidY = (stronglyAgreeTop + agreeTop) / 2;
            const destY = stronglyAgreeMidY;
            const flyAwayX = windowWidth;
            const flyAwayY = interpolate(flyAwayX,
                [absoluteReferenceX.value, optionsX],
                [absoluteReferenceY.value, destY]);
            translateY.value = withSpring(flyAwayY, userConfig);
            translateX.value = withSpring(flyAwayX, userConfig);
            onSwipedStronglyAgree && runOnJS(onSwipedStronglyAgree)();
        }, [translateY, translateX, onSwipedStronglyAgree]);
        */

        // Expose the swipeBack method using useImperativeHandle
        useImperativeHandle(ref, () => ({
            swipeBack: () => swipeBack(),
            // swipeStronglyAgree: () => swipeStronglyAgree(),
            /*swipeLeft: () => swipeLeft(),
            swipeTop: () => swipeTop(),
            swipeBottom: () => swipeBottom(),*/
        }));

        const stronglyAgreeAngleStartValue = useDerivedValue(() => Math.atan2(stronglyAgreeTop - absoluteReferenceY.value, optionsX - absoluteReferenceX.value));
        const agreeAngleStartValue = useDerivedValue(() => Math.atan2(agreeTop - absoluteReferenceY.value, optionsX - absoluteReferenceX.value));
        const disagreeAngleStartValue = useDerivedValue(() => Math.atan2(disagreeTop - absoluteReferenceY.value, optionsX - absoluteReferenceX.value));
        const stronglyDisagreeAngleStartValue = useDerivedValue(() => Math.atan2(stronglyDisagreeTop - absoluteReferenceY.value, optionsX - absoluteReferenceX.value));
        const stronglyDisagreeAngleEndValue = useDerivedValue(() => Math.atan2(stronglyDisagreeBottom - absoluteReferenceY.value, optionsX - absoluteReferenceX.value));

        return (
            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View
                    style={[
                        cardStyle,
                        {
                            width: cardWidth,
                            height: cardHeight,
                        },
                        animatedStyle,
                    ]}
                >
                    {OverlayLabelStronglyAgree && (
                        <OverlayLabel
                            overShootFrom={0.3}
                            angleFromValue={stronglyAgreeAngleStartValue}
                            angleToValue={agreeAngleStartValue}
                            Component={OverlayLabelStronglyAgree}
                            distanceValue={polarDistance}
                            angleValue={polarRadians}
                        />
                    )}
                    {OverlayLabelAgree && (
                        <OverlayLabel
                            angleFromValue={agreeAngleStartValue}
                            angleToValue={disagreeAngleStartValue}
                            Component={OverlayLabelAgree}
                            distanceValue={polarDistance}
                            angleValue={polarRadians}
                        />
                    )}
                    {OverlayLabelDisagree && (
                        <OverlayLabel
                            angleFromValue={disagreeAngleStartValue}
                            angleToValue={stronglyDisagreeAngleStartValue}
                            Component={OverlayLabelDisagree}
                            distanceValue={polarDistance}
                            angleValue={polarRadians}
                        />
                    )}
                    {OverlayLabelStronglyAgree && (
                        <OverlayLabel
                            angleFromValue={stronglyDisagreeAngleStartValue}
                            angleToValue={stronglyDisagreeAngleEndValue}
                            Component={OverlayLabelStronglyDisagree}
                            distanceValue={polarDistance}
                            angleValue={polarRadians}
                            overShootTo={0.3}
                        />
                    )}

                    {children}
                </Animated.View>
            </PanGestureHandler>
        );
    }
);

export default CardItem;

CardItem.defaultProps = {
    //* Card Props
    cardWidth: windowWidth,
    cardHeight: windowHeight,
    translateXRange: [-windowWidth / 2, 0, windowWidth / 2],
    translateYRange: [-windowHeight / 2, 0, windowHeight / 2],
    cardStyle: {},
    scaleValue: 1,
    //* Event callbacks
    onSwipedStronglyAgree: () => { },
    onSwipedAgree: () => { },
    onSwipedDisagree: () => { },
    onSwipedStronglyDisagree: () => { },

    //* Rotation Animation Props
    inputRotationRange: [-windowWidth, 0, windowWidth],
    outputRotationRange: [-10, 0, 10],
};