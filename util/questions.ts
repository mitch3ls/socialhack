export enum EcoAnxietyType {
    GUILT,
    ANGER,
    GRIEF,
    DESPAIR
}

export enum AnswerStatement {
    StronglyAgree = 3,
    Agree = 2,
    Disagree = 1,
    StronglyDisagree = 0
}

export type ItemData = {
    question: string;
    category: EcoAnxietyType;
    imageURI?: string;
}

export type AnswerData = {
    category: EcoAnxietyType,
    answer: AnswerStatement
}

export type CategoryDescription = {
    name: string;
    description: string;
    percentage: number;
    primary?: boolean;
}

export type CategoryInfo = {
    category: EcoAnxietyType,
    name: string;
    description: string;
}

export type CategoryWeights = {
    [EcoAnxietyType.GUILT]: number;
    [EcoAnxietyType.ANGER]: number;
    [EcoAnxietyType.GRIEF]: number;
    [EcoAnxietyType.DESPAIR]: number;
}

export const categoryInfos: CategoryInfo[] = [
    {
        category: EcoAnxietyType.GRIEF,
        name: 'Solastalgia',
        description: 'Puede que est’es experimentando una respuesta psicológica negativaa que presentan las personas expuestas a la degradación ambiental de su entorno, que pueden provocar angustia, así como falta de confort, identidad y apego al hogar.',
    },
    {
        category: EcoAnxietyType.ANGER,
        name: 'Eco-ira',
        description: 'Esta emoción surge de la percepción de no cumplir las expectativas medioambientales personales o sociales, a menudo acompañada de la sensación de infringir las normas medioambientales con las propias acciones u omisiones.',
    },
    {
        category: EcoAnxietyType.GUILT,
        name: 'Eco-culpa',
        description: 'Eco-ira corresponde a sentimientos de ira, furia, irritación y frustración ante la percepción de que las personas en el poder no han hecho lo suficiente para mitigar el cambio climático o lo han perjudicado intencionadamente. También es irratación y enfado ante la ignorancia y falta de visión de la sociedad a la hora de mostrar preocupación y abordar el cambio climático.',
    },
    {
        category: EcoAnxietyType.DESPAIR,
        name: 'Eco-fatalismo',
        description: 'Sentirse desesperanzad y pesimista ante la percepción de que los efectos más catastróficos del cambio climático son inevitables.',
    }
]

export function calculateCategoryWeights(answers: AnswerData[]): CategoryWeights {

    function calculateWeightForCategory(category: EcoAnxietyType): number {
        const categoryAnswers = answers.filter(a => a.category === category);
        const maxPoints = categoryAnswers.length * 4;
        const points = categoryAnswers.reduce((prev, curr) => prev + curr.category, 0)

        return points / maxPoints
    }

    return {
        [EcoAnxietyType.GUILT]: calculateWeightForCategory(EcoAnxietyType.GUILT),
        [EcoAnxietyType.ANGER]: calculateWeightForCategory(EcoAnxietyType.ANGER),
        [EcoAnxietyType.GRIEF]: calculateWeightForCategory(EcoAnxietyType.GRIEF),
        [EcoAnxietyType.DESPAIR]: calculateWeightForCategory(EcoAnxietyType.DESPAIR),
    }
}

export const data: ItemData[] = [
    {
        question: 'Cuando veo lo sucia que está el agua del mar en Cataluña, siento en parte responsabilidad personal por ello.',
        category: EcoAnxietyType.GUILT,
        imageURI: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        question: 'A menudo me siento como un hipócrita en lo que respecta a la acción medioambiental.',
        category: EcoAnxietyType.GUILT,
        imageURI: 'https://images.unsplash.com/photo-1584647819802-0c1d0bec86e9?q=80&w=3288&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        question: 'Cuanto más aprendo sobre el cambio climático, más me cuestiono mi propio estilo de vida.',
        category: EcoAnxietyType.GUILT,
        imageURI: 'https://images.unsplash.com/photo-1591184510259-b6f1be3d7aff?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        question: 'Estoy enfadado porque los gobiernos estén haciendo tan poco para solucionar la crisis climática.',
        category: EcoAnxietyType.ANGER
    },
    {
        question: 'Me genera mucha rabia ver los incendios devastadores de Galicia.',
        category: EcoAnxietyType.ANGER
    },
    {
        question: 'No puedo soportar que los turistas tiren sus botellas de plástico por todas partes cuando visitan mi ciudad natal.',
        category: EcoAnxietyType.ANGER
    },
    {
        question: 'Me preocupa la salud de mis abuelos cada verano a causa de las olas de calor.',
        category: EcoAnxietyType.GRIEF,
        imageURI: 'https://images.unsplash.com/photo-1559234938-b60fff04894d?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        question: 'Tengo miedo de que el cambio climático se lleve por delante la Barra del Trabucador en el Delta del Ebro.',
        category: EcoAnxietyType.GRIEF,
        imageURI: 'https://images.unsplash.com/photo-1695681675989-7b03f0dfffd8?q=80&w=3136&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        question: 'Me entristece la posibilidad de que el los paseos marítimos de ciudades que me gustan sean engullidos por la subida del nivel del mar.',
        category: EcoAnxietyType.GRIEF,
        imageURI: 'https://images.unsplash.com/photo-1617347914136-9274023f8812?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        question: 'Creo que es demasiado tarde para hacer nada, el futuro pinta catastrófico…',
        category: EcoAnxietyType.DESPAIR,
        imageURI: 'https://images.unsplash.com/photo-1636314533101-9112be56e507?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        question: 'Me pone de los nervios pensar cuánto contaminan en otros países y yo no puedo hacer nada.',
        category: EcoAnxietyType.DESPAIR,
        imageURI: 'https://plus.unsplash.com/premium_photo-1682144426302-635f3bc67046?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        question: 'Veces estoy triste y me siento impotente ante problemas medioambientales tan graves como el cambio climático.',
        category: EcoAnxietyType.DESPAIR,
        imageURI: 'https://images.unsplash.com/photo-1453975614608-505293680dc6?q=80&w=2920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
];