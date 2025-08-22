import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {CheckCircleIcon, XCircleIcon} from 'react-native-heroicons/outline';

export default function Subscription() {
  const [status, setStatus] = useState('expired'); // default status
  const [activationCode, setActivationCode] = useState('');

  const handleActivate = () => {
    if (activationCode.trim().length > 0) {
      // TODO: validate with backend API
      setStatus('active');
      setActivationCode('');
    } else {
      alert('Please enter a valid activation code');
    }
  };

  return (
    <View className="bg-background-card rounded-xl p-5 shadow-md mx-4 mt-4">
      {/* Title */}
      <Text className="text-secondary-dark font-semibold text-base mb-3">
        Subscription & Activation
      </Text>

      {/* Status Row */}
      <View className="flex-row items-center mb-4">
        {status === 'active' ? (
          <>
            <CheckCircleIcon size={24} color="#22C55E" />
            <Text className="text-success font-semibold ml-2">Active</Text>
          </>
        ) : (
          <>
            <XCircleIcon size={24} color="#EF4444" />
            <Text className="text-danger font-semibold ml-2">Expired</Text>
          </>
        )}
      </View>

      {/* Expired → show buy + enter code options */}
      {status === 'expired' ? (
        <>
          {/* Buy Code Button */}
          <TouchableOpacity
            className="bg-primary rounded-lg py-3 mb-3"
            onPress={() => alert('Redirecting to purchase page...')}>
            <Text className="text-background-card text-center font-semibold">
              Buy Activation Code
            </Text>
          </TouchableOpacity>

          {/* Enter Code Input */}
          <View className="flex-row items-center border border-gray-300 rounded-lg px-3 mb-3">
            <TextInput
              className="flex-1 py-2 text-secondary-dark"
              placeholder="Enter activation code"
              placeholderTextColor="#999"
              value={activationCode}
              onChangeText={setActivationCode}
              returnKeyType="done"
            />
          </View>

          {/* Activate Button */}
          <TouchableOpacity
            className="bg-green-600 rounded-lg py-3"
            onPress={handleActivate}>
            <Text className="text-background-card text-center font-semibold">
              Activate Now
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        /* Active → show renew button */
        <TouchableOpacity
          className="bg-primary rounded-lg py-3"
          onPress={() => setStatus('expired')}>
          <Text className="text-background-card text-center font-semibold">
            Renew Subscription
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
