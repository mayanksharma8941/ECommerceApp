import React from "react";
 import { NavLink,Link } from "react-router-dom";
 import {FaShoppingBasket} from 'react-icons/fa';
 import { useAuth } from "../../context/auth";
 import toast from "react-hot-toast";
 import SearchInput from "../Form/SearchInput";
 import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
 import { Badge } from "antd";

const Header = () => {
  const [auth,setAuth]=useAuth()
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout =() =>{
    setAuth({
      ...auth, user:null,token:''
    })
    localStorage.removeItem("auth");
    toast.success("logout successfully");
  }
  return (
  <>
 <nav className="navbar navbar-expand-lg">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link to="/" className="navbar-brand" >
      <FaShoppingBasket/> Grocery Hub</Link>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <SearchInput/>
        <li className="nav-item">
          <NavLink to="/"  className="nav-link ">Home</NavLink>
        </li>
        <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
        {
          !auth.user ?(
            <>
            <li className="nav-item">
          <NavLink to="/register"  className="nav-link" href="#">register</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/login"  className="nav-link" href="#">login</NavLink>
        </li>
            </>
          ):(
            <>
               <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none",color:"white" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  {/* <li className="nav-item">
          <NavLink onClick={handleLogout} to="/login"  className="nav-link" href="#">Logout</NavLink>
        </li> */}
            </>
          )
        }
        <li className="nav-item">
        <NavLink to="/cart" className="nav-link">
                  <Badge count={cart?.length} showZero offset={[10, -5]}>
                    <span style={{color:"white"}}>Cart</span>
                  </Badge>
                </NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink to="/"  className="nav-link disabled">Disabled</NavLink>
        </li> */}
      </ul>
      {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
    </div>
  </div>
</nav>

  </>
  );
  };


export default Header;


  //   <>
  //   <nav class="navbar navbar-expand-lg bg-light">
  //   <div class="container-fluid">
  //     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
  //       <span class="navbar-toggler-icon"></span>
  //     </button>
  //     <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
  //       <a class="navbar-brand" href="#">Hidden brand</a>
  //       <ul class="navbar-nav me-auto mb-2 mb-lg-0">
  //         <li class="nav-item">
  //           <a class="nav-link active" aria-current="page" href="#">Home</a>
  //         </li>
  //         <li class="nav-item">
  //           <a class="nav-link" href="#">Link</a>
  //         </li>
  //         <li class="nav-item">
  //           <a class="nav-link disabled">Disabled</a>
  //         </li>
  //       </ul>
  //       <form class="d-flex" role="search">
  //         <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
  //         <button class="btn btn-outline-success" type="submit">Search</button>
  //       </form>
  //     </div>
  //   </div>
  // </nav>
  // </>