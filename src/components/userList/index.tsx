import React from 'react';
import { useUserAuth } from '@/context/userAuthContext';
import { getAllUsers } from '@/repository/user.service';
import { ProfileResponse } from '@/types';
import avatar from "@/assets/images/avatar.png"
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

interface  IUserListProps {
}

const UserList: React.FunctionComponent<UserListProps> = (props) => {
  const {user}=useUserAuth();
  const [suggesetedUser,setSuggestedUser]=React.useState<ProfileResponse[]>([]);

  const getSuggestedUser=async(userId:string)=>{ 
    const response=await getAllUsers(userId)||[];
    console.log("The response is : ",response);
    setSuggestedUser(response);
  }

  const renderUsers=()=>{
    return suggesetedUser.map((user,key) => {
      return (
        <div key={key} className="flex items-center mb-4 border-gray-400 justify-start">
          <span className='mr-2'>
            <img src={user.photoUrl?user.photoUrl:avatar} alt="image" className="w-10 h-10 rounded-full border-2 border-slate-800"/>
          </span>
          <span className='text-xs'>{user.displayName?user.displayName:"Guest user"}</span>
          <Button className='text-xs p-3 py-2 h-6 bg-slate-900 last-of-type:ml-auto'>
            Follow
          </Button>
        </div>
      )
    })
  }
  React.useEffect(()=>{
    if(user?.uid!=null){
      getSuggestedUser(user.uid);
    }  
  },[]);

  return (
    <div className='text-white py-8 px-3'>
      <Link to="/profile">
        <div className="flex items-center border-b pb-4 mb-4 border-gray-400 cursor-pointer">
          <span className="mr-2">
            <img src={user?.photoURL?user.photoURL:avatar} alt="image" className='w-10 h-10 rounded-full border-2 border-slate-800'/>
          </span>
          <span className='text-xs'>{user?.displayName?user.displayName:"Guest user"}</span>
        </div>
      </Link>
      <h3 className='text-sm text-slate-300'>Suggested Friends</h3>
      <div className="my-4">{suggesetedUser.length>0?renderUsers():""}</div>
    </div>
  );
};

export default UserList;
