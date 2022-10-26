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
    console.log(response, request);
    if (response?.type === "success") {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).then((res) => setUser(res.user));
    }
  }, [response]);

  return (
    <Fragment>
      {user ? (
        <Text>{`Hi, ${user.displayName}`}</Text>
      ) : (
        <Button
          disabled={!request}
          title={"Login"}
          onPress={() => {
            promptAsync();
          }}
        />
      )}
    </Fragment>
  );
};

export default Auth;
