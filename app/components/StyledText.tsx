import { Text, TextProps } from './Themed';

export function MonoText(props: TextProps) {
  const style = props;
  return <Text {...props} style={[style, { fontFamily: 'space-mono' }]} />;
}
