import { useState } from 'react';
import { SectionList } from 'react-native';
import { Heading, Text, VStack } from '@gluestack-ui/themed';

import { HistoryCard } from '@components/HistoryCard';
import { ScreenHeader } from '@components/ScreenHeader';

export function History(){

  const [exercises, setExercises] = useState([
    {
      title: "22.07.24",
      data: ["Squat", "Bench Press", "Deadlift"]
    },
    {
      title: "23.07.24",
      data: ["Squat", "Bench Press", "Deadlift"]
    },
    {
      title: "24.07.24",
      data: ["Supino Reto", "Bulgaro"]
    }
  ]);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de treinos" />
      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={() => <HistoryCard />}
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
    </VStack>
  );
}