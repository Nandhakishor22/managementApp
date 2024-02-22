import React, { SetStateAction, createContext, useContext, useEffect, useMemo, useState } from "react";
import CONFIG from "../config.json";
import { CheckIfAdmin, GetHotels } from "../services/backendServices";
import { auth } from "../firebaseConfig/firebaseConfig";
import { User, onAuthStateChanged } from "firebase/auth";

interface DataContext {
  companyName: string;
  adminMode: boolean;
  setAdminMode: React.Dispatch<SetStateAction<boolean>>;
  hotels: HotelDetails[] | undefined,
  isAdmin: boolean;
  handleLogin: () => string;
  currentUser: User | null;
  isLoading:boolean

}

interface DataContetProvider {
  children: React.ReactElement;
}
export type HotelDetails = {
  hotelName: string,
  hotelAddress: string,
  hotelPincode: number,
  hotelContact: number,
  hotelExpectedQuantity: number | undefined,
}
export type hotelData = {
  deliveredDate:number | null,
  cylinderType: string,
  quantity: number | null,
  paidAmount: number | null,
  balance:number | null,
  updatedBy:string,

}
const DataContext = createContext<DataContext>({
  companyName: "",
  adminMode: false,
  setAdminMode: () => {},
  hotels : [],
  isAdmin: false,
  handleLogin: () => '',
  currentUser: null,
  isLoading: false
});

const DataContetProvider = (props: DataContetProvider) => {
  const [companyName] = useState<string>(CONFIG.companyName);
  const [adminMode,setAdminMode] = useState(false)
  const [hotels,setHotels] = useState<HotelDetails[]>()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [ currentUser, setCurrentUser] = useState<User| null>(null)
  console.log("IsAdmin",isAdmin,"currentUser",auth.currentUser)
  const fetchHotels = async() =>{
    const allHotels = await GetHotels()
    if(allHotels){
      setHotels(allHotels)
      
    }
  }
  const checkForAdmin = async() =>{
    console.log("CHECKINGFORADMIN")

    const currentUserId = auth.currentUser?.uid
    if(currentUserId){
     const result = await CheckIfAdmin(currentUserId)

     setIsAdmin(result)
    }
  }
  const handleLogin = () =>{
    return '/menu'
  }
  useEffect(()=>{
    setIsLoading(true)
    console.log('isTrue',"USEFFECRRUNNING")
    fetchHotels()
    checkForAdmin()
    if(currentUser){
      setCurrentUser(currentUser)
    }
    const listener = onAuthStateChanged(auth,async(user)=>{
      console.log('userrrr',user)
      checkForAdmin()
      setCurrentUser(user)
      setIsLoading(false)
    })
    return () =>{
      listener()
      setCurrentUser(null)
      setIsAdmin(false)
    }
  },[])

  const ctxval = useMemo(
    () => ({
      companyName,
      setAdminMode,
      adminMode,
      hotels,
      isAdmin,
      handleLogin,
      currentUser,
      isLoading
    }),
    [companyName, adminMode, setAdminMode, hotels, isAdmin, currentUser, isLoading]
  );
  return (
    <DataContext.Provider value={ctxval}>{props.children}</DataContext.Provider>
  );
};
export const useData = () => useContext(DataContext)
export default DataContetProvider
