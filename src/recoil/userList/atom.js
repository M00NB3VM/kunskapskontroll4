import { atom } from "recoil";

export const userListState = atom({
  key: "userListState",
  default: [],
});

/* {
                id:X,
                email:'sample@gmail.com',
                username:'*namn*',
                password:'*****',
                (role: "user",)
                name:{
                    firstname:'*namn*',
                    lastname:'*namn*'
                },
                address:{
                    city:'Stad',
                    street:'Gata',
                    number: X,
                    zipcode:'XXX-XX',
                },
                phone:'070-XXXXXXX'
            } */
