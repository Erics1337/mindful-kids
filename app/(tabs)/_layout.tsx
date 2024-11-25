import {Text} from '@/components/ui';
import {List} from '@/lib/icons/List';
import {Settings} from '@/lib/icons/Settings';
import {Star} from '@/lib/icons/Star';

import {Tabs} from 'expo-router';

export const unstable_settings = {
  initialRouteName: "index",
};

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({color}) => <Star className="text-foreground" />,
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: 'Exercises',
          tabBarIcon: ({color}) => <List className="text-foreground" />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({color}) => <Settings className="text-foreground" />,
        }}
      />
    </Tabs>
  );
}
