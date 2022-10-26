import React, { Fragment, useEffect, useState } from "react";
import { Button, Text } from "react-native";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { initializeApp } from "firebase/app";
import type { User } from "firebase/auth";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
} from "firebase/auth";

import storageUtil from "../utils/storage";

const config = Constants.expoConfig?.extra as {
  googleClientId: string;
  googleIosClientId: string;
  firebaseApiKey: string;
};
const { googleClientId, googleIosClientId, firebaseApiKey } = config;

initializeApp({
  apiKey: firebaseApiKey,
});

WebBrowser.maybeCompleteAuthSession();

const Auth = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: googleClientId,
    iosClientId: googleIosClientId,
  });
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    storageUtil.getData("id_token").then((id_token) => {
      if (id_token) return signInUser(id_token);
    });
  }, []);

  useEffect(() => {
    if (response?.type === "success") signInUser(response.params.id_token);
  }, [response]);

  const signInUser = (id_token: string) => {
    const auth = getAuth();
    const credential = GoogleAuthProvider.credential(id_token);
    signInWithCredential(auth, credential).then((res) => {
      setUser(res.user);
      storageUtil.storeData("id_token", id_token);
    });
  };

  const signOutUser = () => {
    const auth = getAuth();
    signOut(auth)
      .then((res) => {
        console.log("signOut:", res);
        setUser(null);
        storageUtil.removeData("id_token");
      })
      .catch((error) => console.error(error));
  };

  return (
    <Fragment>
      {user ? (
        <>
          <Text>{`Hi, ${user.displayName}`}</Text>
          <Button title="Logout" onPress={signOutUser} />
        </>
      ) : (
        <Button
          disabled={!request}
          title={"Login"}
          onPress={() => {
            promptAsync().catch((error) => console.error(error));
          }}
        />
      )}
    </Fragment>
  );
};

export default Auth;
