import { configureStore } from '@reduxjs/toolkit'
import answerSlice from './answerSlice'
import resultSlice from './resultSlice'

export const store = configureStore({
    reducer: {
        answers: answerSlice,
        results: resultSlice
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch