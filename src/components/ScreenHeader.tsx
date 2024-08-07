import { Heading, Center } from '@gluestack-ui/themed';

export function ScreenHeader(){
  return (
    <Center 
      bg="$gray600" 
      pt="$16" 
      pb="$6">
      <Heading color="$gray100" fontSize="$xl" fontFamily="$heading">Histórico</Heading>
    </Center>
  );
}