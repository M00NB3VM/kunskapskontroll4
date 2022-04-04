import { atom } from "recoil";

export const productsState = atom({
  key: "productsState",
  default: [],
});

/*{
                id:1,
                title:'...',
                price:'...',
                category:'...',
                description:'...',
                image:'...'
            } */
