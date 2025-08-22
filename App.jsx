import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

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

import HomeScreen from './screens/Home';
import MessagesScreen from './screens/Messages';
import ContactsScreen from './screens/Contacts';
import SettingsScreen from './screens/Settings';
import CustomHomeHeader from './HomeComponents/CustomHeader';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            if (route.name === 'Home') {
              return <HomeIcon size={size} color={color} />;
            } else if (route.name === 'Messages') {
              return (
                <ChatBubbleOvalLeftEllipsisIcon size={size} color={color} />
              );
            } else if (route.name === 'Contacts') {
              return <UserGroupIcon size={size} color={color} />;
            } else if (route.name === 'Settings') {
              return <Cog6ToothIcon size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            header: () => <CustomHomeHeader />,
          }}
        />
        <Tab.Screen name="Messages" component={MessagesScreen} />
        <Tab.Screen name="Contacts" component={ContactsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
