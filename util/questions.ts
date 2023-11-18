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

export const data: ItemData[] = [
    {
        question: 'Cuando veo lo sucia que está el agua del mar en Cataluña, siento en parte responsabilidad personal por ello.',
        category: EcoAnxietyType.GUILT
    },
    {
        question: 'A menudo me siento como un hipócrita en lo que respecta a la acción medioambiental.',
        category: EcoAnxietyType.GUILT
    },
    {
        question: 'Cuanto más aprendo sobre el cambio climático, más me cuestiono mi propio estilo de vida.',
        category: EcoAnxietyType.GUILT
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
        category: EcoAnxietyType.GRIEF
    },
    {
        question: 'Tengo miedo de que el cambio climático se lleve por delante la Barra del Trabucador en el Delta del Ebro.',
        category: EcoAnxietyType.GRIEF
    },
    {
        question: 'Me entristece la posibilidad de que el los paseos marítimos de ciudades que me gustan sean engullidos por la subida del nivel del mar.',
        category: EcoAnxietyType.GRIEF
    },
    {
        question: 'Creo que es demasiado tarde para hacer nada, el futuro pinta catastrófico…',
        category: EcoAnxietyType.DESPAIR
    },
    {
        question: 'Me pone de los nervios pensar cuánto contaminan en otros países y yo no puedo hacer nada.',
        category: EcoAnxietyType.DESPAIR
    },
    {
        question: 'Veces estoy triste y me siento impotente ante problemas medioambientales tan graves como el cambio climático.',
        category: EcoAnxietyType.DESPAIR
    }
];