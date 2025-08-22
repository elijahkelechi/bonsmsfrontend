import React from 'react';
import {View, Text, TouchableOpacity, Image as RNImage} from 'react-native';
import {styled} from 'nativewind';

// Make a styled Image
const Image = styled(RNImage);

// 👇 heroicons
import {
  HomeIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  BellIcon,
  QrCodeIcon,
  QuestionMarkCircleIcon,
} from 'react-native-heroicons/outline';

function CustomHomeHeader() {
  return (
    <View className="h-16 bg-white flex-row items-center justify-between px-4 shadow-sm">
      {/* Left Section */}
      <View className="flex-row items-center space-x-2">
        <View className="relative">
          <Image
            source={require('../assets/menu.jpeg')}
            className="w-8 h-8 rounded-full"
          />
          <View className="absolute -bottom-1 -right-1 bg-yellow-400 w-4 h-4 rounded-full border border-white" />
        </View>
        <Text className="text-base font-semibold text-black">Hi, THANKGOD</Text>
      </View>

      {/* Right Section */}
      <View className="flex-row items-center space-x-4">
        {/* Help */}
        <TouchableOpacity className="relative">
          <QuestionMarkCircleIcon size={24} color="black" />
          <View className="absolute -top-2 -right-2 bg-pink-500 px-1 rounded-full">
            <Text className="text-[5px] text-white font-bold">HELP</Text>
          </View>
        </TouchableOpacity>

        {/* Scan */}
        <TouchableOpacity>
          <QrCodeIcon size={26} color="black" />
        </TouchableOpacity>

        {/* Notifications */}
        <TouchableOpacity className="relative">
          <BellIcon size={24} color="black" />
          <View className="absolute -top-2 -right-2 bg-red-500 px-1 rounded-full">
            <Text className="text-[10px] text-white font-bold">93</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CustomHomeHeader;
