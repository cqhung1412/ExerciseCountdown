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
} from "firebase/auth";
import storageUtil from "../utils/storage";

const config = Constants.expoConfig?.extra as {
  googleClientId: string;
  firebaseApiKey: string;
};
const { googleClientId, firebaseApiKey } = config;

initializeApp({
  apiKey: firebaseApiKey,
});

WebBrowser.maybeCompleteAuthSession();

const Auth = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: googleClientId,
  });
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    storageUtil.getData("id_token").then((token) => {
      console.log("token:", token);
      if (token) return signInUser(token);
    });
  }, []);

  useEffect(() => {
    console.log("response:", response);
    if (response?.type === "success") signInUser(response.params.id_token);
  }, [response]);

  const signInUser = (id_token: string) => {
    const auth = getAuth();
    const credential = GoogleAuthProvider.credential(id_token);
    console.log("auth, cred:", auth, credential);
    signInWithCredential(auth, credential).then((res) => {
      setUser(res.user);
      storageUtil.storeData("id_token", id_token);
    });
  };

  return (
    <Fragment>
      {user ? (
        <Text>{`Hi, ${user.displayName}`}</Text>
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
