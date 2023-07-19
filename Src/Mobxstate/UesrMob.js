import AsyncStorage from "@react-native-async-storage/async-storage";
import { action, makeObservable, observable } from "mobx";
import { makePersistable } from "mobx-persist-store";

class UserMob {
    user = {}
    isLogin = false
    constructor() {
        makeObservable(
            this,
            {
                updateUserMobx: action,
                removeUserMobx: action,
                user: observable,
            },
            {
                autoBind: true,
            },
        );
        makePersistable(this,{
            name:"UserMobPersist",
            properties:['user',"isLogin"],
            storage:AsyncStorage
        });
       
    }
    // User data update and store in first login
    updateUserMobx(userdata) {
        this.isLogin = true
        this.user = userdata
    }
    // User Token remove 
    removeUserMobx() {
        this.user = {}
        this.isLogin = false
        console.log("removeUserMobx",this.user)
    }
}

export default UserMob1 = new UserMob();