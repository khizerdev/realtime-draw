import React from 'react';
import Toolbox from './toolbox';
import Menu from './menu';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-b-slate-300" id="navbar">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-[10vh] items-center justify-center gap-10">
          <Menu />
          <Toolbox />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
