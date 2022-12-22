import { Box, HStack, Image, Text, useColorModeValue } from "@chakra-ui/react";

export default function PageFooter() {
  return (
    <>
      <Box
        bg={useColorModeValue("gray.200", "blackAlpha.500")}
        color={useColorModeValue("gray.900", "gray.200")}
      >
        <HStack
          py={4}
          justify={{ base: "center", md: "center" }}
          align={{ base: "center", md: "center" }}
        >
          <HStack>
            <Image
              borderRadius={"full"}
              boxSize={"64px"}
              src={"penguin.png"}
              alt={"Footer Penguin"}
            />
          </HStack>
          <HStack>
            <Text textAlign={"center"}>
              © 2022 Penguin Passport. All rights reserved
            </Text>
          </HStack>
        </HStack>
      </Box>
    </>
  );
}
