import { useNavigation } from "@react-navigation/native";
import { VStack, Image, Center, Text, Heading, ScrollView } from "@gluestack-ui/themed";
//import { AuthNavigatorRoutesProps } from "@routes/Auth.routes";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import BackgroundImg from '@assets/background.png';
import Logo from '@assets/logo.svg';

export function Signup(){

  const navigator = useNavigation();

  function handleNavigateToSignin(){
    navigator.goBack();
  }

  return (
  <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
    <VStack flex={1} bg="$gray700">
      <Image 
        source={BackgroundImg} 
        defaultSource={BackgroundImg}
        w="$full"
        h={624}
        position="absolute"
        alt="pessoas treinando" />

      <VStack flex={1} px="$10" pb="$16">
        <Center my="$24">
          <Logo />
          <Text color="$gray100" fontSize="$sm">Treine sua Mente e seu corpo.</Text>
        </Center>

        <Center gap="$2" flex={1}>
          <Heading color="$gray100">Crie a sua conta</Heading>
          <Input placeholder="Nome"/>

          <Input 
            placeholder="E-Mail" 
            keyboardType="email-address" 
            autoCapitalize="none"/>

          <Input placeholder="Senha"secureTextEntry/>
          <Button title="Criar conta"/>
        </Center>

          <Button title="Fazer login" variant="outline" mt="$12" onPress={() => handleNavigateToSignin()} />


      </VStack>
    </VStack>
  </ScrollView>
  );
}