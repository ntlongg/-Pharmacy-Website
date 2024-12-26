import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import emptycart from '../assets/image/empty-cart.svg';
import displayVNCurrency from '../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify'

const ViewOder = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProductorder = async () => {
        const response = await fetch(SummaryApi.ViewAllOrder.url, {
            method: SummaryApi.ViewAllOrder.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
        });

        const responseData = await response.json();

        if (responseData.success) {
            setData(responseData.data);
            console.log('data ne', responseData);
        }
    };

    const handleLoading = async () => {
        await fetchProductorder();
    };

    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteOrder.url, {
            method: SummaryApi.deleteOrder.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({
                _id: id,
            })
        });

        const responseData = await response.json();

        if (responseData.success) {
            fetchProductorder();
        }
    };


    const updateCartProduct = async (id) => {
        const response = await fetch(SummaryApi.updataOrder.url, {
            method: SummaryApi.updataOrder.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({
                _id: id,
            })
        });

        const responseData = await response.json();

        if (responseData.success) {
            fetchProductorder();
            toast.success(responseData.message);
        }
    };


    useEffect(() => {
        const fetchDataAndUpdateLoading = async () => {
            setLoading(true);
            await handleLoading();
            setLoading(false);
        };
        fetchDataAndUpdateLoading();
    }, []);

    return (
        <div className='container mx-auto flex'>
            <div className='text-center text-lg'>
                {data.length === 0 && !loading && (
                    <div>
                        <div className='pl-32'>
                            <img src={emptycart} alt='emptycart' className='w-24 pt-36' />
                        </div>
                        <div className='pt-3'>
                            <p className='pt-3'>Oops!Trang xác nhận đơn hàng của bạn chưa có sản phẩm nào!</p>
                        </div>

                    </div>
                )}
            </div>

            {/* Sản phẩm */}
            <div className='flex flex-col lg:flex-row'>
                <div className='w-full max-w-3xl'>
                    {data.map((order) => (
                        <div className='w-full bg-white h-32 mb-16 grid grid-cols-[128px,1fr]'>
                            <div className='px-4 py-2 relative'>
                                <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1 w-96'>Tên Khách hàng: {order?.userId?.name}</h2>
                                <div key={order?._id + "Add To Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                <div className='w-32 h-32 bg-slate-200'>
                                    <img src={order?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                                </div>
                                <div className='px-4 py-2 relative'>
                                    <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={() => deleteCartProduct(order?._id)}>
                                        <MdDelete />
                                    </div>
                                    <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1 w-96'>{order?.productId?.productName}</h2>
                                    <p className='capitalize text-slate-500'>Trạng thái sản phẩm: {order?.productId?.status}</p>
                                    <p className='capitalize text-black'>Trạng thái đơn hàng: {order?.status}</p>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-red-600 font-medium text-lg'>Tổng giá trị: {displayVNCurrency(order?.totalPrice)}</p>
                                        <p className='text-slate-600 font-semibold text-lg'>Số lượng: {(order?.totalQty)}</p>
                                    </div>
                                    <div className=' rounded-xl p-2 bg-red-500 w-40 text-center ml-24 '>
                                        {/* Kiểm tra trạng thái của đơn hàng để hiển thị nút phù hợp */}
                                    {order.status === 'Đã xác nhận, đang giao hàng' && (
                                         <p>Đợi xử lý </p>)}
                                    {order.status === 'Chờ xác nhận' && (
                                        <button onClick={() => updateCartProduct(order._id)}>Xác nhận đơn hàng</button>)}
                                    {order.status === 'Đã nhận hàng' && (
                                    <p> Giao hàng thành công</p>)}
                                    </div>
                                </div>
                            </div>
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewOder;