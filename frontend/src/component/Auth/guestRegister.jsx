import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../actions/userAction";



const GuestRegister = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const [passHideStatus, setPassHideStatus] = useState(false)

    useEffect(() => {
        if (isAuthenticated) {
            history("/");
        }
    }, [isAuthenticated])

    const [registerObj, setRegisterObj] = useState({
        name: "",
        email: "",
        password: "",
        phoneNo: ""
    });

    const getRegisterObjvalues = (e) => {
        const { name, value } = e.target
        setRegisterObj({ ...registerObj, [name]: value })
    };


    const registerSubmitHandler = (e) => {
        e.preventDefault();
        if (registerObj) {
            dispatch(register(registerObj));
        } else {
            alert('Fill all required fields!')
        }
    };


    const showHidePass = () => {
        setPassHideStatus(!passHideStatus)
      }

    return (
        <>

            {/* <form className="shippingForm bg-white sm:rounded-lg"
                encType="multipart/form-data"
                onSubmit={(e) => { registerSubmitHandler(e) }}
            >

                <div className="w-1/2">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Name
                    </label>
                    <input required name="name" value={registerObj.name} className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-name" type="text" placeholder="Name"
                        onChange={(e) => getRegisterObjvalues(e)} />
                </div>

                <div className="w-1/2">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-phoneNo">
                        Phone
                    </label>
                    <input required name="phoneNo" value={registerObj.phoneNo} className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-phoneNo" type="text" placeholder="Phone no."
                        onChange={(e) => getRegisterObjvalues(e)} />
                </div>

                <div className="w-1/2">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                        Email
                    </label>
                    <input required name="email" value={registerObj.email} className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="Email"
                        onChange={(e) => getRegisterObjvalues(e)} />
                </div>



                <div className="w-1/2">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                        Password
                    </label>
                    <input required name="password" value={registerObj.residenceNo} className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="password"
                        onChange={(e) => getRegisterObjvalues(e)} />
                </div>




                <input type="submit" />
            </form> */}

            <section>

                <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        <div>
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                Register
                            </h2>
                        </div>
                        <form className="mt-8 mx-4 space-y-6" encType="multipart/form-data"
                            onSubmit={(e) => { registerSubmitHandler(e) }}>


                            <div className="rounded-md shadow-sm -space-y-px">

                                <div>
                                    <label htmlFor="name" className="sr-onl">Name</label>
                                    <input id="name" required name="name" value={registerObj.name} type="text" onChange={(e) => getRegisterObjvalues(e)}
                                        className="appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:z-10 sm:text-sm"
                                        placeholder="Name" />
                                </div>

                                <div>
                                    <label htmlFor="Phone" className="sr-onl">Phone</label>
                                    <input id="Phone" required name="phoneNo" value={registerObj.phoneNo} type="text" onChange={(e) => getRegisterObjvalues(e)}
                                        className="appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:z-10 sm:text-sm"
                                        placeholder="Phone no." />
                                </div>

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
                                    <Link to="/guestLogin" className="font-medium">
                                        Already have account?
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
                                    Register
                                </button>
                            </div>
                        </form>

                    </div>
                </div>

            </section>

        </>
    );
};

export default GuestRegister;
