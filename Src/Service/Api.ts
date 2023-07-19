import apisauce from 'apisauce';
import UesrMob from '../Mobxstate/UesrMob';
import { ChaptersObj,CurrentUserType, MyCourses, chapter, chapterResponse } from '../Constant/types';
import { useNavigation,CommonActions } from '@react-navigation/native';
const create = (baseURL = 'https://easyway.web-binary.com') => {
    
const api = apisauce.create({
    baseURL,
    headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Authorization': `Bearer ${UesrMob.user.access_token}`
     },
    timeout: 5 * 60 * 1000,
});


// api.axiosInstance.interceptors.response.use(
// (res) => {
//     return res;
// }, async (err) => {
//     const originalConfig = err.config;
//     if(err.response && err.status === 401) {

//     }
//     return Promise.reject(err);
// }
// )

// API caling for the  Login Authentication
const authenticate = (username:string,password:string) => {
    let param = {
        'grant_type':'password',
        'password': password,
        'client_id': '4',
        'client_secret': 'Ww0uaUwzC1b2yT5RqawauvJpDa7mTL0ijZJoZHRy',
        'username': username  
    }
     return api.post('/api/oauth/login/', param);
}
api.addAsyncResponseTransform(async response => {
    console.log("----------------addAsyncResponseTransform------------------------")
    if(response.data.code === 401){
        let param = {'grant_type':'refresh_token','refresh_token': UesrMob.user.refresh_token,'client_id': '4','client_secret': 'Ww0uaUwzC1b2yT5RqawauvJpDa7mTL0ijZJoZHRy'}
        const data = await api.post('/api/oauth/login/',param)
        const res = data
        if (!res.ok) {
            const navigation = useNavigation();
            navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    { name: 'Login' },
                  ],
                })
              );
          } else {
            console.log("Data Stored in mobx -",response.data)
            //Stored Token data
            UesrMob.updateUserMobx(res.data)
            // retry
            const data = await api.any(response.config)
            // replace data
            response.data = data.data;
          }
    }
   })
const CurrenUserDetail = async () => {
    console.log("API CALL CurrentUserDetail ")
    const res = await api.get<CurrentUserType>('/api/user');  
    return res;
}
// API caling for the  UserRegister
const userRegister = ({username,email,password,cpassword,contactno}:any) => {
    let param = {
        'username':username,
        'email':email,
        'password':password,
        'cpassword':cpassword,
        'contactno':contactno,
    }
     return api.post('/api/auth/register', param);
}

const Usercourse = async () =>
{
    // API caling for the  courses
    console.log("API CALL Usercourse ")
    const res = await api.get<MyCourses>('/api/courses');  
    return res.data;
}
const Getchapters = async(course_slug:String) =>
{
    // API caling for the  chapters
    console.log("API CALL Getchapters- ",course_slug)
    const res = await api.get<ChaptersObj>('/api/chapters/'+course_slug);  
    return res.data;
}
const GetSinglechapter = async(course_slug:String) =>
{
    // API caling for the single chapter
    console.log("API CALL GetSinglechapter- ",course_slug)
    const res = await api.get<chapterResponse>('/api/chapter/'+course_slug);  
    return res.data;
}
const userLogut = async () => {
     return api.post('/api/logout');
}
const ForgotPassword = ({email}:any) => {
    let param = {
        'email':email,
    }
    return api.post('/api/auth/forgot-password', param);
}
const ResetPassword = ({code,password,cpassword}:any) => {
    let param = {
        'code':code,
        'password':password,
        'password_confirmation':cpassword,
    }
    console.log("reset-password",param)
    return api.post('/api/auth/reset-password', param);
}
const ChangePassword = ({password,cpassword}:any) => {
    let param = {
        'password':password,
        'password_confirmation':cpassword
    }
    return api.post('/api/auth/forgot-password', param);
}
const DeleteUser = ({password}:any) => {
    let param = {
        'password':password,
    }
    return api.post('/api/user/delete', param);
}
const Refreshtoken =({refresh_token}:any) =>
{
    let param = {
        'grant_type':'refresh_token',
        'refresh_token': refresh_token,
        'client_id': '4',
        'client_secret': 'Ww0uaUwzC1b2yT5RqawauvJpDa7mTL0ijZJoZHRy',
    }
     return api.post('/api/oauth/login/', param);
}
return {
    authenticate,
    userRegister,
    Usercourse,
    Getchapters,
    GetSinglechapter,
    userLogut,
    CurrenUserDetail,
    ForgotPassword,
    ResetPassword,
    ChangePassword,
    DeleteUser,
    Refreshtoken
}}

export default {
    create,
};