import { useEffect, useState } from "react"
import axios from "axios" 

function useFetch(url){

const [data, setData] = useState([])
const [error, setError] = useState(null)

async function fetchData(){
    try {
        await axios.get(url).then(
        response=>{setData(response.data)})
    } catch (error) {
        console.log(error)
    }    
    
    }

useEffect (()=>{fetchData()},[])

    return(
        {data, error}
    )
}

export default useFetch