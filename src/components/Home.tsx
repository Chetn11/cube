import React, { useEffect, useState } from 'react'
import styles from "./Home.module.css"
import axios from 'axios'

interface CustomerDetails{
  id:number,
  firstName:string,
  maidenName:string,
  lastName:string,
  email:string,
  address:any,
}


function Home() {

    const[customer,setCustomer]=useState<CustomerDetails[]>([]);
    const getData=async ()=>{
        try {
            const res=await axios.get("https://dummyjson.com/users")
            // console.log(res.data.users);
            setCustomer(res.data.users as CustomerDetails[])
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        getData();
    },[])
    console.log(customer);
  return (
    <div className={styles.main}>
        <div className={styles.container}>
            <div className={styles.customer_list}>
            {customer?.map((ele,i)=>(
            <div className={styles.customer_card} key={i}>
                <h3>{ele.firstName +" "+ele.maidenName +" "+ ele.lastName}</h3>
                <p>{ele.email}</p>
                <p>{ele.address.address +", "+ele.address.city+", "+ele.address.state+", "+ele.address.postalCode}</p>
            </div>
           ))}
           </div>

            <div className={styles.customer_details}>

            </div>
        </div>
      
    </div>
  )
}

export default Home
