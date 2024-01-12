import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';


const links = [
 { id: 1, url: '/', text: 'home' },
 { id: 2, url: 'manage-patient', text: 'Manage patient' },
 { id: 3, url: 'medical-history', text: 'Medical Records' },
 { id: 4, url: 'appointments', text: 'Appointments' },
];


const NavLinks = () => {
 const user = useSelector((state) => state.userState.user);
 return (
   <>
     {links.map((link) => {
       const { id, url, text } = link;
       if ((url === 'manage-patient' || url === 'medical-history'|| url === 'appointments') && !user) return null;
       return (
         <li key={id}>
           <NavLink className='capitalize' to={url}>
             {text}
           </NavLink>
         </li>
       );
     })}
   </>
 );
};
export default NavLinks;