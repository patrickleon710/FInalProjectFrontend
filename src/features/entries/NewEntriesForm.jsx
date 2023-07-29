import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAddNewEntryMutation } from "./entriesSlice";
import { set } from "date-fns";
import useAuth from "../../hooks/useAuth";

const NewEntriesForm = () => {

  const {username} = useAuth()
  const navigate = useNavigate()
  
  const [addNewEntry] = useAddNewEntryMutation()
  /* const users = useSelector(selectAllUsers); */

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  
  const canSave = [title, content].every(Boolean)

  const onSaveNewEntry = async () => {

    if (canSave) {
      try {
        
        await addNewEntry({ title, content }).unwrap()

        setTitle('')
        setContent('')
        navigate(`/app/${username}/entries`)        
      } catch (error) {
        console.error('Unable to save post')
      }
    } 
  }
  


  const form = (
    <form className="new-entry__form">
      <div className="form-div">
        <h2>Create New Entry</h2>
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
        <button type="button"
        onClick={onSaveNewEntry}
        >Save</button>
      </div>
    </form>
  );

  return form;
};

export default NewEntriesForm;
