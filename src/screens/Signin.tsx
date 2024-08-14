import { useNavigation } from "@react-navigation/native";
import { VStack, Image, Center, Text, Heading, ScrollView, useToast, set } from "@gluestack-ui/themed";

import { AuthNavigatorRoutesProps } from "@routes/Auth.routes";

import { useAuth } from "@hooks/useAuth";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import BackgroundImg from '@assets/background.png';
import Logo from '@assets/logo.svg';
import { Controller, useForm } from "react-hook-form";
import { AppError } from "@utils/AppError";
import { ToastMessage } from "@components/ToastMessage";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
}

export function Signin(){
  
  const [isLoading, setIsLoading] = useState(false);
  
  const navigator = useNavigation<AuthNavigatorRoutesProps>();
  const { signIn } = useAuth();

  const toast = useToast();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>()

  function handleNavigateToSignup(){
    navigator.navigate('signup');
  }

  async function handleSignIn({ email, password }: FormData){
   try { 
    setIsLoading(true);
    await signIn(email, password);

   } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Não foi possível acessar a conta. Tente niovamente mais tarde.';

      setIsLoading(false);

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage 
            id={id}
            title="Erro de autenticação."
            description={`${title}`}
            action="error"
            onClose={() => toast.close(id)} />
        )
    })
  }
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
          <Controller 
            control={control}
            name="email"
            rules={{ required: 'Informe o e-mail' }}
            render={({ field: { onChange } }) => (
              <Input 
                placeholder="E-mail" 
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />
          
          <Controller 
            control={control}
            name="password"
            rules={{ required: 'Informe a senha' }}
            render={({ field: { onChange } }) => (
              <Input 
                placeholder="Senha" 
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Button 
            title="Acessar"
            isLoading={isLoading}
            onPress={handleSubmit(handleSignIn)} />
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