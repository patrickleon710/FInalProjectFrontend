import { Routes, Route, useParams } from "react-router-dom";
import EditEntries from "./pages/EditEntries";
import Entries from "./pages/Entries";
import Home from "./pages/Home";
import Info from "./pages/Info";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import NewEntry from "./pages/NewEntry";
import AppLayout from "./components/AppLayout";
import Signin from "./pages/Signin";
import SingleEntry from "./pages/SingleEntry";
import {
  useGetEntriesQuery,
} from "./features/entries/entriesSlice";
import PersistLogin from './features/auth/PersistLogin'
import Prefetch from './features/auth/Prefetch'

function App() {
  const { username } = useParams();

  const {  entry } = useGetEntriesQuery('entriesList', {
    selectFromResult: ({data}) => ({
      entry: data?.entities[username]
    })
  });

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index path="/" element={<Login />} />
        <Route path="sign-up" element={<Signin />} />

        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            <Route path="/app/:username" element={<AppLayout />}>
              {/* Protected routes */}
              <Route index element={<Home />} />

              <Route path="entries">
                <Route index element={<Entries userEntries={entry}/>} />
                <Route path="entries/:entryId" element={<SingleEntry />} />
                <Route path="edit/:entryId" element={<EditEntries />} />
                <Route path="new" element={<NewEntry />} />
              </Route>

              <Route path="info" element={<Info />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
