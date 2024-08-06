import { StatusBar } from 'react-native';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from './config/gluestack-ui.config';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { Loading } from '@components/Loading';
import { Routes } from '@routes/index';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
      <GluestackUIProvider config={config}>
        <StatusBar 
          barStyle="light-content" 
          backgroundColor='transparent' 
          translucent />

        { fontsLoaded ? <Routes />
          : <Loading />
        }
      </GluestackUIProvider>
  );
  }
