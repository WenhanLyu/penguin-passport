import {extendTheme, ThemeConfig} from '@chakra-ui/react';


const theme: ThemeConfig = extendTheme({
    fonts: {
        heading: `'andale mono', monospace`,
        body: `'Montserrat', sans-serif`,
    },
    initialColorMode: 'dark',
    useSystemColorMode: false,
})

export default theme