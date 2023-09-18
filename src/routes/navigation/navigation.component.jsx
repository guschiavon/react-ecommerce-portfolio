import { Fragment, useContext } from "react"
import { Outlet, Link } from "react-router-dom"

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import './navigation.styles.scss'

const Navigation = () => {
  const { currentUser } = useContext(UserContext)
  
  
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to={'/'}>
          <CrwnLogo />
        </Link>      
        <div className="nav-links-container">
          <Link className="nav-link" to={'/shop'}>Shop</Link>
          {
            !currentUser
            ? <Link className="nav-link" to={'/auth'}>Sign In</Link>                        
            : <Link className="nav-link" to={'/'} onClick={signOutUser}>Sign Out</Link> 
          }
        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation