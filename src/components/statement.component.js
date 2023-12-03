import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Statement = () => {
  const [transactions, setTransactions] = useState([]);
  // const customerPhoneNumber = '01505368048';
  const phoneNumber = localStorage.getItem('mobileNumber');
  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `${token}`,
    'X-AUTH-SECRET-KEY': 'ROADTOSDET' // Replace 'your_secret_key_here' with your actual secret key
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`https://dmoney.roadtocareer.net/transaction/statement/${phoneNumber}`, {
          // Add headers or authorization if required
          headers: headers
        }
        );
        if (response.status === 200) {
          setTransactions(response.data.transactions);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTransactions();
  }, [phoneNumber]);
  return (
    <div>
      {/* ... */}
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.id}</td>
            {/* Render other transaction details here */}
          </tr>
        ))}
      </tbody>
      {/* ... */}
    </div>
  )
}
export default Statement