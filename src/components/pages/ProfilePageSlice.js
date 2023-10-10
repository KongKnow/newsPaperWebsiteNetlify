import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {useHttps} from '../../hooks/http.hook'


export const profilePageThunk = createAsyncThunk(
    'profilePage/asyncProfilePage',
    async (id) => {
        const {request} = useHttps()
        return await request(`http://localhost:3001/email/${id}`)
    }
)

const initialState = {
    profilePageNews: [],
    profilePageProcess: 'idle'
}

const profilePageSlice = createSlice({
    name: 'profilePageSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(profilePageThunk.pending, state => {state.profilePageProcess = 'loading'})
            .addCase(profilePageThunk.fulfilled, (state, action) => {
                state.profilePageProcess = 'success'
                state.profilePageNews = action.payload.posts
            })
            .addCase(profilePageThunk.rejected, state => {state.profilePageProcess = 'error'})
    }
})
// eslint-disable-next-line
const {actions, reducer} = profilePageSlice;

export default reducer
