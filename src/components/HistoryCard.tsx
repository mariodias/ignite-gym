import { Heading, HStack, Image, Text, VStack, Icon } from "@gluestack-ui/themed";
import { ChevronRight } from "lucide-react-native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
  name?: string;
}


export function HistoryCard({name, ...rest }: Props) {
  return (
      <HStack w="$full" bg="$gray600" px="$5" py="$4" rounded="$md" mb="$3" alignItems="center" justifyContent="space-between">
        <VStack mr="$5">
         <Heading color="$white" fontSize="$md" transform="capitalize" fontFamily="$heading">Costas</Heading>
         <Text color="$gray100" fontSize="$lg" numberOfLines={1}>Puxada Frontal</Text>
        </VStack>
        <Text color="$gray300" fontSize="$md">08:56</Text>
        </HStack>
  );
}