'use client'
import Link from 'next/link';
import NavLinks from './nav-links';
import React, { useEffect, useState } from 'react';

function SideNav() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://localhost:4000/v1/companies');
        const data = await response.json();
        setCompanies(data);
        console.log("data : ", data);
        
      } catch (error) {
        console.log("error :");
        
        console.error('Failed to fetch companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="flex h-full flex-col bg-white px-5 border-r-1 border-gray-200">
      <Link
        className="mb-2 flex h-20 items-center justify-start rounded-md bg-white p-4 md:h-20"
        href="/"
      >
        <div className="w-32 text-white md:w-40 flex items-center">
          <div className="avatar rounded-full h-10 w-10 bg-emerald-500 font-[700] flex items-center justify-center">
            <p>SM</p>
          </div>
          <p className='ml-2 text-gray-900'>{companies.length > 0 ? companies[0].name : 'Loading...'}</p>
          {/* Replace companies[0].name with your actual logic to display the name */}
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-white md:block">
          {/* <ul>
            {companies.map(company => (
              <li key={company.id}>{company.name}</li>
            ))}
          </ul> */}
        </div>
        <form>
          <button className="flex h-[48px] w-full grow items-center justify-center text-red-700 bg-red-100 p-3 text-sm font-medium md:flex-none md:justify-center md:p-2 md:px-3 rounded-lg">
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}

export { SideNav }
