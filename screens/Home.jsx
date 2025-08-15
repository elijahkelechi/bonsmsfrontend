import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const HomeScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <TouchableOpacity className="items-center">
        <Icon name="camera" stroke="#F97316" width={80} height={80} />
        <Text className="text-primary font-bold text-lg mt-4">
          Upload Contact List Image
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
