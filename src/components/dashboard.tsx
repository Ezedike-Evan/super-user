'use client'
import '@/styles/dashboard.modules.css'
import { useEffect, useState } from 'react'
import { useWallet } from "@solana/wallet-adapter-react"
import { useUser } from '../contexts/userContext'
import UserSignUpForm from './userSignupForm'
import UserDashboard from './userDashboard'
import Loader from '../utils/loader'

const Dashboard = ()=>{
    const [isSuperUser,setIsSuperUser] = useState(true)
    const [isLoading,setIsLoading] = useState(false)
    const {publicKey} = useWallet()
    const {setUser} = useUser()

    const validateUser = async()=>{
        setIsLoading(true)
        try{
            const response = await fetch(`/api/users/get?walletPublicAddress=${publicKey}`)
            const res = await response.json()
            console.log(res)
            if(res.status === 200){
                setUser(res.user)
                setIsSuperUser(true)
                
            } else if(res.status !== 200){
                setIsSuperUser(false)
            }
        }catch(error){
            console.error(error)
        }
        setIsLoading(false)
    }
    useEffect(()=>{
        validateUser()
    },[])

    if(isLoading) return <Loader />
    return(
        <div id='dashboard-container'>
            {
                isSuperUser ? <UserDashboard /> : <UserSignUpForm />
            }
        </div>
    )
}

export default Dashboard
