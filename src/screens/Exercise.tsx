import { TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Heading, HStack, Icon, VStack, Text, Image, Box } from '@gluestack-ui/themed';
import { ArrowLeft } from 'lucide-react-native';

import { AppNavigatorRoutesProps } from '@routes/App.routes';

import { Button } from '@components/Button';

import BodySvg from '@assets/body.svg';
import SeriesSvg from '@assets/series.svg';
import RepetitionsSvg from '@assets/repetitions.svg';

export function Exercise(){

  const navigator = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack(){
    navigator.goBack();
  }

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
              Puxada Frontal
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text color="$gray200" ml="$1" textTransform="capitalize">Costas</Text>
          </HStack>
        </HStack>
      </VStack>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}>
      <VStack p="$8">
        <Image 
          source={{uri: "https://images.unsplash.com/photo-1575052814074-c05122e0a17a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}} 
          w="$full" 
          h="$80"
          mb="$3" 
          resizeMode="cover" 
          rounded="$lg"
          alt="Imagem do exercício" />
          <Box bg="$gray600" rounded="$md" pb="$4" px="$4">
            <HStack justifyContent="space-around" alignItems="center" mt="$5" mb="$6">
              <HStack>
                <SeriesSvg />
                <Text color="$gray200" ml="$2">4 séries</Text>
              </HStack>
              <HStack>
                <RepetitionsSvg />
                <Text color="$gray200" ml="$2">12 repetições</Text>
              </HStack>
              </HStack>
              <Button title="Marcar como feito"/>
          </Box>
      </VStack>
      </ScrollView>
    </VStack>
  );
}