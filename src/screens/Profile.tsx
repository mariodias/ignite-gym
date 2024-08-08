import { ScrollView, TouchableOpacity } from 'react-native';

import { ScreenHeader } from '@components/ScreenHeader';
import { Input } from '@components/Input';
import { Center, Heading, Text, VStack } from '@gluestack-ui/themed';
import { UserPhoto } from '@components/UserPhoto';
import { Button } from '@components/Button';

export function Profile(){
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView contentContainerStyle={{ paddingBottom: 36}}>
        <Center mt="$6" px="$10">
          <UserPhoto 
            source={{uri: "https://github.com/mariodias.png"}} 
            size="xl"
            alt="Foto de perfil de usuário"/>
            <TouchableOpacity>
              <Text 
                fontFamily="$heading" 
                fontSize="$md" 
                color="$green500" 
                mt="$2" 
                mb="$8">
                  Alterar foto
              </Text>
            </TouchableOpacity>
        <Center w="$full" gap="$4">
          <Input bg="$gray600" placeholder="Nome"/>
          <Input bg="$gray600" value="mario@me.io" isReadOnly/>
        </Center>
        <Heading alignSelf="flex-start" color="$gray200" mt="$12" mb="$2" fontSize="$md" fontFamily="$heading">
          Alterar senha
        </Heading>
        <Center w="$full" gap="$4">
          <Input bg="$gray600" placeholder="Senha atual" secureTextEntry/>
          <Input bg="$gray600" placeholder="Nova senha" secureTextEntry/>
          <Input bg="$gray600" placeholder="Confirmar nova senha" secureTextEntry/>
          <Button title="Atualizar Senha" />
          </Center>
        </Center>
        </ScrollView>
    </VStack>
  );
}