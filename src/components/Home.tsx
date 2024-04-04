import React, { useEffect, useState } from 'react'
import styles from "./Home.module.css"
import axios from 'axios'

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

function Home() {

    const [customer, setCustomer] = useState<CustomerList[]>([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
    const [customerDetails, setCustomerDetails] = useState<CustomerData>();
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
        if (selectedCustomerId !== null) {
            details();
        }

    }, [selectedCustomerId])
    console.log(customer);
    console.log(customerDetails);
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.customer_list}>
                    {customer?.map((ele, i) => (
                        <div className={styles.customer_card} key={i} onClick={() => handelCustomer(ele.id)}>
                            <h3>{ele.id + " " + ele.firstName + " " + ele.maidenName + " " + ele.lastName}</h3>
                            <p>{ele.email}</p>
                            <p>{ele.address.address + ", " + ele.address.city + ", " + ele.address.state + ", " + ele.address.postalCode}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.customer_details}>
                    {selectedCustomerId !== null && (
                        <div>
                            <img className={styles.proImage} src={customerDetails?.image} alt='profile' />
                            <h1>{customerDetails?.firstName + " " + customerDetails?.lastName}</h1>
                            <p>Email : {customerDetails?.email} , Phone : {customerDetails?.phone}</p>
                            <p>Address : {customerDetails?.address.address}, {customerDetails?.address.city}, {customerDetails?.address.state}, PostalCode : {customerDetails?.address.postalCode}</p>
                        </div>
                    )}

                </div>
            </div>

        </div>
    )
}

export default Home
