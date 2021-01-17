import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { pallete } from '../assets/pallete';
import HomeScreen from '../screens/home';
import SettingsScreen from '../screens/settings';
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <NavigationContainer>
          <Tab.Navigator
            tabBarOptions={{
              showLabel:false
            }}
          >
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={
                {
                  tabBarIcon: ({ focused }) => <Feather name='wifi' size={30} color={focused ? pallete.darkMain : pallete.lightMain} />
                }
              }
            />
            <Tab.Screen
              name="Settings"
              component={SettingsScreen}
              options={
                {
                  tabBarIcon: ({ focused }) => <Feather name='settings' size={30} color={focused ? pallete.darkMain : pallete.lightMain} />
                }
              }
            />
          </Tab.Navigator>
        </NavigationContainer>
      );
}

export default TabNavigation
