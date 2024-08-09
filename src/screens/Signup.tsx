import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { VStack, Image, Center, Text, Heading, ScrollView } from "@gluestack-ui/themed";
//import { AuthNavigatorRoutesProps } from "@routes/Auth.routes";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import BackgroundImg from '@assets/background.png';
import Logo from '@assets/logo.svg';

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const signupSchema = Yup.object({
  name: Yup.string()
           .required('O Nome de usuário é obrigatório.'),
  email: Yup.string()
            .required('O endereço de E-Mail é obrigatório.')
            .email('O endereço de E-Mail informado é inválido.'),
  password: Yup.string()
               .required('A senha é obrigatória.')
               .min(6, 'A senha deve ter no mínimo 6 caracteres.'),
  passwordConfirmation: Yup.string()
                           .required('A confirmação de senha é obrigatória.')
                           .oneOf([Yup.ref('password'), ''], 'As senhas digitadas não conferem.')
});

export function Signup(){

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>(
    {
      resolver: yupResolver(signupSchema)
    }
  );

  const navigator = useNavigation();

  function handleNavigateToSignin(){
    navigator.goBack();
  }

  function handleCreateAccount({ name, email, password, passwordConfirmation }: FormDataProps){
    console.log({ name, email, password, passwordConfirmation });
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

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

        <Controller 
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input 
              placeholder="E-Mail" 
              keyboardType="email-address" 
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.email?.message}
            />
          )} 
        />
        
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input 
              placeholder="Senha"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.password?.message}
              secureTextEntry
            />
          )} 
        />

        <Controller
          control={control}
          name="passwordConfirmation"
          render={({ field: { onChange, value } }) => (
            <Input 
              placeholder="Confirmação de Senha"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.passwordConfirmation?.message}
              secureTextEntry
              onSubmitEditing={handleSubmit(handleCreateAccount)}
              returnKeyType="send"
            />
          )}
        />
          <Button title="Criar conta" onPress={handleSubmit(handleCreateAccount)}/>
        </Center>

          <Button title="Fazer login" variant="outline" mt="$12" onPress={() => handleNavigateToSignin()} />


      </VStack>
    </VStack>
  </ScrollView>
  );
}