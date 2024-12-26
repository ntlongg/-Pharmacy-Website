
import SummaryApi from "../common"
import { toast } from 'react-toastify'



const AddToOder = async(e,id) =>{
    e?.stopPropagation()
    e?.preventDefault()

    const response = await fetch(SummaryApi.Cartupdate.url,{
        method : SummaryApi.Cartupdate.method,
        credentials : 'include',
        headers : {
            "content-type" : 'application/json'
        },
        body : JSON.stringify(
            { productId : id }
        )
    })
    const responseData = await response.json()

    if(responseData.success){
        toast.success(responseData.message)
        console.log('long2',responseData)
    }

    if(responseData.error){
        toast.error(responseData.message)
    }


    return responseData

}



export default AddToOder