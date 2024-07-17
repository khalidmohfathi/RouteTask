import React from 'react';
import { NavLink } from 'react-router-dom';
import { Tooltip } from 'react-tooltip'
import logo from '../../Assets/Images/route.png'

const Sidebar = () => {
   return (
      <>
         <Tooltip id="my-tooltip" />
         <nav id="side">
            <div id="sidebar" className="d-md-flex d-none bg-dark flex-column justify-content-between text-white">
               <img src={logo} className='p-2 rounded-circle w-100' alt="Route's Logo" />
               <div>
                  <NavLink to={'/'} className='nav-side p-3' data-tooltip-id="my-tooltip" data-tooltip-content="Home">
                     <span>
                        <i className="fa-solid fa-home fa-xl" />
                     </span>
                  </NavLink>
                  <NavLink to={'/table'} className='nav-side p-3' data-tooltip-id="my-tooltip" data-tooltip-content="Table">
                     <span>
                        <i className="fa-solid fa-table fa-xl" />
                     </span>
                  </NavLink>
                  <NavLink to={'/graph'} className='nav-side p-3' data-tooltip-id="my-tooltip" data-tooltip-content="Graph">
                     <span>
                        <i className="fa-solid fa-chart-column fa-xl" />
                     </span>
                  </NavLink>
               </div>
               <img width={64} height={64} className='opacity-0' />
            </div>
         </nav>

         <nav id='tab'>
            <div id='tab-bar' className="d-md-none d-flex justify-content-around bg-dark text-white">
               <NavLink to={'/'} className='nav-side p-3'>
                  <span>
                     <i className="fa-solid fa-home fa-fw" /> Home
                  </span>
               </NavLink>
               <NavLink to={'/table'} className='nav-side p-3'>
                  <span>
                     <i className="fa-solid fa-table fa-fw" /> Table
                  </span>
               </NavLink>
               <NavLink to={'/graph'} className='nav-side p-3'>
                  <span>
                     <i className="fa-solid fa-chart-column fa-fw" /> Graph
                  </span>
               </NavLink>
            </div>
         </nav>
      </>
   );
};

export default Sidebar;
