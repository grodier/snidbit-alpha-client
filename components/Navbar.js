import React, { useState } from 'react';
import Link from 'next/link';
import { useAppContext } from '../libs/contextLib';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';

function AvatarSmall({ userName, avatarUrl }) {
  return (
    <div className="border border-black rounded-full">
      <img className="h-8 w-8 rounded-full" src={avatarUrl} alt={userName} />
    </div>
  );
}

function HamburgerSvg() {
  return (
    <svg
      className="h-6 w-6"
      stroke="currentColor"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

function CloseSvg() {
  return (
    <svg
      className="h-6 w-6"
      stroke="currentColor"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

function AvatarMedium({ userName, avatarUrl }) {
  return (
    <div className="border border-black rounded-full">
      <img className="h-10 w-10 rounded-full" src={avatarUrl} alt={userName} />
    </div>
  );
}

function SecondaryAnchorButton({ url, children }) {
  return (
    <Link href={url}>
      <a className="block inline-block mt-0 text-sm border-b-2 border-transparent hover:border-black hover:border-b-2 hover:shadow-md mr-0 mr-4">
        {children}
      </a>
    </Link>
  );
}

function PrimaryAnchorButton({ url, children }) {
  return (
    <Link href={url}>
      <a className="inline-block text-sm px-4 py-2 border rounded border-white bg-black text-white hover:shadow-md hover:border-transparent">
        {children}
      </a>
    </Link>
  );
}

function ProfileDropdown({ userName, avatarUrl }) {
  const [isDropdownOpen, displayDropdown] = useState(false);

  function toggleDropdown() {
    displayDropdown(!isDropdownOpen);
  }

  return (
    <div className="ml-3 relative">
      <div>
        <button
          className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-blue-700 hover:shadow-md focus:shadow-md transition duration-150 ease-in-out"
          id="user-menu"
          aria-label="User menu"
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          <AvatarMedium userName={userName} avatarUrl={avatarUrl} />
        </button>
      </div>
      {isDropdownOpen && <DropdownMenu />}
    </div>
  );
}

function DropDownLink({ url, children }) {
  return (
    <Link href={url}>
      <a className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
        {children}
      </a>
    </Link>
  );
}

function DropDownLinkButton({ onClick, children }) {
  return (
    <div
      role="button"
      onClick={onClick}
      tabIndex="0"
      className="block cursor-pointer px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
    >
      {children}
    </div>
  );
}

function DropdownMenu() {
  function handleLogout() {
    Auth.signOut();
  }

  return (
    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
      <div
        className="py-1 rounded-md bg-white shadow-xs"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
      >
        <DropDownLink url="/settings">Profile</DropDownLink>
        <DropDownLink url="/settings">Settings</DropDownLink>
        <DropDownLinkButton onClick={handleLogout}>Sign Out</DropDownLinkButton>
      </div>
    </div>
  );
}

function MobileMenuLink({ url, center, children }) {
  return (
    <Link href={url}>
      <a
        className={`${
          center && 'text-center'
        } block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out`}
      >
        {children}
      </a>
    </Link>
  );
}

function MobileMenuLinkButton({ onClick, children }) {
  return (
    <div
      role="button"
      onClick={onClick}
      tabIndex="0"
      className="mt-1 block cursor-pointer px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out"
    >
      {children}
    </div>
  );
}

function MobileMenu({ isOpen, authStatus }) {
  function handleLogout() {
    Auth.signOut();
  }

  return (
    <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
      {authStatus === 'authenticated' ? (
        <div className="pt-2 pb-3">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <AvatarMedium
                userName="Tom Cook"
                avatarUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium leading-6 text-gray-800">
                Tom Cook
              </div>
              <div className="text-sm font-medium leading-5 text-gray-500">
                tom@example.com
              </div>
            </div>
          </div>
          <div className="mt-3">
            <MobileMenuLink url="/settings">Profile</MobileMenuLink>
            <MobileMenuLink url="/settings">Settings</MobileMenuLink>
            <MobileMenuLinkButton onClick={handleLogout}>
              Sign Out
            </MobileMenuLinkButton>
          </div>
        </div>
      ) : (
        <div className="pb-3">
          <MobileMenuLink url="/signup" center>
            Sign Up
          </MobileMenuLink>
          <MobileMenuLink url="/login" center>
            Log In
          </MobileMenuLink>
        </div>
      )}
    </div>
  );
}

function Navbar() {
  const { authStatus } = useAppContext();
  const [isMobileMenuOpen, displayMobileMenu] = useState(false);

  function toggleMobileMenu() {
    displayMobileMenu(!isMobileMenuOpen);
  }

  return (
    <nav className="bg-white shadow border-black border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <a className="block w-auto font-logo text-2xl">SnidBit</a>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {authStatus === 'authenticated' ? (
              <ProfileDropdown
                userName="Tom Cook"
                avatarUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />
            ) : (
              <div className="flex-shrink-0">
                <SecondaryAnchorButton url="/login">
                  Log In
                </SecondaryAnchorButton>
                <PrimaryAnchorButton url="/signup">Sign Up</PrimaryAnchorButton>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
              aria-label="Main menu"
              aria-expanded="false"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <CloseSvg /> : <HamburgerSvg />}
            </button>
          </div>
        </div>
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} authStatus={authStatus} />
    </nav>
  );
}

export default Navbar;
