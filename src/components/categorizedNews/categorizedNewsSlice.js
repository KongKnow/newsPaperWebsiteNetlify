import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {useHttps} from '../../hooks/http.hook'


export const categorizedNewsThunk = createAsyncThunk(
    'categorizedNews/asyncCategorizedNews',
    async (category) => {
        const {request} = useHttps()
        return await request(`https://api.worldnewsapi.com/search-news?api-key=d1409cb84d26419fb9311955e22a1f0a&offset=4&number=4&text=${category}`)
    }
)

const initialState = {
    categorizedNews: [],
    categorizedNewsProcess: 'idle',
    category: 'financial'
}

const categorizedNewsSlice = createSlice({
    name: 'categorizedNewsSlice',
    initialState,
    reducers: {
        changeCategory: (state, action) => {
            state.category = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(categorizedNewsThunk.pending, state => {state.categorizedNewsProcess = 'loading'})
            .addCase(categorizedNewsThunk.fulfilled, (state, action) => {
                state.categorizedNewsProcess = 'success'
                state.categorizedNews = action.payload.news
            })
            .addCase(categorizedNewsThunk.rejected, state => {state.categorizedNewsProcess = 'error'})
    }
})

const {actions, reducer} = categorizedNewsSlice;

export default reducer
export const {changeCategory} = actions
