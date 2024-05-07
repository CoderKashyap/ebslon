import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../actions/userAction";
import "./guest.css";



const GuestLogin = () => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const { isAuthenticated } = useSelector((state) => state.user);

    const [registerObj, setRegisterObj] = useState({
        email: "",
        password: "",
    });
    const [passHideStatus, setPassHideStatus] = useState(false)

    useEffect(() => {
        if (isAuthenticated) {
            history("/");
        }
    }, [isAuthenticated])

    const getRegisterObjvalues = (e) => {
        const { name, value } = e.target
        setRegisterObj({ ...registerObj, [name]: value })
    };


    const registerSubmitHandler = (e) => {
        e.preventDefault();
        if (registerObj) {
            dispatch(login(registerObj.email, registerObj.password));
        } else {
            alert('Fill all required fields!')
        }
    };

    const showHidePass = () => {
        setPassHideStatus(!passHideStatus)
      }


    return (
        <>

<section>

<div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-md w-full space-y-8">
    <div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Login
      </h2>
    </div>
    <form className="mt-8 mx-4 space-y-6" encType="multipart/form-data"
                onSubmit={(e) => { registerSubmitHandler(e) }}>


          <div className="rounded-md shadow-sm -space-y-px">

            <div>
              <label htmlFor="email-address" className="sr-onl">Email address</label>
              <input id="email-addres" required name="email" value={registerObj.email} type="email" onChange={(e) => getRegisterObjvalues(e)}
                className="appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:z-10 sm:text-sm"
                placeholder="Email address" />
            </div>
            <div>
              <div className="mt-4 relative">
                <label htmlFor="password" className="sr-onl">Password</label>
                <input id="password" required name="password" value={registerObj.residenceNo} onChange={(e) => getRegisterObjvalues(e)} type={passHideStatus ? 'text' : 'password'} 
                  className="appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:z-10 sm:text-sm"
                  placeholder="Password" />
                <span onClick={() => showHidePass()} className="leye">
                  <i className="fa-solid fa-eye-low-vision"></i>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[#FE5F1E]">
            <div className="flex items-center">
              <label htmlFor="remember-me" className="ml-2 block text-sm text-[#6366F1]">
              <Link to="/"> Home </Link>
              </label>
            </div>

            <div className="text-sm">
              <Link to="/register" className="font-medium">
                Don't have account?
              </Link>
            </div>
          </div>

          <div>
            <button type="submit" className="bg-[#FE5F1E] group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white btn-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">

                <svg className="h-5 w-5 text-white-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                  fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd" />
                </svg>
              </span>
              Log in
            </button>
          </div>
    </form>
   
  </div>
</div>

</section>

        </>
    );
};

export default GuestLogin;
