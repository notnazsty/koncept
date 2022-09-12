import { Stack } from "@mantine/core";
import React, {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { User as KonceptUser } from "../models/user";
import { auth, userRef } from "../utils/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { getDoc, doc, setDoc, onSnapshot } from "firebase/firestore";

const authContext = createContext<{
  user: User | null;
  userLoading: boolean;
  userData: KonceptUser | null;
  userDataLoading: boolean;
}>({
  user: null,
  userLoading: true,
  userData: null,
  userDataLoading: true,
});

export const useUser = () => {
  return useContext(authContext);
};

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userData, setUserData] = useState<KonceptUser | null>(null);
  const [userDataLoading, setUserDataLoading] = useState(true);

  useEffect(() => {
    setUserDataLoading(true);
    if (user) {
      const unsub = onSnapshot(doc(userRef, user.uid), (doc) => {
        const data = doc.data() as KonceptUser;
        setUserData(data);
        setUserDataLoading(false);
      });

      return unsub;
    } else {
      setUserData(null);
      setUserDataLoading(false);
    }
  }, [user]);

  useEffect(() => {
    setUserLoading(true);

    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setUserLoading(false);
    });

    return unsub;
  }, []);

  return (
    <authContext.Provider
      value={{ user, userData, userDataLoading, userLoading }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
