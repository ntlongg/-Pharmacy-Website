import logo from "../assets/image/logo.jpeg"
import { CiSearch } from "react-icons/ci";
import { MdAccountCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from 'react-toastify';
import { setUserDetails } from "../store/userSlice";
import { useContext, useState } from "react";
import ROLE from "../common/role";
import { FaShoppingCart } from "react-icons/fa";
import Context from '../context';


const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const context = useContext(Context)
  const[menuDisplay,setMenuDisplay] = useState(false)
  const[Menucus,setMenucus] = useState(false)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)

  const handlLogout = async () =>{
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })
    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
    }

    if(data.error){
      toast.error(data.message)
    }
  }
  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/")
    }
  }

  return (
    <nav>
      <div className='fixed z-20 w-full bg-green-500 shadow-md'>
        <div className='h-full container  flex items-center px-4 justify-between  '>
          <a href="/" className='w-20 h-20 '>
            <img className="" src={logo} alt="logo"/>
          </a>
          <div className='flex items-center  w-full max-w-sm border rounded-full border-black '>
            <input type="text" placeholder="Nhập thứ bạn tìm .." className=' ml-2 w-full outline-none pl-50 items-center bg-green-500  placeholder-black' onChange={handleSearch} value={search} />
            <button className=' focus:outline-none text-lg min-w-[50px] h-7 bg-green-600 flex items-center justify-center rounded-r-full hover:text-white'>
              <CiSearch />
            </button>
          </div>
          <div className='flex items-center  gap-14 '>
            <div className=" relative group flex justify-center">
            <div className=" relative group flex justify-center" onClick={() => { setMenuDisplay(prev => !prev); setMenucus(prev => !prev); }}>
  {
    user?._id && (
      <div className='text-4xl cursor-pointer flex justify-center'>
        {
          user?.profilePic ? (
            <img src={user?.profilePic} className="w-10 h-10 rounded-full" />
          ) : (
            <MdAccountCircle />
          )
        }
      </div>
    )
  }
</div>           
              
              {
                menuDisplay &&(
                  <div className=" absolute bg-white bottom-0 top-1 right-12 h-fit shadow-xl rounded">
                    <nav>
                      {
                        (user?.role === ROLE.ADMIN || user?.role === ROLE.PERSONNEL) && (
                          <Link to={"/admin-panel"} className=" whitespace-nowrap  md:block bg-lime-600 text-white hover:bg-green-600 hover:text-black p-2" onClick={()=>setMenuDisplay(preve => !preve)}>Trang quản trị</Link>
                        )
                      }
                    </nav>
                  </div>
                )
              }


{
  // Mở menu cho CUSTOMER khi ROLE là CUSTOMER
  Menucus &&(
  user?.role === ROLE.CUSTOMER && (
    <div className="absolute bg-white bottom-0 top-1 right-12 h-fit shadow-xl rounded">
      <nav>
        <Link to={"/oder_custommer"} className="whitespace-nowrap md:block bg-lime-600 text-white hover:bg-green-600 hover:text-black p-2" onClick={() => setMenucus(prev => !prev)}>Xem đơn hàng</Link>
      </nav>
    </div>
  )
  )
}
            </div>

            {
                     user?._id && (
                      <Link to={"/cart"} className='text-3xl relative'>
                          <span><FaShoppingCart/></span>
      
                          <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                              <p className='text-sm'>{context?.cartProductCount}</p>
                          </div>
                      </Link>
                      )
                  }

            <div>
              {   
                user?._id?(
                  <Link to={"/login"} onClick={handlLogout} className="py-1 px-2 rounded-full hover:scale-110 transition-all bg-lime-400 text-black w-full max-w-[150px] mx-auto block">Đăng xuất</Link>
                )
                : (
                  <Link to={"/login"} className="py-1 px-2 rounded-full hover:scale-110 transition-all bg-lime-400 text-black w-full max-w-[150px] mx-auto block ">Đăng Nhập</Link>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;