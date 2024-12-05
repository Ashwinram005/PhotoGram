import FileUploader from '@/components/fileUploader';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileEntry } from '@/types';
import { updateProfile, UserProfile } from 'firebase/auth';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import avatar from "@/assets/images/avatar.png"
import { Input } from '@/components/ui/input';

interface IEditProfileProps {
}

const EditProfile: React.FunctionComponent<IEditProfileProps> = (props) => {
    const location=useLocation();
    const navigate=useNavigate();
    const { id = '', userId = '', userBio = '', displayName = '', photoUrl = '' } =
    location.state || {};
    const [data,setData]=React.useState<UserProfile>({
        userId,
        displayName,
        photoUrl,
        userBio
    }); 
    const [fileEntry, setFileEntry] = React.useState<FileEntry>({
        files: [],
    });

    const updateProfile = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission
        console.log("Updated Data: ", data);
    };
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
                <img src={data?.photoUrl?data.photoUrl:avatar} alt="avatar" className='w-28 p-0.5 h-28 rounded-full border-2 border-slate-800 object-cover'/>
              </div>
              <FileUploader
                files={fileEntry.files} 
                onChange={(updatedFiles) =>
                setFileEntry({ files: updatedFiles })
                } 
                uploaderClassName="your-class-name" 
                theme="light" 
                />
            </div>
            <div className="flex flex-col">
              <Label className="mb-4" htmlFor="displayName">
                Display Name
              </Label>
              <Input
                className="mb-8"
                id="dsplayName"
                placeholder="Enter your name"
                value={data.displayName}
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
                value={data.userBio}
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
