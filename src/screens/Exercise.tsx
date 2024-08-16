import { useEffect, useState } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Heading, HStack, Icon, VStack, Text, Image, Box, useToast, set } from '@gluestack-ui/themed';
import { ArrowLeft } from 'lucide-react-native';

import { AppNavigatorRoutesProps } from '@routes/App.routes';

import { Button } from '@components/Button';
import { ToastMessage } from '@components/ToastMessage';
import { Loading } from '@components/Loading';

import { AppError } from '@utils/AppError';
import { api } from '@service/api';
import { ExerciseDTO } from '@dtos/ExerciseDTO';

import BodySvg from '@assets/body.svg';
import SeriesSvg from '@assets/series.svg';
import RepetitionsSvg from '@assets/repetitions.svg';


type RouteParamsProps = {
  exerciseId: string;
}

export function Exercise(){

  const [isLoading, setIsLoading] = useState(true);
  const [sendingRegister, setSendingRegister] = useState(false);
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);

  const navigator = useNavigation<AppNavigatorRoutesProps>();
  const route = useRoute();
  const { exerciseId } = route.params as RouteParamsProps;

  const toast = useToast();

  function handleGoBack(){
    navigator.goBack();
  }

  async function handleFetchExerciseDetails(){
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/${exerciseId}`);
      const data = response.data;
      setExercise(data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi obter os detalhes dos exercícios';

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage 
            id={id}
            title="Erro de carregamento."
            description={`${title}`}
            action="error"
            onClose={() => toast.close(id)} />
        )
    })
  } finally {
      setIsLoading(false);
  }
}

async function handleExerciseHistoryRegister(){
  try {

    setSendingRegister(true);
    await api.post('/history', { exercise_id: exerciseId });

    toast.show({
      placement: 'top',
      render: ({ id }) => (
        <ToastMessage 
          id={id}
          title="Parabéns!"
          description={`O treino ${exercise.name} foi registrado com sucesso.`}
          action="success"
          onClose={() => toast.close(id)} />
      )
  })

    navigator.navigate('history');

  } catch (error) {
    const isAppError = error instanceof AppError;
    const title = isAppError ? error.message : 'Não foi possível registrar o exercício.';

    toast.show({
      placement: 'top',
      render: ({ id }) => (
        <ToastMessage 
          id={id}
          title="Erro de carregamento."
          description={`${title}`}
          action="error"
          onClose={() => toast.close(id)} />
      )
  })
} finally {
    setSendingRegister(false);
 }
}

useEffect(() => {
  handleFetchExerciseDetails();
}, [exerciseId]);

  return (
    <VStack flex={1}>
      <VStack px="$8" bg="$gray600" pt="$12">
        <TouchableOpacity onPress={() => handleGoBack()}>
        <Icon as={ArrowLeft} color="$green500" size="xl" />
        </TouchableOpacity>
        <HStack 
          justifyContent="space-between" 
          alignItems="center" 
          mt="$4" 
          mb="$8">
          <Heading 
            color="$gray100" 
            fontSize="$lg" 
            fontFamily="$heading"
            flexShrink={1}>
              {exercise.name}
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text color="$gray200" ml="$1" textTransform="capitalize">{exercise.group}</Text>
          </HStack>
        </HStack>
      </VStack>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}>
    { isLoading ? <Loading /> :
      <VStack p="$8">
      <Box rounded="$lg" mb={3} overflow="hidden">
        <Image 
          source={{uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`}} 
          w="$full" 
          h="$80"
          mb="$3" 
          resizeMode="cover" 
          rounded="$lg"
          alt="Imagem do exercício" />
          </Box>
          <Box bg="$gray600" rounded="$md" pb="$4" px="$4">
            <HStack justifyContent="space-around" alignItems="center" mt="$5" mb="$6">
              <HStack>
                <SeriesSvg />
                <Text color="$gray200" ml="$2">{exercise.series} séries</Text>
              </HStack>
              <HStack>
                <RepetitionsSvg />
                <Text color="$gray200" ml="$2">{exercise.repetitions} repetições</Text>
              </HStack>
              </HStack>
              <Button 
                title="Marcar como realizado"
                isLoading={sendingRegister}
                onPress={() => handleExerciseHistoryRegister()}
                />
          </Box>
      </VStack>
}
      </ScrollView>
    </VStack>
  );
}