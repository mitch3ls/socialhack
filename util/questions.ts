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
    category: EcoAnxietyType
}

export type AnswerData = {
    category: EcoAnxietyType,
    answer: AnswerStatement
}

export const data: ItemData[] = [
    {
        question: '¿Ha dormido bien? ¿Ha dormido bien?',
        category: EcoAnxietyType.GUILT
    },
    {
        question: '¿Ha dormido bien? ¿Ha dormido bien?',
        category: EcoAnxietyType.ANGER
    },
    {
        question: '¿Ha dormido bien? ¿Ha dormido bien?',
        category: EcoAnxietyType.GRIEF
    },
    {
        question: '¿Ha dormido bien? ¿Ha dormido bien?',
        category: EcoAnxietyType.DESPAIR
    }
];