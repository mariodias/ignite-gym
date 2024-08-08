import { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Center, Heading, Text, VStack, useToast } from '@gluestack-ui/themed';
import * as ImagePicker from 'expo-image-picker'; 
import * as FileSystem from 'expo-file-system';

import { ScreenHeader } from '@components/ScreenHeader';
import { Input } from '@components/Input';
import { UserPhoto } from '@components/UserPhoto';
import { Button } from '@components/Button';
import { ToastMessage } from '@components/ToastMessage';

export function Profile(){

  const toast = useToast();
  const [userPhoto, setUserPhoto] = useState("https://github.com/mariodias.png");

  async function handleUserPhotoSelect(){
    try {
    const photoSelected = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true,
    });

    if(photoSelected.canceled){
      return;
    }

    const photoUri = photoSelected.assets[0].uri;

    if(photoUri){
      const photoInfo = await FileSystem.getInfoAsync(photoUri) as {
        size: number;
      };

      if(photoInfo.size && (photoInfo.size / 1024 / 1024) > 5){
       return toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage 
            id={id}
            title="Erro no carregamento da foto."
            description="A foto precisa ter menos do que 5MB."
            action="error"
            onClose={() => toast.close(id)} />
        )
       })
      }
      setUserPhoto(photoSelected.assets[0].uri);
    }
  } catch (error) {
    console.log(error);
   }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView contentContainerStyle={{ paddingBottom: 36}}>
        <Center mt="$6" px="$10">
          <UserPhoto 
            source={{uri: userPhoto}} 
            size="xl"
            alt="Foto de perfil de usuário"/>
            <TouchableOpacity onPress={() => handleUserPhotoSelect()}>
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