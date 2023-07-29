import { store } from '../../app/store'
import { entriesSlice } from '../entries/entriesSlice'
import { userSlice } from '../users/usersSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {

    useEffect(() => {
        store.dispatch(entriesSlice.util.prefetch('getEntries', 'entriesList', { force: true }))
        store.dispatch(userSlice.util.prefetch('getUser', 'userList', { force: true }))
    }, [])

    return <Outlet />
}
export default Prefetch
