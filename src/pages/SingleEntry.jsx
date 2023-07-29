import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useDeleteEntryMutation } from '../features/entries/entriesSlice';


import { selectEntryById } from '../features/entries/entriesSlice';
import TimeCreated from '../features/entries/TimeCreated';

const SingleEntry = () => {

    const { entryId } = useParams();
    const { userName } = useParams();

    const navigate = useNavigate()

    const [title, setTitle ] = useState('')
    const [content, setContent ] = useState('')

    const entry = useSelector((state) => selectEntryById(state, entryId));   

    

    useEffect(() => {
        if (entry ){
          const foundEntry = entry || {}
          setTitle(foundEntry.title)
          setContent(foundEntry.content)
        }
    }, [entry])

    

      const onClickBack =  () => {
            navigate(`/app/${userName}/entries`)    
        }
      
      



      
  return  (
   
      
        <section key={entryId} className="entries-entry">
          <div className='entries-date'>
                <TimeCreated/>
            </div>
          <h3 className="entries-heading">{title}</h3>
          <p className="entries-content">{content}</p>
         
          <button 
          onClick={onClickBack}
          className='entry-buttons'>Back</button>
        </section>
      
    
  );

}

export default SingleEntry