const backendLink ='https://backendfor.onrender.com'
import axios from 'axios'

async function login ({password,email}) {
    const response = await axios.post(`${backendLink}/login`,{
        email,password
    })
    return response;
}
async function signup ({password,email,name}) {
    const response = await axios.post(`${backendLink}/signup`,{
        email,password,name
    })
    return response;
}

async function dashboard (token) {
    const response = await axios.get(`${backendLink}/dashboard`,{
        headers : {
            "authorization" : `Bearer ${token}`
        }
    });

  
    return response;
}


export  {login,signup,dashboard}