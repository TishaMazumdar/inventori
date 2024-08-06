"use client"

import { useContext } from "react";
import { authContext } from "@/lib/store/auth-context";
import { FaChartPie } from "react-icons/fa";

function Nav() {

  const { user, loading, logout } = useContext(authContext)

  return (
    <div>
      <header className="container max-w-2xl px-6 py-6 mx-auto">
        <div className="flex items-center justify-between">

          {/* User Information */}
          {user && !loading && (
            <div className="flex items-center gap-2">
              {/* img */}
              <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
                <img className="h-full w-full object-cover"
                  src={user.photoURL}
                  alt={user.displayName}
                  referrerPolicy="no-referrer" />
              </div>

              {/* name */}
              <small>Hey, {user.displayName}!</small>
            </div>
          )}

          {/* Right Side of our navigation*/}
          {user && !loading && (
            <nav className="flex gap-4 items-center">
              <div>
                <a href="#pantry">
                <FaChartPie className="text-2xl" />
                </a>
              </div>
              <div>
                <button onClick={logout} className="btn btn-danger">
                  Sign Out
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>
      <footer className="fixed bottom-2 w-full text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Tisha Mazumdar. All rights reserved.
      </footer>
    </div>
  );
}

export default Nav