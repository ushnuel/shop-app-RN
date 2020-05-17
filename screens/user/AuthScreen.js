import React, { useReducer, useState, useCallback, useEffect } from "react";
import {
  Button,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import * as actionCreators from "../../store/actions";
import formInputReducer from "../../components/UI/Form";

const FORM_INPUT_REDUCER = "FORM_INPUT_REDUCER";

const authScreen = (props) => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const [formState, dispatchFormState] = useReducer(formInputReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidites: {
      email: false,
      password: false,
    },
    formValidity: false,
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_REDUCER,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const authHandler = async () => {
    const { inputValues, formValidity } = formState;

    if (!formValidity) {
      Alert.alert(
        "Input Validation Failed",
        "One or more input fields failed validation, please try again!",
        [{ text: "okay" }]
      );
      return;
    }

    setError(null);
    setIsLoading(true);
    let action;

    if (isSignUp) {
      action = actionCreators.authenticate(
        inputValues.email,
        inputValues.password,
        "SIGNUP"
      );
    } else {
      action = actionCreators.authenticate(
        inputValues.email,
        inputValues.password,
        "SIGNIN"
      );
    }

    try {
      await dispatch(action);
      props.navigation.navigate("Shop");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("Error occurred!", error, [{ text: "okay" }]);
      return;
    }
  }, [error]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "height" : "padding"}
      keyboardVerticalOffset={10}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-mail"
              email
              required
              onInputChange={inputChangeHandler}
              initialValue=""
              initiallyValid={false}
              errorText="Please enter a valid email address"
              keyBoardType="email-address"
            />
            <Input
              id="password"
              label="Password"
              minLength={8}
              required
              onInputChange={inputChangeHandler}
              initialValue=""
              initiallyValid={false}
              errorText="Please enter a valid password"
              keyBoardType="password"
              secureTextEntry
            />
            <View style={styles.button}>
              {isLoading ? (
                <ActivityIndicator size="large" color={Colors.primary} />
              ) : (
                <Button
                  title={isSignUp ? "SIGN UP" : "LOGIN"}
                  color={Colors.primary}
                  onPress={authHandler}
                  disabled={!formState.formValidity ? true : false}
                />
              )}
            </View>
            <View style={styles.button}>
              <Button
                title={isSignUp ? "SIGN IN INSTEAD" : "SIGN UP TO CONTINUE"}
                color={Colors.accent}
                onPress={() => {
                  setIsSignUp((prevState) => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

authScreen.navigationOptions = {
  headerTitle: "Authenticate",
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    padding: 20,
    maxHeight: 400,
    width: "80%",
    maxWidth: 400,
    borderRadius: 10,
  },
  button: {
    marginTop: 10,
  },
});
export default authScreen;
