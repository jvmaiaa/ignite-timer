/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { defaultTheme } from './default';
import 'styled-components';

type ThemeType = typeof defaultTheme;

// Auxilia no autocompletar da classe que possui as variáveis do tema
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}