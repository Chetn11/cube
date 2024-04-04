import React, { ReactNode, useEffect, useState } from 'react'
import styles from "./Home.module.css"
import axios from 'axios'
import CustomerCard from './CustomerCard'



// url = https://api.unsplash.com/photos/random/?client_id=29I-ulTLD6Ue90RCCxRkfpHnqOCbcxuTkR8aDsvCcO8&count=9
interface CustomerList {
    id: number,
    firstName: string,
    maidenName: string,
    lastName: string,
    email: string,
    address: any,
}


interface CustomerData {
    id: number,
    firstName: string,
    maidenName: string,
    lastName: string,
    email: string,
    address: any,
    phone: string,
    image: string
}

// interface Images{
//     url:any
// }
function Home() {

    const [customer, setCustomer] = useState<CustomerList[]>([]);
    const [customerDetails, setCustomerDetails] = useState<CustomerData>();
    const [photos, setPhotos] = useState<string[]>([]);
    const getData = async () => {
        try {
            const res = await axios.get("https://json-server-user-jbu6.onrender.com/users")
            // console.log(res);
            setCustomer(res.data as CustomerList[])
        } catch (error) {

        }
    }

    const [activeCard, setActiveCard] = useState<number>(-1);

    const handleCardClick = (cardId: number) => {
        setActiveCard(cardId);
    }

    useEffect(() => {
        getData();
    }, [])
    // console.log(selectedCustomerId);
    useEffect(() => {
        const details = async () => {
            try {
                const res = await axios.get(`https://json-server-user-jbu6.onrender.com/users/${activeCard}`);
                // console.log(res);
                setCustomerDetails(res.data as CustomerData)
            } catch (error) {

            }
        }

        const img=async ()=>{
            // const page=Math.floor(Math.random()*())
            try {
                const imgRes=await axios.get("https://api.thedogapi.com/v1/images/search?limit=10");
                console.log(imgRes.data);
                const data:string[] = imgRes?.data?.map((objects:any)=>objects.url) || ["xyz"];
                setPhotos(data.slice(0,9))
            } catch (error) {
                
            }
        }

        let intervalId: any;

        if (activeCard >= 0) {
            details();
            img();
            intervalId = setInterval(img , 10000)
        }

        return ()=>{
            clearInterval(intervalId)
        }

    }, [activeCard])
    // console.log(customer);
    // console.log(customerDetails);
    // console.log(photos);
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.customer_list}>
                    {customer?.map((ele: CustomerList, i:number) => (<CustomerCard bgColor={i+1 === activeCard? "gray": "white"} handleCardClick={handleCardClick} key={i} {...ele} />))}
                </div>

                <div className={styles.customer_details}>
                    <h1>Customer Details</h1>
                    {activeCard >= 0 && (
                        <div>
                            <div className={styles.details}>
                                <img className={styles.proImage} src={customerDetails?.image} alt='profile' />
                                <h1 style={{fontWeight:"normal", fontFamily:"sans-serif"}}>{customerDetails?.firstName + " " + customerDetails?.lastName}</h1>
                                <p>Email : {customerDetails?.email} , Phone : {customerDetails?.phone}</p>
                                <p>Address : {customerDetails?.address.address}, {customerDetails?.address.city}, {customerDetails?.address.state}, PostalCode : {customerDetails?.address.postalCode}</p>
                            </div>
                            <div className={styles.AllPhotos}>
                                {photos?.map((url:string,i:number)=>(
                                    <img src={url} alt={customerDetails?.firstName} key={i}/>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeCard < 0 &&(
                        <div>
                            <h2>Please click on Customer Card to See all the Details.</h2>
                        </div>
                    )}

                </div>
            </div>

        </div>
    )
}

export default Home
