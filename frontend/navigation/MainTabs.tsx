import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import CreateScreen from '../screens/CreateScreen';
import InboxScreen from '../screens/InboxScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { colors } from '../theme';

const Tabs = createBottomTabNavigator();
type IconName = React.ComponentProps<typeof Ionicons>['name'];
const icons: Record<string, [IconName, IconName]> = {
  Home: ['home', 'home-outline'],
  Discover: ['search', 'search-outline'],
  Create: ['add', 'add'],
  Inbox: ['mail', 'mail-outline'],
  Profile: ['person-circle', 'person-circle-outline'],
};

type Props = { onExit: () => void; previewMode: boolean; email: string | null };
export default function MainTabs({ onExit, previewMode, email }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <NavigationContainer>
      <Tabs.Navigator screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: '#A7B4C7',
        tabBarStyle: { ...styles.tabBar, height: 58 + insets.bottom, paddingBottom: Math.max(7, insets.bottom) },
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused, color, size }) => {
          const names = icons[route.name] ?? ['ellipse', 'ellipse-outline'];
          if (route.name === 'Create') {
            return <View style={styles.createCircle}><Ionicons name="add" size={29} color={colors.navy} /></View>;
          }
          return <Ionicons name={focused ? names[0] : names[1]} size={size} color={color} />;
        },
      })}>
        <Tabs.Screen name="Home" component={HomeScreen} />
        <Tabs.Screen name="Discover" component={DiscoverScreen} />
        <Tabs.Screen name="Create" component={CreateScreen} />
        <Tabs.Screen name="Inbox" component={InboxScreen} />
        <Tabs.Screen name="Profile">
          {() => <ProfileScreen onExit={onExit} previewMode={previewMode} email={email} />}
        </Tabs.Screen>
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  tabBar: { backgroundColor: colors.navy, borderTopColor: '#21334E', borderTopWidth: 1, paddingTop: 8 },
  tabLabel: { fontSize: 10, fontWeight: '700' },
  createCircle: { backgroundColor: colors.gold, width: 46, height: 46, borderRadius: 25, alignItems: 'center', justifyContent: 'center', marginTop: -11, shadowColor: colors.gold, shadowOpacity: 0.4, shadowRadius: 9, shadowOffset: { width: 0, height: 3 }, elevation: 7 },
});
