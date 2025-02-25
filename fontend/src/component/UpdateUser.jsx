import React, { useState } from 'react';
import ROLE from '../common/role';
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc,
}) => {
    const [userRole, setUserRole] = useState(role);
    const [userName, setUserName] = useState(name);
    const [userEmail, setUserEmail] = useState(email);

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value);
    }

    const updateUserRole = async () => {
        const fetchResponse = await fetch(SummaryApi.updateUser.url, {
            method: SummaryApi.updateUser.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
                name: userName,
                email: userEmail,
                role: userRole
            })
        });

        const responseData = await fetchResponse.json();

        if (responseData.success) {
            toast.success(responseData.message);
            onClose();
            callFunc();
        }

        console.log("role updated", responseData);
    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
            <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
                <button className='block ml-auto' onClick={onClose}>
                    <IoMdClose />
                </button>

                <h1 className='pb-4 text-lg font-medium'>Quản lý người dùng</h1>

                <p>Tên : <input type="text" value={userName} className='border px-4 py-1' onChange={(e) => setUserName(e.target.value)} /></p>
                <p>Email : <input type="text" value={userEmail} className='border px-4 py-1' onChange={(e) => setUserEmail(e.target.value)} /></p>

                <div className='flex items-center justify-between my-4'>
                    <p>Vai trò :</p>
                    <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
                        {Object.values(ROLE).map(el => (
                            <option value={el} key={el}>{el}</option>
                        ))}
                    </select>
                </div>
                <button className='w-fit mx-auto block py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700' onClick={updateUserRole}>Lưu thay đổi</button>
            </div>
        </div>
    );
}

export default ChangeUserRole;