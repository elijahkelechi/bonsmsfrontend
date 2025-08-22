// WalletSection.tsx
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  EyeIcon,
  EyeSlashIcon,
  DevicePhoneMobileIcon,
  WifiIcon,
} from 'react-native-heroicons/outline';

export default function WalletSection() {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <View className="mx-4 mt-6 bg-primary p-4 rounded-md">
      {/* Wallet Card */}
      <View className="bg-primary rounded-xl flex-row items-center justify-between shadow-md">
        {/* Balance */}
        <View>
          <Text className="text-background-card font-medium">
            Wallet Balance
          </Text>
          <Text className="text-background-card text-xl font-bold">
            {showBalance ? '₦2500.00' : '****'}
          </Text>
        </View>

        {/* Right side actions */}
        <View className="flex-row items-center space-x-4">
          {/* Toggle Balance */}
          <TouchableOpacity
            onPress={() => setShowBalance(!showBalance)}
            className="items-center">
            {showBalance ? (
              <EyeIcon size={24} color="#fff" />
            ) : (
              <EyeSlashIcon size={24} color="#fff" />
            )}
          </TouchableOpacity>

          {/* Airtime */}
          <TouchableOpacity className="items-center">
            <DevicePhoneMobileIcon size={24} color="#fff" />
            <Text className="text-xs text-background-card mt-1 font-semibold">
              Buy Airtime
            </Text>
          </TouchableOpacity>

          {/* Data */}
          <TouchableOpacity className="items-center">
            <WifiIcon size={24} color="#fff" />
            <Text className="text-xs text-background-card mt-1 font-semibold">
              Buy Data
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Fund Wallet Button */}
      <TouchableOpacity className="bg-background-card mt-3 rounded-lg py-3 shadow-sm">
        <Text className="text-center text-primary font-semibold">
          Fund Wallet
        </Text>
      </TouchableOpacity>
    </View>
  );
}
