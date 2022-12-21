import CardStack from "../CardStack";
import {Box, useColorModeValue, VStack} from "@chakra-ui/react";

export default function PageBody() {
    return (
        <>
            <Box
                bg={useColorModeValue('gray.50', 'gray.900')}
                color={useColorModeValue('gray.700', 'gray.200')}
            >
                <CardStack/>
            </Box>
        </>
    );
}