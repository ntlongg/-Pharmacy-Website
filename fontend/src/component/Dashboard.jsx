import React from 'react';
import dt1 from '../assets/image/dt1.png';
import dt2 from '../assets/image/dt2.png';
import dt3 from '../assets/image/dt3.png';


const Dashboard = () => {
    return (
        <div className="p-4">
            <div className="bg-white rounded-lg shadow p-4 mb-4">
                <h2 className="text-gray-700 text-lg font-semibold mb-2">Doanh thu bán hàng</h2>
                <img src={dt1} alt="Graph showing EBITDA trends" className="w-full h-64 object-cover rounded-lg"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-gray-700 text-md font-semibold mb-2">Tỷ suất lợi nhuận ròng</h3>
                    <img src={dt2} alt="Bar chart showing Net Profit Margin" className="w-full h-40 object-cover rounded-lg"/>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-gray-700 text-md font-semibold mb-2">Tỷ lệ nợ trên vốn chủ sở hữu</h3>
                    <img src={dt3} alt="Bar chart showing Debt-to-Equity Ratio" className="w-full h-40 object-cover rounded-lg"/>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-gray-700 text-md font-semibold mb-2">
                    Doanh thu trước thuế</h3>
                    <p className="text-3xl font-bold text-gray-800">$24.5</p>
                    <p className="text-green-500">↑ 13%</p>
                    <p className="text-gray-500 text-sm">so với 7 ngày trước đó</p>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-gray-700 text-md font-semibold mb-2">Tỷ suất lợi nhuận trung bình</h3>
                    <p className="text-3xl font-bold text-gray-800">9.5%</p>
                    <p className="text-green-500">↑ 1</p>
                    <p className="text-gray-500 text-sm">so với 7 ngày trước đó</p>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-gray-700 text-md font-semibold mb-2">
                    Lợi tức đầu tư (ROI)</h3>
                    <p className="text-3xl font-bold text-gray-800">19.1%</p>
                    <p className="text-green-500">↑ 8%</p>
                    <p className="text-gray-500 text-sm">so với 7 ngày trước đó</p>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-gray-700 text-md font-semibold mb-2">CLV</h3>
                    <p className="text-3xl font-bold text-gray-800">$2,176</p>
                    <p className="text-green-500">↑ 2.3%</p>
                    <p className="text-gray-500 text-sm">so với 7 ngày trước đó</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard