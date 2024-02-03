import React, { createContext, useContext, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { auth } from "../firebase";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState();

    const [initializing, setInitializing] = useState(true);

    function onAuthStateChanged(user) {
        setUserInfo(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </UserContext.Provider>
    );
};
