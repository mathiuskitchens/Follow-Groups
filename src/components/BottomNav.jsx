import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router';

const BottomNav = () => {

  const newButtonRef = useRef(null);

  useEffect(() => {
    const button = newButtonRef.current;
    if (button) {
      button.addEventListener('click', () => {
        button.classList.add('scale-105', 'duration-150');
        setTimeout(() => {
          button.classList.remove('scale-105');
        }, 200);
      });
    }
  }, [newButtonRef]);

  return (
    <div className="btm-nav">
      <NavLink
      to='/'
      className={({ isActive }) =>
        isActive ? "active" : ""
      }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span className="btm-nav-label">Home</span>
      </NavLink>
      <button
      id='new'
      ref={newButtonRef}
        className="transition-transform"
        onClick={()=>document.getElementById('new-prayer').showModal()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        <span className="btm-nav-label">New</span>
      </button>
      <NavLink
        to='/history' end
        className={({ isActive }) =>
          isActive ? "active" : ""
        }
        onClick={() => {
          
        }
      }
        
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <span className="btm-nav-label">History</span>
      </NavLink>


{/* hidden dialogue for new prayer */}
      <dialog id="new-prayer" className="modal">
  <div className="modal-box">
    <h3 className="text-lg font-bold">New Prayer Request</h3>
    <p className="py-4">Please enter your new prayer request info here</p>
    <div className="modal-action">
      <form method="dialog">
     
        <button className="mx-2 btn">Close</button>
        <button className="mx-2 btn">Save</button>

      </form>
    </div>
  </div>
</dialog>
    </div>

    
  );
};

export default BottomNav;
