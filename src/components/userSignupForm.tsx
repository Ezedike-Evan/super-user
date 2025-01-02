import { FormEvent, useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import axios from "axios"

const UserSignUpForm = () => {
    const { publicKey } = useWallet()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [telegram, setTelegram] = useState("")
    const [discord, setDiscord] = useState("")
    const [twitter, setTwitter] = useState("")
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const validateInputs = () => {
        const newErrors: { [key: string]: string } = {}

        if (!name.trim()) newErrors.name = "Name cannot be empty"
        if (!email.trim()) newErrors.email = "Email cannot be empty"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleUserSignUp = async (e: FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        
        if (!publicKey) {
            setErrors({publicKey:'please connect your wallet to continue'})
            setIsSubmitting(false)
            return
        }

        if (!validateInputs()) return


        try {
            const response = await axios.post('/api/users/post/', {
                walletPublicAddress: publicKey.toBase58(),
                name,
                email,
                telegram,
                discord,
                twitter,
            })

            if (response) {
                window.location.reload()
            }
        } catch (error) {
            console.error(error)
            window.location.reload()
        } finally {
            setIsSubmitting(false)
            window.location.reload()
        }
    }

    const handleInputChange = (setter: (value: string) => void, field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value)

        // Remove the error message for this specific field if it exists
        if (errors[field]) {
            setErrors((prevErrors) => {
                const updatedErrors = { ...prevErrors }
                delete updatedErrors[field]
                return updatedErrors
            })
        }
    }

    return (
        <div className="userSignUpForm">
            <p>
                Welcome onboard super team. 
                Let&apos;s get you locked and loaded into this rich community of Solana devs, writers, designers, etc., 
                passionate about building on Solana. Sign up now!!
            </p>
            <form onSubmit={handleUserSignUp}>
            {errors.publicKey && <sub style={{textAlign:'center',fontSize:20,color:'red',letterSpacing:1,textTransform:'capitalize'}}>{errors.publicKey}</sub>}
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleInputChange(setName, 'name')}
                    placeholder="Enter your name"
                />
                {errors.name && <sub>{errors.name}</sub>}

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleInputChange(setEmail, 'email')}
                    placeholder="Enter your Email Address"
                />
                {errors.email && <sub>{errors.email}</sub>}

                <label htmlFor="telegram">Telegram Handle</label>
                <input
                    type="text"
                    id="telegram"
                    value={telegram}
                    onChange={handleInputChange(setTelegram, 'telegram')}
                    placeholder="Enter your Telegram handle"
                />

                <label htmlFor="discord">Discord Handle</label>
                <input
                    type="text"
                    id="discord"
                    value={discord}
                    onChange={handleInputChange(setDiscord, 'discord')}
                    placeholder="Enter your Discord handle"
                />

                <label htmlFor="twitter">Twitter Handle</label>
                <input
                    type="text"
                    id="twitter"
                    value={twitter}
                    onChange={handleInputChange(setTwitter, 'twitter')}
                    placeholder="Enter your Twitter handle"
                />

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    )
}

export default UserSignUpForm