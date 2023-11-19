import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { CategoryWeights } from '../util/questions'

// Define a type for the slice state
interface ResultSlice {
    result: CategoryWeights
}

// Define the initial state using that type
const initialState: ResultSlice = {
    result: null
}

export const resultSlice = createSlice({
    name: 'results',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setResults: (state, action: PayloadAction<CategoryWeights>) => {
            state.result = action.payload
        },
        clearResults: (state) => {
            state.result = null
        }
    },
})

export const { setResults, clearResults } = resultSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectResult = (state: RootState) => state.results.result

export default resultSlice.reducer