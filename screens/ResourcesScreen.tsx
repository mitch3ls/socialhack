import { StyleSheet, View, Image, SafeAreaView, Text, ScrollView } from 'react-native';
import { normalizeHeight, normalizeWidth } from '../util/normalize';
import { CategoryDescription } from '../util/questions';

function BigPercentageBar({ percentage }: { percentage: number }) {
    return (
        <View style={styles.bigPercentageBar}>
            <View style={[styles.bigPercentageBarProgressMarker, {
                width: `${percentage * 100}%`
            }]} />
        </View>
    )
}

function ResourceContainer({ resource }: { resource: ResourceInfo }) {
    return (
        <View style={styles.resourceContainer}>
            <View style={styles.resourceLabelRow}>
                <View style={styles.resourceLabelContainer}>
                    <Text style={styles.resourceTypeLabel}>
                        {resource.type}
                    </Text>
                </View>
            </View>
            {resource.imageUrl &&
                <>
                    <SmallSpacer />
                    <Image source={{ uri: resource.imageUrl }} style={styles.resourceImage} />
                </>
            }
            <SmallSpacer />
            <Text style={styles.resourceDescription}>
                {resource.description}
            </Text>
            <Image source={require('../assets/icons/link.png')} style={styles.linkIcon} />
        </View>
    )
}

function BigSpacer() {
    return <View style={styles.bigSpacer} />
}

function MediumSpacer() {
    return <View style={styles.mediumSpacer} />
}

function SmallSpacer() {
    return <View style={styles.smallSpacer} />
}

type ResourceInfo = {
    type: string;
    imageUrl?: string;
    description: string;
    link: string;
}

export default function ResourcesScreen() {

    const category: CategoryDescription = {

        name: 'Solastalgia',
        description: 'Chaque jour, l’expérience idéale pour lire une revue du XXIe siècle. Recevez le Grand Continent en ligne, en papier, chez vous, dans votre boîte mail.',
        percentage: 0.6,
        primary: true

    }

    const resources: ResourceInfo[] = [
        {
            type: 'Recursos',
            description: 'El gobierno ofrece financiación para proteger tu casa del calor extremo.',
            link: 'https://silanet.net/'
        }, {
            type: 'Actividad',
            imageUrl: 'https://static.nationalgeographic.de/files/styles/image_3200/public/erdmannchen_hellabrunn.png.webp?w=1450&h=816',
            description: 'Visite un proyecto de protección de la fauna local, como la reserva natural del Zoo de Barcelona.',
            link: 'https://silanet.net/'
        },
        {
            type: 'Recursos',
            description: 'El gobierno ofrece financiación para proteger tu casa del calor extremo.',
            link: 'https://silanet.net/'
        }, {
            type: 'Actividad',
            imageUrl: 'https://static.nationalgeographic.de/files/styles/image_3200/public/erdmannchen_hellabrunn.png.webp?w=1450&h=816',
            description: 'Visite un proyecto de protección de la fauna local, como la reserva natural del Zoo de Barcelona.',
            link: 'https://silanet.net/'
        },
        {
            type: 'Recursos',
            description: 'El gobierno ofrece financiación para proteger tu casa del calor extremo.',
            link: 'https://silanet.net/'
        }, {
            type: 'Actividad',
            imageUrl: 'https://static.nationalgeographic.de/files/styles/image_3200/public/erdmannchen_hellabrunn.png.webp?w=1450&h=816',
            description: 'Visite un proyecto de protección de la fauna local, como la reserva natural del Zoo de Barcelona.',
            link: 'https://silanet.net/'
        }, {
            type: 'Recursos',
            description: 'El gobierno ofrece financiación para proteger tu casa del calor extremo.',
            link: 'https://silanet.net/'
        }, {
            type: 'Actividad',
            imageUrl: 'https://static.nationalgeographic.de/files/styles/image_3200/public/erdmannchen_hellabrunn.png.webp?w=1450&h=816',
            description: 'Visite un proyecto de protección de la fauna local, como la reserva natural del Zoo de Barcelona.',
            link: 'https://silanet.net/'
        }
    ]

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/logo.png')} style={styles.logoImage} />
            </View>
            <ScrollView style={styles.contentContainer}>
                <Text style={styles.headerText}>Hemos elaborado una lista de recursos para ayudarle a avanzar:</Text>
                <BigSpacer />
                <BigPercentageBar percentage={category.percentage} />
                <BigSpacer />
                {resources.map((item, index) => <>
                    <ResourceContainer key={index} resource={item} />
                    <MediumSpacer />
                </>)}
            </ScrollView>
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
        height: normalizeHeight(100),
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImage: {
        width: normalizeHeight(32),
        height: normalizeHeight(32)
    },
    contentContainer: {
        flex: 1,
        width: '100%',
        paddingLeft: normalizeWidth(30),
        paddingRight: normalizeWidth(30),
        marginBottom: normalizeWidth(30),

    },
    headerText: {
        color: '#16352F',
        fontSize: normalizeHeight(28),
        fontFamily: 'Montserrat-Black'
    },
    bigSpacer: {
        marginBottom: normalizeHeight(32)
    },
    mediumSpacer: {
        marginBottom: normalizeHeight(24)
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
    resourceContainer: {
        backgroundColor: '#ADD4C2',
        borderRadius: normalizeWidth(16),
        padding: normalizeWidth(24),
        flexDirection: 'column'
    },
    resourceLabelRow: {
        flexDirection: 'row'
    },
    resourceLabelContainer: {
        backgroundColor: '#306F63',
        paddingLeft: normalizeWidth(12),
        paddingRight: normalizeWidth(12),
        paddingTop: normalizeWidth(8),
        paddingBottom: normalizeWidth(8),
        borderRadius: normalizeWidth(6)
    },
    resourceTypeLabel: {
        fontFamily: 'Inter-Bold',
        color: 'white'
    },
    resourceImage: {
        width: '100%',
        height: normalizeHeight(170),
        borderRadius: normalizeWidth(8)
    },
    resourceDescription: {
        fontFamily: 'Inter-Bold',
        color: '#16352F',
        fontSize: normalizeWidth(16)
    },
    linkIcon: {
        width: normalizeWidth(12),
        height: normalizeWidth(12),
        alignSelf: 'flex-end'
    }
});
