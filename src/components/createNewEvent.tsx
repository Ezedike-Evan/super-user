import React, { useState } from "react"

const CreateNewEvent = ()=>{
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

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

    const handleDescriptionChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        if(e.target.value.length <= 300){
            setDescription(e.target.value)
        }
    }
    return(
        <div id="userdashboardcard" className="userSignUpForm">
            <form>
                <label htmlFor="name">Name Of The Event</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleInputChange(setName, 'name')}
                    placeholder="Enter Event Name"
                />

                <label htmlFor="discord">blinks link expiry date</label>
                <input type="datetime-local" name="" id="" />

                <label htmlFor="twitter">Event Description</label>
                <textarea 
                id = "description" 
                placeholder = "Enter a brief description"
                onChange={handleDescriptionChange}
                value={description}
                ></textarea>
                <h6 style={{float:'right'}}>{description.length} / 300 characters</h6>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating Event..." : "Create Event"}
                </button>
            </form>
        </div>
    )
}

export default CreateNewEvent