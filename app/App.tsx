import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootSiblingParent } from 'react-native-root-siblings';
import { RecoilRoot } from 'recoil';
import { LogBox } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  LogBox.ignoreLogs(['Setting a timer']);

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <RootSiblingParent>
      <RecoilRoot>
        <SafeAreaProvider>
          <PaperProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </PaperProvider>
        </SafeAreaProvider>
      </RecoilRoot>
    </RootSiblingParent>
  );
}
