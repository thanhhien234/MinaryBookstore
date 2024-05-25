import { useDispatch } from "react-redux";
import { getCookie } from "../utils/cookieManage";
import { setUserInfo } from "../store/slices/userSlice";

function useUser() {
  const dispatch = useDispatch();
  fetch(`${process.env.REACT_APP_API_URL}/api/auth`,{
    headers: {
      'Authorization': 'Bearer ' + getCookie('accessToken'),
    }
  })
  .then(response => {
    if (response.status === 200) return response.json();
  })
  .then(res => dispatch(setUserInfo({name: res.name,img: res.img})))
  .catch(error => console.log(error));
}
export default useUser;
