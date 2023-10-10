import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {useHttps} from '../../hooks/http.hook'


export const listNewsThunk = createAsyncThunk(
    'listNews/asyncListNews',
    async (category) => {
        const {request} = useHttps()
        return await request(`https://api.worldnewsapi.com/search-news?api-key=86a5e9b2d6b147bca5d4b7b81cb9cf2e&offset=4&text=${category}`)
    }
)

const initialState = {
    listNews: [],
    listNewsProcess: 'idle',
    category: 'idle'
}

const listNewsSlice = createSlice({
    name: 'listNewsSlice',
    initialState,
    reducers: {
        changeCategory: (state, action) => {
            state.category = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(listNewsThunk.pending, state => {state.listNewsProcess = 'loading'})
            .addCase(listNewsThunk.fulfilled, (state, action) => {
                state.listNewsProcess = 'success'
                state.listNews = action.payload.news
            })
            .addCase(listNewsThunk.rejected, state => {state.listNewsProcess = 'error'})
    }
})

const {actions, reducer} = listNewsSlice;

export default reducer
export const {changeCategory} = actions
