import React, { useEffect, useState } from 'react'
import styles from "./Home.module.css"
import axios from 'axios'



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

interface Images{
    url:any
}
function Home() {

    const [customer, setCustomer] = useState<CustomerList[]>([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
    const [customerDetails, setCustomerDetails] = useState<CustomerData>();
    const [photos, setPhotos] = useState<Images[]>([]);
    const getData = async () => {
        try {
            const res = await axios.get("https://dummyjson.com/users")
            // console.log(res.data.users);
            setCustomer(res.data.users as CustomerList[])
        } catch (error) {

        }
    }

    const handelCustomer = (customerId: number) => {
        setSelectedCustomerId(customerId);

    }

    useEffect(() => {
        getData();
    }, [])
    // console.log(selectedCustomerId);
    useEffect(() => {
        const details = async () => {
            try {
                const res = await axios.get(`https://dummyjson.com/users/${selectedCustomerId}`);
                // console.log(res);
                setCustomerDetails(res.data as CustomerData)
            } catch (error) {

            }
        }

        const img=async ()=>{
            try {
                const imgRes=await axios.get("https://api.slingacademy.com/v1/sample-data/photos?limit=9");
                // console.log(imgRes.data.photos);
                setPhotos(imgRes.data.photos as Images[])
            } catch (error) {
                
            }
        }
        if (selectedCustomerId !== null) {
            details();
            img();
            // setInterval(img,10000)
           
        }

    }, [selectedCustomerId])
    console.log(customer);
    console.log(customerDetails);
    console.log(photos);
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.customer_list}>
                    {customer?.map((ele, i) => (
                        <div className={styles.customer_card} key={i} onClick={() => handelCustomer(ele.id)}>
                            <h3>{ele.id + ". " + ele.firstName + " " + ele.maidenName + " " + ele.lastName}</h3>
                            <p>{ele.email}</p>
                            <p>{ele.address.address + ", " + ele.address.city + ", " + ele.address.state + ", " + ele.address.postalCode}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.customer_details}>
                    <h1>Customer Details</h1>
                    {selectedCustomerId !== null && (
                        <div>
                            <div className={styles.details}>
                            <img className={styles.proImage} src={customerDetails?.image} alt='profile' />
                            <h1 style={{fontWeight:"normal", fontFamily:"sans-serif"}}>{customerDetails?.firstName + " " + customerDetails?.lastName}</h1>
                            <p>Email : {customerDetails?.email} , Phone : {customerDetails?.phone}</p>
                            <p>Address : {customerDetails?.address.address}, {customerDetails?.address.city}, {customerDetails?.address.state}, PostalCode : {customerDetails?.address.postalCode}</p>
                            </div>
                            <div className={styles.AllPhotos}>
                                {photos?.map((ele,i)=>(
                                        <img src={ele.url} alt=''/>
                                ))}
                            </div>
                        </div>
                    )}
                    {selectedCustomerId===null &&(
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
