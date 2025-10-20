const backendLink ='http://localhost:4000'
import axios from 'axios'

async function login ({password,email}) {
    const response = await axios.post(`${backendLink}/login`,{
        email,password
    })
    return response;
}
async function signup (form) {
    const response = await axios.post(`${backendLink}/signup`,form)
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

async function verifyToken ({
    token,password
}) {

    const res = await axios.post(`${backendLink}/set-password`,{
    token,password
    });
    return res;

}


export  {login,signup,dashboard ,verifyToken};