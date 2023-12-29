import { useDispatch } from "react-redux";
import { authService } from "./auth";
import { storeLogin } from "../redux/userSlice";

/// for get current user if he is logged in

export const useFetchAndStoreCurrentUser = () => {
    const dispatch = useDispatch();
    const fetchAndStoreCurrentUser = async () => {
        try {
            const currentUser = await authService.getCurrentUser();
            currentUser && dispatch(storeLogin(currentUser));
            return currentUser;
        } catch (error) {
            console.log("Failed At use Fetch And Store Current User::", error.message);
            return null;
        }
    };
    return fetchAndStoreCurrentUser;
}