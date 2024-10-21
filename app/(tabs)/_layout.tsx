import { Tabs } from 'expo-router';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
export default function TabLayout() {
  
const queryClient = new QueryClient();
  return (
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <Tabs
    
      screenOptions={{
        tabBarActiveTintColor:"#f28482",
        headerShown: true,
        headerStyle: {
          backgroundColor: "#171717",
        },
        headerTintColor:"#f28482",
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: 'bold',
        fontFamily:'DMSans'
        },
        
        tabBarStyle:{
          backgroundColor: "#171717",
        }
      }}>
      <Tabs.Screen
        name="movie"
        options={{
          title: 'Movies',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'videocam' : 'videocam-outline'} color={'#f28482'} />
          ),
        }}
      />
      <Tabs.Screen 
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'bookmark' : 'bookmark-outline'} color={'#f28482'} />
          ),
        }}
      />
    </Tabs>
    </QueryClientProvider>
    </Provider>
  );
}
