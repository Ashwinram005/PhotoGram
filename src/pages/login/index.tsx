import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUserAuth } from '@/context/userAuthContext';
import { UserLogIn } from '@/types';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import image1 from "@/assets/images/image1.jpg"
import image2 from "@/assets/images/image2.jpg"
import image3 from "@/assets/images/image3.jpg"
import image4 from "@/assets/images/image4.jpg"

interface ILoginProps {
}

const initialvalue:UserLogIn={
  email: '',
  password: '',
}

const Login: React.FunctionComponent<ILoginProps> = () => {

  const {googleSignIn,logIn}=useUserAuth();
  const navigate=useNavigate();
  const [userLoginInfo, setUserLoginInfo] = React.useState<UserLogIn>(initialvalue);

  const handleGoogleSignIn=async(e:React.MouseEvent<HTMLElement>)=>{
    e.preventDefault();
    try{
      await googleSignIn();
      navigate("/");
    }catch(error){
      console.log("Error ",error);
    }
  }

  const handleSubmit=async(e:React.MouseEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try{
      await logIn(userLoginInfo.email,userLoginInfo.password);
      console.log("The userInfo is ",userLoginInfo);
      navigate("/");
    }catch(error){
      console.log("Error ",error);
    }
  }

  return(
  <div className="bg-slate-900 w-full h-screen">
  <div className="container mx-auto p-6 flex h-full">
  <div className="flex justify-center items-center w-full">
    <div className='p-6 w-2/3 hidden lg:block'>
      <div className='grid grid-cols-2 gap-2'>
        <img src={image2} alt="" className='w-2/3 h-auto aspect-video rounded-3xl place-self-end' />
        <img src={image1} alt="" className='w-2/4 h-auto aspect-auto rounded-3xl' />
        <img src={image4} alt="" className='w-2/4 h-auto aspect-auto rounded-3xl place-self-end' />
        <img src={image3} alt="" className='w-2/3 h-auto aspect-video rounded-3xl'/>
      </div>      
    </div>
  <div className='max-w-sm rounded-xl border bg-card text-card-foreground shadow-sm'>
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">PhotoGram</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid">
            {/* <Button variant="outline">
              <Icons.gitHub className="mr-2 h-4 w-4" />
              Github
            </Button> */}
            <Button variant="outline" onClick={handleGoogleSignIn}>
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email address:</Label>
            <Input id="email" 
              type="email" 
              placeholder="Password" 
              value={userLoginInfo.email}
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>
                setUserLoginInfo({...userLoginInfo,email:e.target.value})
            }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" 
              type="password" 
              placeholder="Password" 
              value={userLoginInfo.password}
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>
              setUserLoginInfo({...userLoginInfo,password:e.target.value})}
            />
          </div>
        </CardContent>
        <CardFooter  className="flex flex-col">
          <Button className="w-full" type='submit'>Login</Button>
          <p className="mt-3 text-sm text-center">
            Don't have an account ? <Link to="/signup">Sign up</Link>
          </p>
        </CardFooter>
      </form> 
    </Card>
  </div>
  </div>
  </div>
  </div>
  );
};

export default Login;
