import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  useDeleteEntryMutation,
  selectEntryById,
  useUpdateEntryMutation,
  useGetSingleEntryQuery,
} from "./entriesSlice";

const EditEntriesForm = () => {
  const navigate = useNavigate();
  const { entryId } = useParams();

  const parsedEntryId = Number(entryId)

  const { data: entry, isLoading } = useGetSingleEntryQuery(parsedEntryId);

  

  /* const journalEntry = useSelector(selectEntryById)

  const Entry = useSelector((state) => selectEntryById(state, Number(entryId))) */

  const [updateEntry] = useUpdateEntryMutation();

  const [deleteEntry] = useDeleteEntryMutation();

  const [title, setTitle] = useState(entry?.title);
  const [content, setContent] = useState(entry?.content);

  const canSave = [title, content].every(Boolean) && !isLoading;

  useEffect(() => {
    if (entry) {
      setTitle(entry?.title);
      setContent(entry?.content);
    }
  }, [entry]);

  const onSaveEntry = async () => {
    console.log(parsedEntryId);
    console.log(typeof(parsedEntryId));
    /* if (canSave) {
      try {
        await updateEntry({ id: entryId, title, content }).unwrap();

        setTitle("");
        setContent("");
        navigate("entries");
      } catch (error) {
        console.error("Unable to save post", error);
      }
    } */
  };

  const onDeleteEntry = async () => {
    try {
      await deleteEntry({ id: entryId }).unwrap();

      setTitle("");
      setContent("");
      navigate("entries");
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const form = (
    <form className="new-entry__form">
      <div className="form-div">
        <h2>Edit Entry</h2>
        <label htmlFor="title">Title:</label>
        <input
          autoComplete="off"
          className="new-entry__title"
          id="title"
          name="title"
          onChange={onTitleChanged}
          type="text"
          value={title}
        />
        <label htmlFor="content">Content:</label>
        <textarea
          autoComplete="off"
          className="new-entry__content"
          id="content"
          name="content"
          onChange={onContentChanged}
          value={content}
        />
        <button type="button" onClick={onSaveEntry}>
          Save
        </button>
        <button type="button" onClick={onDeleteEntry}>
          Delete
        </button>
      </div>
    </form>
  );

  return isLoading ? <div>Loading...</div> : form;
};

export default EditEntriesForm;
