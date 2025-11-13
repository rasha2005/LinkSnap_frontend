import setToken from "../server/token"
import { Api } from "./apiConfig"
import { endpoints } from "./endpoints"

export const handleRegister = async(data:RegisterFormValues) => {
    const res = await Api.post(endpoints.register, {data})
    return res
}

export const handleLogin = async(data:LoginFormValues) => {
    
    const res = await Api.post(endpoints.login , {data});
    if(res.data.success === true) {
        const token = res.data?.token;
        setToken(token);
    }
    return res
}

export const shortenUrl = async(longUrl:string,token:string | undefined) => {
    const res = await Api.post(endpoints.url, {longUrl},{
        headers: {
            Authorization: `Bearer ${token}`,
          },
})
    return res
}

export const verifyEmail = async(token:string | null) => {
    const res = await Api.patch(`/user/verify-email?token=${token}`);
    if(res.data.success === true) {
        const token = res.data?.token;
        setToken(token);
    }
    return res;
  };

export const fetchUrls = async(page:number , limit:number ,token:string | undefined) => {
    const res = await Api.get(endpoints.myUrl, {
        headers: {
            Authorization: `Bearer ${token}`,
          },
    })
    return res
}
  