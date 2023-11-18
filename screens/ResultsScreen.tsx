import { StyleSheet, View, Image, SafeAreaView, Text, Button } from 'react-native';
import { useAnswers } from '../state/hooks';
import { normalizeHeight, normalizeWidth } from '../util/normalize';

function BigPercentageBar({ percentage }: { percentage: number }) {
    return (
        <View style={styles.bigPercentageBar}>
            <View style={[styles.bigPercentageBarProgressMarker, {
                width: `${percentage}%`
            }]} />
        </View>
    )
}

function BigSpacer() {
    return <View style={styles.bigSpacer} />
}

export default function ResultsScreen() {

    const answers = useAnswers();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/logo.png')} style={styles.logoImage} />
            </View>
            <View style={styles.resultsContainer}>
                <View style={styles.primaryCategoryContainer}>
                    <Text style={styles.primaryCategoryHeadline}>It seems that your dominant ecoanxiety is Solastalgia</Text>
                    <BigSpacer />
                    <BigPercentageBar percentage={30} />
                    <BigSpacer />
                    <Text style={styles.primaryCategoryDescription}>Chaque jour, l’expérience idéale pour lire une revue du XXIe siècle. Recevez le Grand Continent en ligne, en papier, chez vous, dans votre boîte mail.
                    </Text>
                    <BigSpacer />
                    <View style={styles.primaryCategoryCalltoActionRow}>
                        <Text style={styles.learnMore}>Learn more</Text>
                        <View style={styles.callToActionButton}>
                            <Image source={require('../assets/icons/arrow.png')} style={styles.arrowIcon} />
                            <Text style={styles.buttonText}>Open Resources</Text>
                        </View>
                    </View>
                </View>
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
        justifyContent: 'flex-start',
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
    resultsContainer: {
        flex: 1,
        margin: normalizeWidth(30)
    },
    primaryCategoryContainer: {

    },
    primaryCategoryHeadline: {
        color: '#16352F',
        fontSize: normalizeHeight(28),
        fontFamily: 'Montserrat-Black'
    },
    bigSpacer: {
        marginBottom: normalizeHeight(32)
    },
    bigPercentageBar: {
        width: '100%',
        height: normalizeHeight(32),
        borderRadius: normalizeHeight(16),
        backgroundColor: '#ADD4C2',
        position: 'relative'
    },
    bigPercentageBarProgressMarker: {
        position: 'absolute',
        height: normalizeHeight(32),
        borderRadius: normalizeHeight(16),
        backgroundColor: '#306F63',
    },
    primaryCategoryDescription: {
        fontFamily: 'Inter-Regular',
        fontSize: normalizeHeight(16)
    },
    primaryCategoryCalltoActionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    learnMore: {
        color: '#306F63',
        fontFamily: 'Inter-Regular',
        fontSize: normalizeHeight(16)
    },
    callToActionButton: {
        backgroundColor: '#306F63',
        padding: normalizeHeight(16),
        flexDirection: 'row',
        borderRadius: normalizeHeight(12),
    },
    arrowIcon: {
        width: normalizeHeight(19),
        height: normalizeHeight(16)
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Inter-Regular',
        fontSize: normalizeHeight(16)
    }
});
