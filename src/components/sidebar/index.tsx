import * as React from 'react';
import homeIcon from "@/assets/icons/home.svg"
import addIcon from "@/assets/icons/add.svg"
import directIcon from "@/assets/icons/direct.svg"
import logoutIcon from "@/assets/icons/logout.svg"
import myphotosIcon from "@/assets/icons/myphotos.svg"
import settingsIcon from "@/assets/icons/settings.svg"
import profileIcon from "@/assets/icons/profile.svg"
import notificationIcon from "@/assets/icons/notification.svg"
import { Link, useLocation } from 'react-router-dom';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
interface ISidebarProps {
}

const navItems=[
  {
    name:"Home",
    link:"/",
    icon:homeIcon,
  },
  {
    name:"Add Photos",
    link:"/post",
    icon:addIcon,
  },
  {
    name:"My Photos",
    link:"/myphotos",
    icon:myphotosIcon,
  },
  {
    name:"Profile",
    link:"/profile",
    icon:profileIcon,
  },
  {
    name:"Notifications",
    link:"#",
    icon:notificationIcon,
  },
  {
    name:"Direct",
    link:"#",
    icon:directIcon,
  },
  {
    name:"Settings",
    link:"#",
    icon:settingsIcon,
  },
]
const Sidebar: React.FunctionComponent<ISidebarProps> = (props) => {
  const {pathname}=useLocation();
  return (
    <nav className='flex flex-col space-x-2 relative h-screen max-w-sm w-full'> 
      <div className='flex justify-center m-5'>
        <div className="text-white text-lg">PhotoGram</div>
      </div>
      {
        navItems.map((item)=>(
          <div className={cn(
            buttonVariants({variant:"default"}),
            pathname===item.link?"bg-white text-white-800 hover:bg-white rounded-none"
            :"hover:bg-slate-950 hover:text-white bg-transparent rounded-none",
            "justify-start"
          )} 
          key={item.name}>
            <Link to={item.link} className='flex'>
              <span><img src={item.icon} className='w-5 h-5 mr-2' alt={item.name} 
                style={{filter:`${pathname===item.link?"invert(0":"invert(1)"}`}}/></span>
              <span>{item.name}</span>
            </Link>
          </div>
        ))
      }
    </nav>
  );
};

export default Sidebar;
