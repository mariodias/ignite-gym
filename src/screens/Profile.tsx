import { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Center, Heading, Text, VStack, set, useToast } from '@gluestack-ui/themed';
import { Controller, useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker'; 
import * as FileSystem from 'expo-file-system';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { ScreenHeader } from '@components/ScreenHeader';
import { Input } from '@components/Input';
import { UserPhoto } from '@components/UserPhoto';
import { Button } from '@components/Button';
import { ToastMessage } from '@components/ToastMessage';

import { useAuth } from '@hooks/useAuth';
import { AppError } from '@utils/AppError';
import { api } from '@service/api';

import defaultUserPhoto from '@assets/userPhotoDefault.png'

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  old_password: string;
  confirm_password: string;
}

const profileSchema = Yup.object().shape({
  name: Yup
    .string()
    .required('O Nome é obrigatório.'),
  password: Yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 dígitos.')
    .nullable()
    .transform((value) => !!value ? value : null),
  confirm_password: Yup
    .string()
    .nullable()
    .transform((value) => !!value ? value : null)
    .oneOf([Yup.ref('password'), null], 'A confirmação de senha não confere.')
    .when('password', {
      is: (Field: any) => Field, 
      then: (schema) => schema
        .nullable()
        .required('Informe a confirmação da senha.')
        .transform((value) => !!value ? value : null)
    }),
});
  
export function Profile(){

  const [isUpdating, setIsUpdating] = useState(false);
  const { user, updateUserProfile } = useAuth();

  const toast = useToast();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({ 
    defaultValues: { 
      name: user.name,
      email: user.email
    },
    resolver: yupResolver(profileSchema) as any
  });

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

      const fileExtension = photoUri.split('.').pop();

      const photoFile = {
        name: `${user.name}.${fileExtension}`.toLocaleLowerCase(),
        type: `${photoSelected.assets[0].type}/${fileExtension}`,
        uri: photoUri
      } as any;

      const userPhotoUploadForm = new FormData();
      userPhotoUploadForm.append('avatar', photoFile);

      const avatarUpdatedResponse = await api.patch('/users/avatar', userPhotoUploadForm, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const userUpdated = user;
      userUpdated.avatar = avatarUpdatedResponse.data.avatar;
      updateUserProfile(userUpdated);

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage 
            id={id}
            title="Atualização de perfil."
            description={"Foto de perfil atualizada com êxito."}
            action="success"
            onClose={() => toast.close(id)} />
        )
    });
    }
  } catch (error) {
    const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível atualizar a foto de perfil.';

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage 
            id={id}
            title="Erro de atualização de dados."
            description={`${title}`}
            action="error"
            onClose={() => toast.close(id)} />
        )
    })
   }
  }

  async function handleProfileUpdate(data: FormDataProps){
    try {
      setIsUpdating(true);

      const userUpdated = user;
      userUpdated.name = data.name;

      await api.put('/users', data);

      await updateUserProfile(userUpdated);

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage 
            id={id}
            title="Atualização de perfil."
            description="Dados atualizados com sucesso."
            action="success"
            onClose={() => toast.close(id)} />
        )
    })

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi atualizar o cadastro.';
  
      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage 
            id={id}
            title="Erro de atualização."
            description={`${title}`}
            action="error"
            onClose={() => toast.close(id)} />
        )
    })
  } finally {
    setIsUpdating(false);
   }
  
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView contentContainerStyle={{ paddingBottom: 36}}>
        <Center mt="$6" px="$10">
          <UserPhoto 
            source={user.avatar 
              ? {uri: `${api.defaults.baseURL}/avatar/${user.avatar}`} 
              : defaultUserPhoto}  
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
          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input 
                bg="$gray600" 
                placeholder="Nome" 
                onChangeText={onChange} 
                value={value}
                errorMessage={errors.name?.message}
                />
            )}
            />
         <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input 
                bg="$gray600" 
                placeholder="E-mail" 
                isReadOnly
                onChangeText={onChange} 
                value={value}/>
            )}
            />
      
        </Center>
        <Heading alignSelf="flex-start" color="$gray200" mt="$12" mb="$2" fontSize="$md" fontFamily="$heading">
          Alterar senha
        </Heading>
        <Center w="$full" gap="$4">
        <Controller 
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <Input 
                bg="$gray600"
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />

          <Controller 
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input 
                bg="$gray600"
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name="confirm_password"
            render={({ field: { onChange } }) => (
              <Input 
                bg="$gray600"
                placeholder="Confirme a nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button 
            title="Atualizar Dados"
            isLoading={isUpdating}
            onPress={handleSubmit(handleProfileUpdate)} 
            />
          </Center>
        </Center>
        </ScrollView>
    </VStack>
  );
}