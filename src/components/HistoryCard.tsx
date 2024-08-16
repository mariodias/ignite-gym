import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";
import { HistoryDTO } from "@dtos/HistoryDTO";

type Props = {
  data: HistoryDTO;
}

export function HistoryCard({data }: Props) {

  return (
      <HStack w="$full" bg="$gray600" px="$5" py="$4" rounded="$md" mb="$3" alignItems="center" justifyContent="space-between">
        <VStack flex={1} mr="$5">
         <Heading color="$white" fontSize="$md" transform="capitalize" fontFamily="$heading" numberOfLines={1}>{data.group}</Heading>
         <Text color="$gray100" fontSize="$lg" numberOfLines={1}>{data.name}</Text>
        </VStack>
        <Text color="$gray300" fontSize="$md">{data.hour}</Text>
        </HStack>
  );
}