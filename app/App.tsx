import RootNavigator from '@/components/root_navigator';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

const App: React.FC = () => {
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <RootNavigator />
      </SafeAreaView>
    </PaperProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
