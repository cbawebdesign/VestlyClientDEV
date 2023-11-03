import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes';
import Text from '../../views/text/Text';
import TextInput from '../../views/forms/TextInput';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import MainContainer from '../../views/containers/MainContainer';
import { useFirebaseAuth } from '../../config/hooks';
import { DEV_PASSWORD, DEV_USERNAME } from '../../config/constants';
import { RootState } from '../../config/store';

type SignupProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const Signup = ({ navigation }: SignupProps) => {
  const [signupData, setSignupData] = useState<{
    email: string;
    password: string;
  }>({ email: DEV_USERNAME, password: DEV_PASSWORD });
  const userSlice = useSelector((state: RootState) => state.user);

  const { initializing, handleSignup } = useFirebaseAuth();

  const handleSignupPress = React.useCallback(() => {
    handleSignup(signupData);
  }, [handleSignup, signupData]);

  const onChangeEmail = React.useCallback(
    (text: string) => setSignupData(prev => ({ ...prev, email: text })),
    [],
  );
  const onChangePassword = React.useCallback(
    (text: string) => setSignupData(prev => ({ ...prev, password: text })),
    [],
  );

  // if (userSlice.user) {
  //   // DO SOMETHING
  //   return null;
  // }

  return (
    <MainContainer enableKeyboardAvoiding>
      <Text fontSize={20}>Login</Text>
      <TextInput
        label="Email"
        placeholder="Email"
        icon="email"
        onChangeText={onChangeEmail}
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        placeholder="XXX"
        icon="lock"
        secureTextEntry
        onChangeText={onChangePassword}
      />
      <Button mode="contained" onPress={handleSignupPress}>
        Sign Up
      </Button>
    </MainContainer>
  );
};

export default Signup;
