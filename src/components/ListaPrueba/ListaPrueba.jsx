import { useState } from "react"

const ListaPrueba = () => {
    const [status, setStatus] = useState("")

    const options = [
        {
            key: 1,
            value: "To do"
        },
        {
            key: 2,
            value: "In progress"
        },
        {
            key: 3,
            value: "Blocked"
        },
        {
            key: 4,
            value: "Completed"
        }
    ]

    const handleChange = e => {
        const selectedStatus = e.target.value
        setStatus(selectedStatus)
    }

    return (
        <>
            <select onChange={(e) => handleChange(e)}>
                {options.map(x => {
                    return <option key={x.key} value={x.key}>{x.value}</option>
                })}
            </select>
        </>
    )
}

export default ListaPrueba