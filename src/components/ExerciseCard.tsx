import { Heading, HStack, Image, Text, VStack, Icon } from "@gluestack-ui/themed";
import { ChevronRight } from "lucide-react-native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
  name?: string;
}


export function ExerciseCard({name, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg="$gray500" p="$2" pr="$4" rounded="$md" mb="$3" alignItems="center">
        <Image 
          source={{uri: "https://v4excellencefitness.com.br/wp-content/uploads/2023/05/image_iphone.jpg"}} 
          w="$16" 
          h="$16"
          rounded="$md"
          mr="$4"
          resizeMode="cover" 
          alt="Imagem do exercício" />

        <VStack flex={1}>
         <Heading color="$white" fontSize="$lg" fontFamily="$heading">{name}</Heading>
         <Text color="$gray200" fontSize="$sm" mt="$1" fontFamily="$body" numberOfLines={2}>4 séries de 10 repetições</Text>
        </VStack>
        <Icon as={ChevronRight} color="$gray300" />
        </HStack>
    </TouchableOpacity>
  );
}