import FileUploader from '@/components/fileUploader';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileEntry, ProfileInfo } from '@/types';
import {  UserProfile } from 'firebase/auth';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import avatar from "@/assets/images/avatar.png"
import { Input } from '@/components/ui/input';
import { createUserProfile, updateUserProfile } from '@/repository/user.service';
import { useUserAuth } from '@/context/userAuthContext';
import { updateProfileInfoOnPosts } from '@/repository/post.service';

interface LocationState {
  id?: string;
  userId?: string;
  displayName?: string;
  userBio?: string;
  photoUrl?: string;
}

interface IEditProfileProps {
}

const EditProfile: React.FunctionComponent<IEditProfileProps> = () => {
    const {user,updateProfileInfo}=useUserAuth();
    const location=useLocation();
    const navigate=useNavigate();
    const {
      id = '',
      userId = '',
      displayName = '',
      userBio = '',
      photoUrl = '',
    } = (location.state || {}) as LocationState;
    
    console.log("location state: ",location.state);
    const [data,setData]=React.useState<UserProfile>({
        userId,
        displayName:displayName||"",
        photoUrl:photoUrl||undefined,
        userBio:userBio||""
    }); 

    const [fileEntry, setFileEntry] = React.useState<FileEntry>({
      files: [],
    });

    const updateProfile = async(e: React.MouseEvent<HTMLFormElement>) => {
      e.preventDefault(); 
      try {
        if(id){
          const response=await updateUserProfile(id,data);
          console.log("Updated user profile is",response);
        }
        else{
          const response=await createUserProfile(data);
          console.log("The created user profile is",response);
        }
        const profileInfo:ProfileInfo={
          user:user!,
          displayName:data.displayName as string,
          photoUrl:data.photoUrl as string,

        }
        updateProfileInfo(profileInfo);
        updateProfileInfoOnPosts(profileInfo);
        navigate("/profile");
      } catch (error) {
        console.error(error);
      }
    };

    console.log("File entry",fileEntry);

    React.useEffect(()=>{
      if(fileEntry.files.length>0){
          setData({...data,photoUrl:fileEntry.files[0].cdnUrl||undefined});
      }
     
    },[fileEntry])

  return (
    <Layout>
    <div className="flex justify-center">
      <div className="border max-w-3xl w-full">
        <h3 className="bg-slate-800 text-white text-center text-lg p-2">
          Edit Profile
        </h3>
        <div className="p-8">
          <form onSubmit={updateProfile}>
          <div className="flex flex-col">
              <Label className="mb-4" htmlFor="photo">
                Profile Picture
              </Label>
              <div className='mb-4'>
               {fileEntry.files.length>0 ?<img src={`${fileEntry.files[0].cdnUrl!}/-/scale_crop/300x300/smart/-/border_radius/50p/`} alt="avatar" className='w-28 p-0.5 h-28 rounded-full border-2 border-slate-800 object-cover'/>:
                <img src={typeof data.photoUrl === 'string' && data.photoUrl.trim() ? data.photoUrl : avatar} alt="avatar" className='w-28 p-0.5 h-28 rounded-full border-2 border-slate-800 object-cover'/>}
              </div>
              <FileUploader
                files={fileEntry.files} 
                onChange={(updatedFiles) =>
                setFileEntry({ files: updatedFiles })
                } 
                uploaderClassName="your-class-name" 
                preview={false}
                />
            </div>
            <div className="flex flex-col mt-5">
              <Label className="mb-4" htmlFor="displayName">
                Display Name
              </Label>
              <Input
                className="mb-8"
                id="dsplayName"
                placeholder="Enter your name"
                value={data.displayName as string}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setData({ ...data, displayName: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col">
              <Label className="mb-4" htmlFor="userBio">
                Profile Bio 
              </Label>
              <Textarea
                className="mb-8"
                id="userBio"
                placeholder="What's in your mind?"
                value={data.userBio as string}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setData({ ...data, userBio: e.target.value })
                }
              />
            </div>
            <Button className="mt-4 w-32 mr-8" type="submit">
              Update
            </Button>
            <Button variant="destructive" className="mt-4 w-32 mr-8" onClick={()=>navigate("/profile")}>
              Cancel
            </Button>
          </form>
        </div>
      </div>
    </div>
  </Layout>
  );
};

export default EditProfile;
