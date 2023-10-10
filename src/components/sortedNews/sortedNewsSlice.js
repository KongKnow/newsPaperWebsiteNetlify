import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {useHttps} from '../../hooks/http.hook'


export const sortedNewsPopularThunk = createAsyncThunk(
    'sortedNewsPopular/asyncSortedNewsPopular',
    async () => {
        const {request} = useHttps()
        return await request('https://api.worldnewsapi.com/search-news?api-key=d1409cb84d26419fb9311955e22a1f0a&number=3&offset=4&text=popular')
    }
)

export const sortedNewsLatestThunk = createAsyncThunk(
    'sortedNewsLatest/asyncSortedNewsLatest',
    async () => {
        const {request} = useHttps()
        return await request('https://api.worldnewsapi.com/search-news?api-key=d1409cb84d26419fb9311955e22a1f0a&number=3')
    }
)

const initialState = {
    sortedNewsPopular: [],
    sortedNewsPopularProcess: 'idle',
    sortedNewsLatest: [],
    sortedNewsLatestProcess: 'idle'
}

const sortedNewsSlice = createSlice({
    name: 'sortedNewsSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(sortedNewsPopularThunk.pending, state => {state.sortedNewsPopularProcess = 'loading'})
            .addCase(sortedNewsPopularThunk.fulfilled, (state, action) => {
                state.sortedNewsPopularProcess = 'success'
                state.sortedNewsPopular = action.payload.news
            })
            .addCase(sortedNewsPopularThunk.rejected, state => {state.sortedNewsPopularProcess = 'error'})
            .addCase(sortedNewsLatestThunk.pending, state => {state.sortedNewsLatestProcess = 'loading'})
            .addCase(sortedNewsLatestThunk.fulfilled, (state, action) => {
                state.sortedNewsLatestProcess = 'success'
                state.sortedNewsLatest = action.payload.news
            })
            .addCase(sortedNewsLatestThunk.rejected, state => {state.sortedNewsLatestProcess = 'error'})
    }
})
// eslint-disable-next-line
const {actions, reducer} = sortedNewsSlice;

export default reducer
