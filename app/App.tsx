"use client";

import { RecoilRoot } from 'recoil';
import Page from './page/Page';
import { ThemeProvider } from './context/themeContext';

const App = () => (
  <RecoilRoot>
     <ThemeProvider>
       <Page />
     </ThemeProvider>
  </RecoilRoot>
);

export default App;
