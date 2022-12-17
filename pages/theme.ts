import {extendTheme, ThemeConfig} from '@chakra-ui/react';


const theme: ThemeConfig = extendTheme({
    fonts: {
        heading: `'andale mono', monospace`,
        body: `'courier', monospace`,
    },
    initialColorMode: 'dark',
    useSystemColorMode: false,
})

export default theme