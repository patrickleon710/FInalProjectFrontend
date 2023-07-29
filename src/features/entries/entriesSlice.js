import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { createSlice } from '@reduxjs/toolkit';

import { apiSlice } from "../../app/api/apiSlice";


const entriesAdapter = createEntityAdapter({
    sortComparer: (a, b) => new Date(b.date) - new Date(a.date)
})

const initialState = entriesAdapter.getInitialState({})

const entrySlice = createSlice({
    name: 'EntryId',
    initialState: {EntryId: null},
    reducers: {
        setEntryId: (state, action) => {
            state.EntryId = action.payload
        }
    }
})

export const entriesSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getEntries: builder.query({
            query: () => ({
                url: '/entries',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedEntries = responseData.map(entry => {
                    entry.id = entry._id
                    return entry
                })
                return entriesAdapter.setAll(initialState, loadedEntries)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'Entry', id: 'LIST'},
                        ...result.ids.map(id => ({ type: 'Entry', id }))
                    ]
                } else return [{ type: 'Entry', id: 'LIST' }]
            }
        }),
        getSingleEntry: builder.query({
            query: (entryId) => ({
                url: `/entries/${entryId}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            })
        }),
        addNewEntry: builder.mutation({
            query: initialEntry => ({
                url: '/entries',
                method: 'POST',
                body: {
                    ...initialEntry,
                }
            }),
            invalidatesTags: [
                { type: 'Entry', id: "LIST" }
            ]
        }),
        updateEntry: builder.mutation({
            query: ({ entryId, title, content }) => ({
                url: `/entries/${entryId}`,
                method: 'PATCH',
                body: {
                    title, content
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Entry', id: arg.id }
            ]
        }),
        deleteEntry: builder.mutation({
            query: ({ entryId }) => ({
                url: `/entries/${entryId}`,
                method: 'DELETE',
                body: { entryId }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Entry', id: arg.entryId }
            ]
        }),
    })
})
    

export const {
    useGetEntriesQuery,
    useGetSingleEntryQuery,
    useAddNewEntryMutation,
    useUpdateEntryMutation,
    useDeleteEntryMutation,
} = entriesSlice


export const selectEntriesResult = entriesSlice.endpoints.getEntries.select()

const selectEntriesData = createSelector(
    selectEntriesResult,
    entriesResult => entriesResult.data
)



export const {
    selectAll: selectAllEntries,
    selectById: selectEntryById
} = entriesAdapter.getSelectors(state => selectEntriesData(state) ?? initialState)

export const { setEntryId } = entrySlice.actions

export default entrySlice.reducer;