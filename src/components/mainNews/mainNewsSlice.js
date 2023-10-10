import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {useHttps} from '../../hooks/http.hook'


export const mainNewsThunk = createAsyncThunk(
    'mainNews/asyncMainNews',
    async (country) => {
        let url = 'https://api.worldnewsapi.com/search-news?api-key=d1409cb84d26419fb9311955e22a1f0a&offset=4&number=8';
        switch (country) {
            case 'usa':
                url += '&source-countries=us'
                break
            case 'england':
                url += '&source-countries=gb'
                break
            case 'germany':
                url += '&source-countries=de'
                break
            default:
                break
        }
        const {request} = useHttps()
        return await request(url)
    }
)

const initialState = {
    mainNews: [],
    mainNewsProcess: 'idle'
}

const mainNewsSlice = createSlice({
    name: 'mainNewsSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(mainNewsThunk.pending, state => {state.mainNewsProcess = 'loading'})
            .addCase(mainNewsThunk.fulfilled, (state, action) => {
                state.mainNewsProcess = 'success'
                state.mainNews = action.payload.news
            })
            .addCase(mainNewsThunk.rejected, state => {state.mainNewsProcess = 'error'})
    }
})
// eslint-disable-next-line
const {actions, reducer} = mainNewsSlice;

export default reducer
