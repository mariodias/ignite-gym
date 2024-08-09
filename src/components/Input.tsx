import { ComponentProps } from 'react';
import { Input as GlueStackInput, InputField, FormControl, FormControlErrorText, FormControlError } from '@gluestack-ui/themed';

type Props = ComponentProps<typeof InputField> & {
  isReadOnly?: boolean;
  errorMessage?: string | null;
  isInvalid?: boolean;
}

export function Input({ isReadOnly = false, errorMessage = null, isInvalid = false, ...rest }: Props) {

  const invalid = isInvalid || !!errorMessage;

  return (
  <FormControl isInvalid={invalid} w="$full" mb="$4">
    <GlueStackInput 
      isInvalid={invalid}
      h="$14" 
      borderWidth="$0" 
      borderRadius="$md"
      isReadOnly={isReadOnly}
      opacity={isReadOnly ? 0.5 : 1}
      $focus={{
        borderWidth: '$1',
        borderColor: invalid ? '$red500' : '$green500'
      }}
      $invalid={{
        borderWidth: '$1',
        borderColor: '$red500'
      }}
      
      >
      <InputField 
        bg='$gray700' 
        px="$4"
        color="$white"
        fontFamily="$body"
        placeholderTextColor="$gray300"
        {...rest} />

     </GlueStackInput>
     <FormControlError>
    <FormControlErrorText color="$red500">{errorMessage}</FormControlErrorText>
    </FormControlError>
  </FormControl>
  );
}