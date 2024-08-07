import { useState } from 'react';
import { FlatList } from 'react-native';
import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { HStack, VStack, Text, Heading } from '@gluestack-ui/themed';
import { ExerciseCard } from '@components/ExerciseCard';

export function Home(){

  const [exercises, setExercises] = useState<string[]>(['Puxada Frontal', 'Bulgaro', 'Barra W', 'Supino Reto', 'Rosca Martelo', 'Desenvolvimento', 'Triceps Corda']);
  const [groups, setGroups] = useState<string[]>(['Costas', 'Biceps', 'Triceps', 'Ombro']);
  const [groupSelected, setGroupSelected] = useState<string>('Todos');

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
      <VStack px="$8" flex={1}>
        <HStack justifyContent="space-between" alignItems="center" mb="$5">
          <Heading color="$gray200" fontSize="$md" fontFamily="$heading">Exercícios</Heading>
          <Text color="$gray200" fontSize="$sm" fontFamily="$body">{exercises.length}</Text>
        </HStack>
        <FlatList
          data={exercises}
          keyExtractor={item => item}
          renderItem={() => <ExerciseCard />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
  
      </VStack>
    </VStack>
  );
}