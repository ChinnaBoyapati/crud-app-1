import axios from "axios"

export const URL="http://localhost:6070"
export const URL2="https://dummyjson.com"

export const invokeGetApi =async(url,payload)=>{
    try{

        return await axios.get(url,payload)
    }
    catch({response}){
        return response
    }
}

export const invokedPostApi =async(url,payload)=>{
    try{
        return await axios.post(url,payload)
    }
    catch({response}){
        return response
    }
}


export const invokedPutApi =async(url,payload)=>{
    try{
        return await axios.put(url,payload)
    }
    catch({response}){
        return response
    }
}

export const invokeDeleteApi =async(url,payload)=>{
    try{
        return await axios.delete(url,payload)
    }
    catch({response}){
        return response
    }
}


export const apiList={
     getCourse:"/courses/",
     getUsers:"/users/"
}