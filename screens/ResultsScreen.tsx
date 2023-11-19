import { StyleSheet, View, Image, SafeAreaView, Text, Button, TouchableOpacity } from 'react-native';
import { useAnswers, useAppDispatch, useResults } from '../state/hooks';
import { normalizeHeight, normalizeWidth } from '../util/normalize';
import { Fragment, useCallback, useState } from 'react';
import { CategoryDescription, EcoAnxietyType, categoryInfos } from '../util/questions';
import { clearAnswers } from '../state/answerSlice';
import { clearResults } from '../state/resultSlice';

function BigPercentageBar({ percentage }: { percentage: number }) {
    return (
        <View style={styles.bigPercentageBar}>
            <View style={[styles.bigPercentageBarProgressMarker, {
                width: `${percentage * 100}%`
            }]} />
        </View>
    )
}

function SmallPercentageBar({ percentage }: { percentage: number }) {
    return (
        <View style={styles.smallPercentageBar}>
            <View style={[styles.smallPercentageBarProgressMarker, {
                width: `${percentage * 100}%`
            }]} />
        </View>
    )
}

function BigSpacer() {
    return <View style={styles.bigSpacer} />
}

function SmallSpacer() {
    return <View style={styles.smallSpacer} />
}


function PrimaryCategoryContainer({ category, collapsed }: { category: CategoryDescription, collapsed: boolean }) {
    return (
        <View style={styles.primaryCategoryContainer}>
            <Text style={styles.primaryCategoryHeadline}>Parece que tu ecoansiedad dominante es la {category.name}</Text>
            <BigSpacer />
            <BigPercentageBar percentage={category.percentage} />
            <BigSpacer />
            <Text style={styles.primaryCategoryDescription}>{category.description}</Text>
            <BigSpacer />
            <View style={styles.primaryCategoryCalltoActionRow}>
                {/*<Text style={styles.learnMore}>Más información</Text>*/}
                <View style={styles.callToActionButton}>
                    <Image source={require('../assets/icons/arrow.png')} style={styles.arrowIcon} />
                    <Text style={styles.buttonText}>Descubre recursos</Text>
                </View>
            </View>
        </View>
    )
}

function SecondaryCategoryContainer({ category, onSelected, collapsed }: { category: CategoryDescription, onSelected: () => void, collapsed: boolean }) {
    return (
        <View style={styles.secondaryCategoryContainer}>
            <View style={styles.secondaryCategoryInfoRow}>
                <Text style={styles.secondaryCategoryHeadline}>{category.name}</Text>
                {/*<TouchableOpacity onPress={onSelected}>
                    <Image source={require('../assets/icons/plus.png')} style={styles.plusIcon} />
    </TouchableOpacity>*/}
            </View>
            <SmallSpacer />
            <SmallPercentageBar percentage={category.percentage} />
        </View>
    )
}

export default function ResultsScreen({ navigation }) {

    const dispatch = useAppDispatch();
    const results = useResults();

    const goBack = useCallback(() => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Swipe' }],
          })
        dispatch(clearAnswers())
        dispatch(clearResults())
    }, []);

    const topCategory = [{
        category: EcoAnxietyType.ANGER,
        percentage: results[EcoAnxietyType.ANGER]
    },
    {
        category: EcoAnxietyType.DESPAIR,
        percentage: results[EcoAnxietyType.DESPAIR]
    },
    {
        category: EcoAnxietyType.GRIEF,
        percentage: results[EcoAnxietyType.GRIEF]
    },
    {
        category: EcoAnxietyType.GUILT,
        percentage: results[EcoAnxietyType.GUILT]
    }].reduce((acc, curr) => {
        if (acc == null) {
            return curr;
        }
        if (curr.percentage > acc.percentage) {
            return curr
        }
    }, null).category;

    const dynamicCategories: CategoryDescription[] = categoryInfos.map(info => ({
        ...info,
        percentage: results[info.category],
        primary: info.category === topCategory
    }))

    dynamicCategories.sort((a, b) => b.percentage - a.percentage);

    /*const hardcodedCategories: CategoryDescription[] = [
        {
            name: 'Solastalgia',
            description: 'Chaque jour, l’expérience idéale pour lire une revue du XXIe siècle. Recevez le Grand Continent en ligne, en papier, chez vous, dans votre boîte mail.',
            percentage: 0.6,
            primary: true
        },
        {
            name: 'Eco-ira',
            description: 'Chaque jour, l’expérience idéale pour lire une revue du XXIe siècle. Recevez le Grand Continent en ligne, en papier, chez vous, dans votre boîte mail.',
            percentage: 0.4
        },
        {
            name: 'Eco-cupla',
            description: 'Chaque jour, l’expérience idéale pour lire une revue du XXIe siècle. Recevez le Grand Continent en ligne, en papier, chez vous, dans votre boîte mail.',
            percentage: 0.3
        },
        {
            name: 'Eco-fatalismo',
            description: 'Chaque jour, l’expérience idéale pour lire une revue du XXIe siècle. Recevez le Grand Continent en ligne, en papier, chez vous, dans votre boîte mail.',
            percentage: 0.2
        }
    ]*/

    const categories: CategoryDescription[] = dynamicCategories;

    const [selectedCategory, setSelectedCategory] = useState(categories[0].name);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <TouchableOpacity style={styles.navigationSection} onPress={goBack}>
                    <Image source={require('../assets/icons/go-back-light.png')} style={styles.navigationIcon} />
                    <Text style={styles.navigationText}>Repita la prueba</Text>
                </TouchableOpacity>
                <Image source={require('../assets/logo.png')} style={styles.logoImage} />
            </View>
            <View style={styles.resultsContainer}>
                {categories.map((item, index) =>
                    <Fragment key={index}>
                        {index === 0 ?
                            <PrimaryCategoryContainer category={item} collapsed={false} />
                            :
                            <SecondaryCategoryContainer category={item} onSelected={() => setSelectedCategory(item.name)} collapsed={false} />}
                        <BigSpacer />
                    </Fragment>
                )}
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
    topContainer: {
        paddingLeft: normalizeWidth(30),
        paddingRight: normalizeWidth(30),
        width: '100%',
        height: normalizeHeight(100),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    navigationSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    navigationIcon: {
        width: normalizeWidth(16),
        height: normalizeWidth(16),
        marginRight: normalizeWidth(16)
    },
    navigationText: {
        fontFamily: 'Inter-Bold',
        fontSize: normalizeWidth(16),
        color: '#ADD4C2'
    },
    logoImage: {
        width: normalizeHeight(32),
        height: normalizeHeight(32)
    },
    resultsContainer: {
        flex: 1,
        marginLeft: normalizeWidth(30),
        marginRight: normalizeWidth(30),
        marginBottom: normalizeWidth(30),

    },
    primaryCategoryContainer: {
        flexDirection: 'column',

    },
    primaryCategoryHeadline: {
        color: '#16352F',
        fontSize: normalizeHeight(28),
        fontFamily: 'Montserrat-Black'
    },
    bigSpacer: {
        marginBottom: normalizeHeight(32)
    },
    smallSpacer: {
        marginBottom: normalizeHeight(16)
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
        justifyContent: 'flex-end',
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
        alignItems: 'center',
        borderRadius: normalizeHeight(12),
    },
    arrowIcon: {
        width: normalizeHeight(19),
        height: normalizeHeight(16),
        marginRight: normalizeHeight(8),
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Inter-Bold',
        fontSize: normalizeHeight(16)
    },
    secondaryCategoryContainer: {
        flexDirection: 'column',
    },
    secondaryCategoryInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    secondaryCategoryHeadline: {
        fontFamily: 'Inter-Bold',
        fontSize: normalizeHeight(20)
    },
    plusIcon: {
        width: normalizeWidth(24),
        height: normalizeWidth(24),
    },
    smallPercentageBar: {
        width: '100%',
        height: normalizeHeight(16),
        borderRadius: normalizeHeight(8),
        backgroundColor: '#ADD4C2',
        position: 'relative'
    },
    smallPercentageBarProgressMarker: {
        position: 'absolute',
        height: normalizeHeight(16),
        borderRadius: normalizeHeight(8),
        backgroundColor: '#306F63',
    },
});
