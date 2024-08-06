import { VStack, Image, Center, Text, Heading, ScrollView } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/Auth.routes";

import BackgroundImg from '@assets/background.png';
import Logo from '@assets/logo.svg';
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function Signin(){
  const navigator = useNavigation<AuthNavigatorRoutesProps>();

  function handleNavigateToSignup(){
    navigator.navigate('Signup');
  }

  return (
  <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
    <VStack flex={1}>
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

        <Center gap="$2">
          <Heading color="$gray100">Acesse a sua conta</Heading>
          <Input placeholder="E-Mail" keyboardType="email-address" autoCapitalize="none"/>
          <Input placeholder="Senha"secureTextEntry/>
          <Button title="Acessar"/>
        </Center>

        <Center flex={1} justifyContent="flex-end" mt="$4">
          <Text color="$gray100" fontSize="$sm" mb="$3" fontFamily="$body">Não possui uma conta? Cadastre-se.</Text>
          <Button title="Cadastre-se" variant="outline" onPress={() => handleNavigateToSignup()} />
       </Center>

      </VStack>
    </VStack>
  </ScrollView>
  );
}