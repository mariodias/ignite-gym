import { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { HStack, VStack, Text, Heading, useToast, set } from '@gluestack-ui/themed';

import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { ExerciseCard } from '@components/ExerciseCard';
import { ToastMessage } from '@components/ToastMessage';
import { Loading } from '@components/Loading';

import { AppNavigatorRoutesProps } from '@routes/App.routes';

import { api } from '@service/api';
import { AppError } from '@utils/AppError';
import { ExerciseDTO } from '@dtos/ExerciseDTO';

export function Home(){

  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const [groups, setGroups] = useState<string[]>([]);
  const [groupSelected, setGroupSelected] = useState<string>('antebraço');

  const toast = useToast();

  const navigator = useNavigation<AppNavigatorRoutesProps>();

  function handleNavigateToExercise(exerciseId: string){
    navigator.navigate('exercise', { exerciseId });
  }

  async function handleGetGroups(){
    try {
      const response = await api.get('/groups');
      const data = response.data;
      setGroups(data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os grupos musculares';

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
  }
}

async function handleGetExercises(){
  try {
      setIsLoading(true);
      const response = await api.get(`/exercises/bygroup/${groupSelected}`);
      const data = response.data;
      setExercises(data);
  } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os exercícios';

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

useEffect(() => {
  handleGetGroups();
}, []);

useFocusEffect(useCallback(() => {
  handleGetExercises();
}, [groupSelected]));

  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => <Group name={item} isActive={groupSelected === item} onPress={() => setGroupSelected(item)} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 32 }}
        style={{ marginVertical: 40, maxHeight: 44, minHeight: 44 }}
      />
  { isLoading ? <Loading /> :
  <VStack px="$8" flex={1}>
        <HStack justifyContent="space-between" alignItems="center" mb="$5">
          <Heading color="$gray200" fontSize="$md" fontFamily="$heading">Exercícios</Heading>
          <Text color="$gray200" fontSize="$sm" fontFamily="$body">{exercises.length}</Text>
        </HStack>
        <FlatList
          data={exercises}
          keyExtractor={item => item.id}
          renderItem={({item}) => <ExerciseCard 
                              data={item}
                              onPress={() => handleNavigateToExercise(item.id)} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>}
    </VStack>
  );
}