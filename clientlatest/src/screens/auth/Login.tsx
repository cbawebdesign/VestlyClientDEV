import React, { useEffect, useState } from 'react';
import TextInput from '../../views/forms/TextInput';
import { useFirebaseAuth } from '../../config/hooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../../routes';
import MainContainer from '../../views/containers/MainContainer';
import { DEV_PASSWORD, DEV_USERNAME, LOGO } from '../../config/constants';
import { RootState } from '../../config/store';
import { Dimensions, Image, ImageStyle, StyleSheet, View } from 'react-native';
import { pixelSizeHorizontal, pixelSizeVertical } from '../../config/utils';
import Button from '../../views/buttons/Button';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({ navigation }: LoginProps) => {
  const { handleSignin } = useFirebaseAuth();
  const authSlice = useSelector((state: RootState) => state.auth);
  const userSlice = useSelector((state: RootState) => state.user);

  const [signInData, setSignInData] = useState<{
    email: string;
    password: string;
  }>({ email: DEV_USERNAME, password: DEV_PASSWORD });

  const handleSigninPress = React.useCallback(() => {
    handleSignin(signInData);
  }, [handleSignin, signInData]);

  const handleSignupPress = React.useCallback(() => {
    navigation.navigate('Signup');
  }, [navigation]);

  const onChangeEmail = React.useCallback(
    (text: string) => setSignInData(prev => ({ ...prev, email: text })),
    [],
  );
  const onChangePassword = React.useCallback(
    (text: string) => setSignInData(prev => ({ ...prev, password: text })),
    [],
  );

  return (
    <MainContainer>
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          height: Dimensions.get('window').width,
          width: '100%',
        }}>
        <Image source={LOGO} style={style.logo} resizeMode="contain" />
        <View style={style.inputView}>
          <TextInput
            label="Email"
            placeholder="Email"
            icon="email"
            onChangeText={onChangeEmail}
            autoCapitalize="none"
            value={signInData.email}
          />
          <TextInput
            label="Password"
            placeholder="XXX"
            icon="lock"
            secureTextEntry
            onChangeText={onChangePassword}
            value={signInData.password}
          />
        </View>
        <Button
          buttonColor="#8C1CD6"
          mode="contained"
          disabled={authSlice.fetching}
          loading={authSlice.fetching}
          onPress={handleSigninPress}>
          SIGN IN
        </Button>
        <Button mode="text" onPress={handleSignupPress}>
          SIGN UP
        </Button>
      </View>
    </MainContainer>
  );
};

const style = StyleSheet.create({
  logo: {
    width: pixelSizeHorizontal(200),
    alignSelf: 'center',
    marginBottom: pixelSizeVertical(16),
  },
  inputView: {
    marginBottom: pixelSizeVertical(12.5),
  },
});

export default Login;
