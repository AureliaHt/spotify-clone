import { useEffect } from "react";

export default function ClickOutOfTheBox(ref, handler) {
     useEffect(() => {
         const CloseSignUpModal = e => {
             const eventListener = ref?.current;

             if (!eventListener || eventListener.contains(e.target)) {
                 return;
             }
             handler(e);
         };
         document.addEventListener('mousedown', CloseSignUpModal);
         document.addEventListener('touchstart', CloseSignUpModal)

         return () => {
             document.removeEventListener('mousedown', CloseSignUpModal);
             document.removeEventListener('touchstart', CloseSignUpModal);
         }
     }, [ref, handler]);
};