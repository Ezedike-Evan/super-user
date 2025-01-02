import { useState } from "react"
import CreateNewEvent from "./createNewEvent"
const UserDashboard = ()=>{
    const [clickEvent, setClickEvent] = useState<string>('home')
    
    if(clickEvent == 'create'){
        return(
            <CreateNewEvent />
        )
    } 

    return(
        <div id="userdashboardcard">
            <button onClick={()=>setClickEvent('create')}>create new event</button>
            <button>view all Events</button>
        </div>
    )
}

export default UserDashboard