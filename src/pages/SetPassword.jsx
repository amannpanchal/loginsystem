import React from 'react'
import { useState } from 'react'
import {  useParams } from 'react-router-dom';
import { verifyToken } from '../functions';

const SetPassword = () => {
    const [password, setPassword] = useState(null);
    const {token} = useParams();
const [loading,setLoading] = useState(false);

    const handleSubmit =async  () =>{
        if(!password){
            return alert("Please fill the password")
        }
        try{
            setLoading(true);
            const response =   await verifyToken({password,token});
            alert("Verification successfull");

        }catch(e){
            console.log(e,'the error is');
            alert(e.response.data.message);
        }finally{
            setLoading(false)
        }


      
        
        
    }

  return (
    <div>
    <div className="form-container" style={{ maxWidth: "400px", margin: "50px auto" }}>

 <h2>Set Password</h2>
 <input 
 type ='text'
 name ="password"
 placeholder='Password'
 onChange = {(e) => setPassword(e.target.value)}
 value ={password}
 
 />
 <button
 onClick={handleSubmit}
 >
    {
        loading ? "Loading......" : "Verify Email and  Password"
    }

 </button>
</div>
    </div>
  )
}

export default SetPassword