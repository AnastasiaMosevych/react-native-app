import { TextInput } from "react-native";
import { useState } from "react";

export const CustomisedInput = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <TextInput
      {...props}
      style={[props.style, isFocused && {borderWidth: 1, borderColor: '#FF6C00', backgroundColor: '#FFFFFF'}]}
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
    />
  );
};