// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useEffect, useState} from "react";
import Button from "./Button";
import { FaBarsStaggered } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";

export default function Navbar() {
  const firebaseConfig = {
    apiKey: "AIzaSyDU6jbiYYF6GM1wZVE7G1uqzbuLI4nhTDY",
    authDomain: "job-portal-mern-c0ff5.firebaseapp.com",
    projectId: "job-portal-mern-c0ff5",
    storageBucket: "job-portal-mern-c0ff5.appspot.com",
    messagingSenderId: "780393468538",
    appId: "1:780393468538:web:a13705c8014ddb6352a1c3",
  };

  const app = initializeApp(firebaseConfig);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggler = () => setIsMenuOpen(!isMenuOpen);
  const auth = getAuth(app);
  const [isLogin, setIslogin] = useState(false);
  const [selected, setSelected] = useState(0);
  const [user, setUser] = useState(null); // Initialize user state
  const googleProvider = new GoogleAuthProvider();
  const handleLogin = () => {
 
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setIslogin(true);
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Successfully logged in")

        // ...
      })
      .catch((error) => {
        alert("Login failed");
        console.log(error);
        // ...
      });
  };

  const handleLogout = () => {
    signOut(auth).then(() => console.log("LOGGED OUT SUCCESSFULLY"));
    localStorage.removeItem("user");
    setIslogin(false);
    setUser(null);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else setUser(null);
  }, [isLogin]);

  const navItems = [
    {
      title: "Start a search",
      path: "/",
    },
    {
      title: "My Jobs",
      path: "/my-jobs",
    },

    {
      title: "Post Job",
      path: "/post-job",
    },
  ];

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4  gap-2">
  
   
      <nav className="flex items-start justify-between py-6">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
        <Link to="/" onClick={()=>setSelected(0)} className="text-xl font-black font-serif">
          ProCareer
        </Link>
        <a href="https://new-portfolio-theta-jade.vercel.app" className=" ml-5 md:ml-0 md:mt-4 text-purple-500 text-sm font-bold hover:text-purple-800" target="_blank">By Tushar Bhatt</a>
        </div>
        {/* for larger screens */}
        <ul className="hidden  lg:flex items-center gap-7">
          {navItems.map(({ path, title }, index) => (
            <Link
              to={path}
              className={`${selected === index && "text-blue-500"}`}
              key={title}
              onClick={() => setSelected(index)}
            >
              {title}
            </Link>
          ))}
        </ul>
        <div className="hidden lg:flex">
          {user ? (
            <div className="flex items-center gap-2">
              <img src={`${user.photoURL}`} className="h-8 w-8 rounded-full" />
              <Button title="Logout" onClick={handleLogout} />
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-4">
              <Button onClick={handleLogin} title="Login" />
            </div>
          )}
        </div>

        {/* mobile view */}
        <div className="flex lg:hidden items-center gap-7">
          <div>
            {user ? (
              <div className="flex items-center gap-2 inset-0">
                <img
                  src={`${user.photoURL}`}
                  className="h-8 w-8 rounded-full"
                />
                
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-4">
                <Button onClick={handleLogin} title="Login" />
              </div>
            )}
          </div>
          <div>
            <button onClick={handleMenuToggler}>
              {isMenuOpen ? (
                <MdOutlineCancel size={22} />
              ) : (
                <FaBarsStaggered size={22} />
              )}
            </button>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="bg-black  text-slate-400 flex lg:hidden flex-col p-4 gap-7">
          {navItems.map(({ path, title }) => (
            <div key={path}>
              <Link
                onClick={() => setSelected(title)}
                to={path}
                className={`${
                  selected === title && "text-blue-500"
                } hover:text-white`}
              >
                {title}
              </Link>
            </div>
          ))}
          <Button title={user ? "Logout" : "Login"} onClick={user ? handleLogout : handleLogin} />
        </div>
      )}
    </header>
  );
}
