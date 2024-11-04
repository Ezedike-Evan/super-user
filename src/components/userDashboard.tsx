import { useUser } from "@/contexts/userContext"
const UserDashboard = ()=>{
    const {user} = useUser()
    return(
        <>
            <div style={{marginBottom:30}}>
                <p>welcome back</p>
                { user?.name }
            </div>
            <div>
                <div>
                    <p>number of community event atttended</p>
                    0
                </div>
                <div>
                    <p>number of community calls atttended</p>
                    10
                </div>
                <div>
                    <p>superteam points</p>
                    5000
                </div>
            </div>
        </>
    )
}

export default UserDashboard