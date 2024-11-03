'use client'
import '@/styles/dashboard.modules.css'
import { useEffect, useState } from 'react'
import { useWallet } from "@solana/wallet-adapter-react"
import UserSignUpForm from './userSignupForm'
import UserDashboard from './userDashboard'


const Dashboard = ()=>{
    const [isSuperUser,setIsSuperUser] = useState(false)
    const {publicKey} = useWallet()
    const validateUser = async()=>{
        try {
            const response = await fetch(`/api/users/get?walletPublicAddress=${publicKey}`)
            const res = await response.json()
            
            if(res.message == 'user found'){
                setIsSuperUser(true)
            }else{
                setIsSuperUser(false)
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(()=>{
        validateUser()
    },[])
    return(
        <div id='dashboard-container'>
            {
                isSuperUser ? <UserDashboard /> : <UserSignUpForm />
            }
        </div>
    )
}

export default Dashboard