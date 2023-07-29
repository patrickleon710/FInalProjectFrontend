
import { format } from 'date-fns'

const TimeCreated = () => {

  
  
  
  
      const dateTime = format(new Date(), 'yyyy/MM/dd')
      
    

  return (
    <div>
      <p>{dateTime}</p>
    </div>
  )
}

export default TimeCreated