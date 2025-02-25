import React, { useContext, useState } from 'react'
import { CgClose } from "react-icons/cg";
import SummaryApi from '../common';
 import { toast } from 'react-toastify'
import Context from '../context';

const Oder = ({ 
  onClose,
}) => {
    const [data,setData] = useState({
      Address : "",
      Phone : "",
  })
  const { fetchUserAddToCart } = useContext(Context)

  const handleOnChange = (e)=>{
    const { name, value} = e.target

    setData((preve)=>{
      return{
        ...preve,
        [name]  : value
      }
    })
}
const handleSubmit = async(e,id) =>{
  e.preventDefault()
  const response = await fetch(SummaryApi.Cartupdate.url,{
    method : SummaryApi.Cartupdate.method,
    credentials : 'include',
    headers : {
      "content-type" : "application/json"
    },
    body: JSON.stringify({ ...data, productId: id })
    
  })

  const responseData = await response.json()

  if(responseData.success){
      toast.success(responseData?.message)
      onClose()
      console.log("dât2",responseData)
      fetchUserAddToCart()
  }


  if(responseData.error){
    toast.error(responseData?.message)
    onClose()
  }
}

  return (
    <div className='fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>

        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden '>

            <div className='flex justify-between items-center pb-3'>
                <h2 className='font-bold text-lg'>Thông Tin giao hàng</h2>
                <button className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                <CgClose/>
                </button>     
                           
            </div>
            <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>

                <label htmlFor='Address' className='mt-3'>Địa chỉ giao hàng :</label>
                <input 
                type='text' 
                id='Adress' 
                placeholder='Vui lòng nhập địa chỉ' 
                value={data.Address} 
                name='Address'
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
                />

                <label htmlFor='Phone' className='mt-3'>Số điện thoại :</label>
                <input 
                type='number' 
                id='Phone' 
                placeholder='Vui lòng nhập địa chỉ' 
                value={data.Phone} 
                name='Phone'
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
                />   
                <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Đặt Hàng</button>
            </form>
  
        </div>

    </div>
  )
}

export default Oder