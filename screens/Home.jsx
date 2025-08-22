import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  View,
  Alert,
  NativeModules,
} from 'react-native';

import WalletSection from '../HomeComponents/WalletSection';
import Camera from '../HomeComponents/Camera';
import Subscription from '../HomeComponents/Subscription';

const {DefaultSmsModule} = NativeModules;

const HomeScreen = () => {
  const [isRequesting, setIsRequesting] = useState(false);

  const handleSetDefaultSms = async () => {
    if (Platform.OS !== 'android') {
      Alert.alert('Info', 'This feature is only available on Android.');
      return;
    }

    if (
      !DefaultSmsModule ||
      typeof DefaultSmsModule.requestDefaultSmsApp !== 'function'
    ) {
      console.warn('DefaultSmsModule not available:', DefaultSmsModule);
      Alert.alert(
        'Error',
        'Native module not available. Make sure DefaultSmsModule is registered in Android native code.',
      );
      return;
    }

    if (isRequesting) {
      console.log('Request already in progress — ignoring duplicate tap.');
      return;
    }

    setIsRequesting(true);
    console.log('JS: calling native to request default SMS app');

    try {
      // The native method should return a Promise<boolean> (true if accepted, false if declined),
      // but some implementations resolve to other values; handle common cases.
      const result = await DefaultSmsModule.requestDefaultSmsApp();
      console.log('JS: native result ->', result);

      // Interpret possible result values
      const accepted =
        result === true || result === 'true' || result === 1 || result === '1';

      if (accepted) {
        Alert.alert('Success', 'This app is now the default SMS app.');
      } else {
        // If native resolved false or undefined, treat as "not accepted"
        Alert.alert(
          'Not Set',
          'The app was not set as default SMS. The user may have cancelled or the system blocked the request.',
        );
      }
    } catch (err) {
      console.error('JS: error requesting default SMS role', err);
      const message = err?.message ?? String(err);
      Alert.alert('Error', 'Failed to request default SMS app: ' + message);
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{paddingBottom: 20}}>
          <WalletSection />
          <Camera />
          <Subscription />
          <View style={{margin: 20}}>
            <Button
              title={isRequesting ? 'Requesting…' : 'Set as Default SMS App'}
              onPress={handleSetDefaultSms}
              disabled={isRequesting}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
