import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import { CLEAR_ERRORS } from "../../constants/userConstants";
import { logout } from "../../actions/userAction";

const Home = () => {

  const dispatch = useDispatch();

  useEffect(()=>{
    // dispatch({ type: CLEAR_ERRORS });
  },[])


  return (
    <>Hey Ebslon
    {/* <div onClick={() => logout()}>Log out</div> */}
    </>
  );
};

export default Home;
