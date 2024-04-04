import React, { ReactElement } from 'react'
import styles from './Home.module.css';


interface CustomerCardInterface {
    id: number,
    firstName: string,
    maidenName: string,
    lastName: string,
    email: string,
    address: any,
    bgColor: string
    handleCardClick: any
}

function CustomerCard({ 
    id,
    firstName,
    maidenName,
    lastName,
    email, 
    bgColor,
    handleCardClick,
    address
}: CustomerCardInterface ): ReactElement {

  return (
    <div style={{
        backgroundColor: bgColor
    }} className={styles.customer_card} onClick={()=>{
        handleCardClick(id)
    }}>
        <h3>{id + ". " + firstName + " " + maidenName + " " + lastName}</h3>
        <p>{email}</p>
        <p>{address.address + ", " + address.city + ", " + address.state + ", " + address.postalCode}</p>
    </div>
  )
}

export default CustomerCard
