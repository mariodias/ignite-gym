import { useCallback, useState } from 'react';
import { SectionList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Heading, Text, VStack, set, useToast } from '@gluestack-ui/themed';

import { HistoryCard } from '@components/HistoryCard';
import { ScreenHeader } from '@components/ScreenHeader';
import { ToastMessage } from '@components/ToastMessage';
import { Loading } from '@components/Loading';

import { AppError } from '@utils/AppError';
import { api } from '@service/api';
import { HistoryByDayDTO } from '@dtos/HistoryByDayDTO';

export function History(){

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  async function handleFetchExerciseHistory(){
    try {
      const response = await api.get('/history');
      const data = response.data;
      setIsLoading(true);
      setExercises(data);
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
      setIsLoading(false);
   }
  }

  useFocusEffect(useCallback(() => {
    handleFetchExerciseHistory();
  }, []));

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de treinos" />
    { isLoading ? <Loading /> :
      <SectionList
        sections={exercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HistoryCard data={item}/>}
        renderSectionHeader={({ section }) => (
          <Heading 
            color="$gray200" 
            fontSize="$md" 
            fontFamily="$heading" 
            mt="$10" 
            mb="$3">
          {section.title}
          </Heading>
        )}
        style={{ paddingHorizontal: 32 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={ exercises.length === 0 && { flex: 1, justifyContent: 'center' }}
        ListEmptyComponent={() => (
          <Text 
            color="$gray100" 
            fontSize="$md" 
            fontFamily="$heading" 
            textAlign="center" 
            mt="$10">
            No exercises found
          </Text>
        )}
      />
}
    </VStack>
  );
}