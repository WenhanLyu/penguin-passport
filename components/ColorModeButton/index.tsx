import {Button, useColorMode, useColorModeValue} from "@chakra-ui/react";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";


export default function ColorModeButton() {
    const {colorMode, toggleColorMode} = useColorMode();
    return (
        <>
            <Button onClick={toggleColorMode} w={12} h={12} colorScheme={useColorModeValue('gray.100', 'gray.900')}>
                {colorMode === 'light' ? <MoonIcon color={'gray'}/> : <SunIcon color={'white'}/>}
            </Button>
        </>
    );
}