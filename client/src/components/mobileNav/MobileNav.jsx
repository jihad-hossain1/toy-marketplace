import React from 'react';
import {
    Menu,
    MenuHandler,
    MenuList,
  } from "@material-tailwind/react";
import {AiOutlineAlignRight} from 'react-icons/ai'

import { navList } from '../desktopNav/DesktopNav';

const MobileNav = () => {
    return (
        <div className='mr-2'>
            <Menu
      animate={{
        mount: { y: 0 },
        unmount: { y: 25 },
      }}
    >
      <MenuHandler>
        <button>
          <AiOutlineAlignRight className="text-3xl" />
        </button>
      </MenuHandler>
      <MenuList className='bg-blue-gray-50 '>
       <ul className='flex flex-col items-center space-y-3 py-3 '>
       {navList}
       </ul>
      </MenuList>
    </Menu>
        </div>
    );
};

export default MobileNav;