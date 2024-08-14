import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Heading, HStack, Image, Text, VStack, Icon } from "@gluestack-ui/themed";
import { ChevronRight } from "lucide-react-native";

import { api } from "@service/api";
import { ExerciseDTO } from "@dtos/ExerciseDTO";

type Props = TouchableOpacityProps & {
  data: ExerciseDTO;
}

export function ExerciseCard({data, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg="$gray500" p="$2" pr="$4" rounded="$md" mb="$3" alignItems="center">
        <Image 
          source={{uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`}} 
          w="$16" 
          h="$16"
          rounded="$md"
          mr="$4"
          resizeMode="cover" 
          alt="Imagem do exercício" />

        <VStack flex={1}>
         <Heading color="$white" fontSize="$lg" fontFamily="$heading">{data.name}</Heading>
         <Text color="$gray200" fontSize="$sm" mt="$1" fontFamily="$body" numberOfLines={2}>{`${data.series} séries de ${data.repetitions} repetições`}</Text>
        </VStack>
        <Icon as={ChevronRight} color="$gray300" />
        </HStack>
    </TouchableOpacity>
  );
}