import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const userAdapter = createEntityAdapter({
    //sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = userAdapter.getInitialState()

export const userSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query({
            query: () => ({
                url: '/user',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedUser = responseData.map(user => {
                    user.id = user._id
                    return user
                })
                return userAdapter.setAll(initialState, loadedUser)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'User', id: 'LIST'},
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }]
            }
        }),
        addNewUser: builder.mutation({
            query: initialUser => ({
                url: '/user',
                method: 'POST',
                body: {
                    ...initialUser,
                }
            }),
            invalidatesTags: [
                { type: 'User', id: "LIST" }
            ]
        }),
        updateUser: builder.mutation({
            query: initialUser => ({
                url: '/user/:id',
                method: 'PATCH',
                body: {
                    ...initialUser,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/user/:id`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
    })
})
    

export const {
    useGetUserQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userSlice


export const selectUserResult = userSlice.endpoints.getUser.select()

const selectUserData = createSelector(
    selectUserResult,
    userResult => userResult.data
)


export const {
    selectAll: selectAllUser,
    selectById: selectUserById
} = userAdapter.getSelectors(state => selectUserData(state) ?? initialState)