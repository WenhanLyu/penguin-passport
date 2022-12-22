import CardStack from "../CardStack";
import { Box, useColorModeValue } from "@chakra-ui/react";

export default function PageBody() {
  return (
    <>
      <Box
        bg={useColorModeValue("gray.50", "gray.800")}
        color={useColorModeValue("gray.700", "gray.200")}
        pb={"20px"}
      >
        <CardStack />
      </Box>
    </>
  );
}
