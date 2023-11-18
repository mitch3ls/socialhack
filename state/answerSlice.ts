import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { AnswerData } from '../util/questions'

// Define a type for the slice state
interface AnswersState {
    answers: AnswerData[]
}

// Define the initial state using that type
const initialState: AnswersState = {
    answers: []
}

export const answerSlice = createSlice({
    name: 'answers',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        addAnswer: (state, action: PayloadAction<AnswerData>) => {
            state.answers.push(action.payload)
        },
    },
})

export const { addAnswer } = answerSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAnswers = (state: RootState) => state.answers.answers

export default answerSlice.reducer