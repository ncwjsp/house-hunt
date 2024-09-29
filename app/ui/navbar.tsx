"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { FaRegUserCircle } from "react-icons/fa";

export default function Navbar() {
  const session = useSession();

  return (
    <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-slate-50 rounded-box mt-3 w-52 p-2 shadow z-20"
          >
            <li>
              <Link href="/for-sale">For Sale</Link>
            </li>
            <li>
              <Link href="/for-rent">For Rent</Link>
            </li>
            <li>
              <Link href="/listings">Listings</Link>
            </li>
            <li>
              <Link href="/messages">Messages</Link>
            </li>
          </ul>
        </div>

        {!session ? (
          <Link href="/" className="btn btn-ghost text-xl">
            HouseHunt
          </Link>
        ) : (
          <Link href="/home" className="btn btn-ghost text-xl">
            HouseHunt
          </Link>
        )}
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/for-sale">For Sale</Link>
          </li>
          <li>
            <Link href="/for-rent">For Rent</Link>
          </li>
          <li>
            <Link href="/listings">Listings</Link>
          </li>

          <li>
            <Link href="/agents">Agents</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <FaRegUserCircle size={32} />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-slate-50 rounded-box mt-3 w-52 p-2 shadow z-20"
          >
            <li>
              <Link href="/account" className="justify-between">
                Account
              </Link>
            </li>

            <li>
              <button onClick={() => signOut()}>Sign Out</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
