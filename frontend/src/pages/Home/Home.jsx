import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Home.css";
import { CLEAR_ERRORS } from "../../constants/userConstants";
import { logout, uploadAvatar, loadUser } from "../../actions/userAction";

const Home = () => {

  const dispatch = useDispatch();
  const { error, isAuthenticated, user } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.userAvatarMsg);


  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    dispatch({ type: CLEAR_ERRORS });
  }, [])

  useEffect(() => {
    dispatch(loadUser());
  }, [message])


  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleAvatarSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    if (avatar) {
      myForm.append("avatar", avatar);
      dispatch(uploadAvatar(myForm));
    }

  };


  return (
    <>
      <div className='w-screen h-screen flex flex-col justify-center items-center'>

        {!isAuthenticated && !isAuthenticated ?
          <div className='flex gap-10' >
            <Link to="/register"
              className="mt-2 text-white bg-[#fe5d1e] w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
            >
              Register
            </Link>
            <Link to="/login"
              className="mt-2 text-white bg-[#fe5d1e] w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
            >
              Login
            </Link>
          </div> :

          <>
            <div> <span>Username:</span> <span>{user && user.name}</span> </div>
            <div> <span>Email:</span> <span>{user && user.email}</span> </div>

            {user && !user?.avatar ?

              <form onSubmit={handleAvatarSubmit}
                className="mt-4 flex items-center justify-center"
              >
                <label htmlFor="upload"
                  className="cursor-pointer font-semibold mr-2"
                >Upload Avatar: </label>

                <input
                  required
                  type="file"
                  name="avatar"
                  id="upload"
                  accept="image/*"
                  onChange={handleImage}
                />

                <button
                  type="submit"
                  className="text-white py-2 px-4 rounded-lg my-2 w-auto bg-[#6366f1]"
                >
                  Submit
                </button>
              </form>
              : <img className='h-24 mt-10' src={user?.avatar?.url} alt="avatar"  />
            }

            <div className="mt-10 cursor-pointer text-white bg-red-500 w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100" onClick={() => dispatch(logout())}>Log out</div>

          </>
        }
      </div>
    </>
  );
};

export default Home;
