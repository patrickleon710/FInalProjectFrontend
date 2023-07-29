import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate, useParams } from "react-router-dom";

import { memo } from "react";

import { setEntryId } from "../features/entries/entriesSlice";

import {
  selectAllEntries,
  useDeleteEntryMutation,
  useGetEntriesQuery,
} from "../features/entries/entriesSlice";
import TimeCreated from "../features/entries/TimeCreated";

const Entries = ({ EntryId }) => {
 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isSuccess } = useGetEntriesQuery();

  

  const entries = useSelector(selectAllEntries);

  const entryId = useSelector((state) => state.entry.entryId)

  const [deleteEntry, {
    isSuccess: isDelSuccess
  }] = useDeleteEntryMutation()

  const onDeleteEntry = async (EntryId) => {
    await dispatch(setEntryId(EntryId))
    console.log('deleted', EntryId)
    
      try {
        await deleteEntry({ entryId: EntryId})
      } catch (error) {
        console.error(error)
      }

    
  }

  const onEntryClick = (entryId) => {
    navigate(`entries/${entryId}`);
  };

  const renderedEntries = entries
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .map((entry) => (
    <div key={entry.id}>
      <section key={entry.id} className="entries-entry">
        <div className='entries-date'>
                <TimeCreated/>
            </div>
        <h3 className="entries-heading">{entry.title}</h3>
        <p className="entries-content">{entry.content}</p>
        <button onClick={() => onEntryClick(entry.id)} className="entry-buttons">View</button>
        <button onClick={() => onDeleteEntry(entry.id)} className='entry-buttons'>Delete</button>
      </section>
    </div>
  ));

  let result;

  if (isLoading) {
    result = <p>"Loading..."</p>;
  } else if (isSuccess) {
    result = renderedEntries;
  } else if (!isSuccess) {
    result = <p className="no-entries">No entries</p>;
  }

  return (
    <section>
      <div className="home-links">
        <Link to="new" className="home-nav__links">
          Create New Entry
        </Link>
      </div>
      {result}
    </section>
  );
};

const memoizedEntries = memo(Entries)

export default memoizedEntries;
