import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const autoGuestLogin = async (phone) => {
  if (auth.currentUser) return auth.currentUser;

  const email = phone + "@guest.nawabibites.com";
  const password = Math.random().toString(36).slice(-8);

  const userCred = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  localStorage.setItem("guest_password", password);
  localStorage.setItem("guest_email", email);

  return userCred.user;
};
