import { HotelDetails } from "../context/DataProvider";
import {V4 as uuid} from 'uuid'
import { collection, query, where, getDocs, addDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebaseConfig";
import { COLLECTION_NAMES } from "../utils/utils";

const hotelsCollectionRef = collection(db,COLLECTION_NAMES.hotels)
const adminCollectionRef = collection(db,COLLECTION_NAMES.adminDetails)
export const AddHotel = async(hotelDetails:HotelDetails) =>{
    console.log("hotelDEtails",hotelDetails)
    const result = addDoc(hotelsCollectionRef,hotelDetails).then(()=>{
        return true
    }).catch((err)=>{
        console.log("Error on addding hotel details")

        return false
    })
    return result
}

export const GetHotels = async():  Promise<HotelDetails[] | undefined>=>{
    try{
    const data = await getDocs(hotelsCollectionRef)
    const allHotels:HotelDetails[]  = []
    data.forEach((doc)=>{
        let temp = doc.data()
        allHotels.push(temp as HotelDetails)
    })
    return allHotels
}
catch(err){
    console.log("Error on fetching hotels")
    return undefined
    }
}

export const CheckIfAdmin = async(id:string) =>{
    const data = await getDocs(adminCollectionRef)
    const allAdmins:string[] = []
    data.forEach((doc)=>{
    let admins = doc.data()
    allAdmins.push(...admins.admins)
    })
    console.log(allAdmins,"MYID",id)
    return allAdmins.includes(id)

}