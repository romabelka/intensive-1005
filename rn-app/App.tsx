import React from 'react';
import { View } from 'react-native';
import EventList from './src/components/event-list'
import AuthForm from './src/components/auth-form'


export default function App() {
  return (
    <View style={styles.container as any}>
      <AuthForm />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
}
