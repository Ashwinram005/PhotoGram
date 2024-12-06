import { db } from "@/firebaseConfig";
import { ProfileResponse, UserProfile } from "@/types";
import { addDoc, collection, doc, getDocs,  query, updateDoc, where } from "firebase/firestore";

const COLLECTION_NAME="users";

export const createUserProfile=(user:UserProfile)=>{
    try{
        return addDoc(collection(db,COLLECTION_NAME),user);
    }
    catch(error){
        console.error(error);
    }
}

export const getUserProfile=async(userId:string)=>{
    try {
        const q=query(collection(db,COLLECTION_NAME),where("userId","==",userId));  
        const querySnapshot=await getDocs(q);
        let tempData:ProfileResponse={};
        if(querySnapshot.size>0){
            querySnapshot.forEach((doc)=>{
                const userData=doc.data() as UserProfile;
                tempData={
                    id:doc.id,
                    ...userData,
                }
            })
            console.log("User profile data:", tempData); 
            return tempData;
        }
        else{
            console.log("No such document");
            return tempData;
        }
    } catch (error) {
        console.error(error);
    }
}

export const updateUserProfile=async(id:string,user:UserProfile)=>{
    const docRef=doc(db,COLLECTION_NAME,id);
    return updateDoc(docRef,{
        ...user
    });
}