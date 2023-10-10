import {configureStore} from '@reduxjs/toolkit'
import mainNews from '../components/mainNews/mainNewsSlice'
import header from '../components/header/headerSlice'
import sortedNews from '../components/sortedNews/sortedNewsSlice'
import categorizedNews from '../components/categorizedNews/categorizedNewsSlice'
import sliderNews from '../components/sliderNews/sliderNewsSlice'
import listNews from '../components/pages/listNewsSlice'
import form from '../components/pages/formSlice'
import profile from '../components/pages/ProfilePageSlice'

const store = configureStore({
    reducer: {mainNews, header, sortedNews, categorizedNews, sliderNews, listNews, form, profile},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store