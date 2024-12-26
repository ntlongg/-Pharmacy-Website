import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import emptycart from '../assets/image/empty-cart.svg';
import displayVNCurrency from '../helpers/displayCurrency';
import Context from '../context';
import { toast } from 'react-toastify'

const ViewOderCus = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);

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
            context.fetchUserAddToCart();
        }
    };

    const AcceptOrder = async (id) => {
        const response = await fetch(SummaryApi.updataOrderAccept.url, {
            method: SummaryApi.updataOrderAccept.method,
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
        <div className='container mx-auto'>
            <div className='text-center text-lg'>
                {data.length === 0 && !loading && (
                    <div className='pt-28'>
                        <div className='flex justify-center'>
                            <img src={emptycart} alt='emptycart' className='w-24 pt-36' />
                        </div>
                        <div className='pt-3'>
                            <p className='pt-3 text-center'>Oops! Đơn hàng của bạn chưa có sản phẩm nào!</p>
                        </div>

                    </div>
                )}
            </div>

            {/* Sản phẩm */}
            <div className='flex-col lg:flex-row pt-28'>
                <p className='text-center text-2xl'>Đơn hàng của tôi</p>
                <div className='w-full max-w-3xl'>
                    {data.map((order) => (
                        <div className='w-full bg-white h-32 mb-16 grid grid-cols-[128px,1fr]'>
                            <div className='px-4 py-2 relative'>
                                <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1 w-96'>Mã đơn hàng: {order?._id}</h2>
                                <div key={order?._id + "Add To Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                <div className='w-32 h-32 bg-slate-200'>
                                    <img src={order?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                                </div>
                                <div className='px-4 py-2 relative'>
                                    <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1 w-96'>{order?.productId?.productName}</h2>
                                    <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1 w-96'>Trạng thái: {order?.status}</h2>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-red-600 font-medium text-lg'>Tổng giá trị: {displayVNCurrency(order?.totalPrice)}</p>
                                        <p className='text-slate-600 font-semibold text-lg'>Số lượng: {(order?.totalQty)}</p>
                                    </div>
                                    <div className=' rounded-xl p-2 bg-red-500 w-40 text-center ml-24 '>
                                    {/* Kiểm tra trạng thái của đơn hàng để hiển thị nút phù hợp */}
                                    {order.status === 'Đã xác nhận, đang giao hàng' && (
                                         <button onClick={() => AcceptOrder(order._id)}>Đã nhận đơn hàng</button>)}
                                    {order.status === 'Chờ xác nhận' && (
                                        <button onClick={() => deleteCartProduct(order._id)}>Huỷ đơn hàng</button>)}
                                    {order.status === 'Đã nhận hàng' && (
                                    <button onClick={() => deleteCartProduct(order._id)}>Đánh giá</button>)}

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

export default ViewOderCus;