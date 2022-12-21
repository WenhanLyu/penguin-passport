import ColorModeButton from "../ColorModeButton";
import {
  Box,
  Flex,
  HStack,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Connect from "../Connect";

interface PageHeaderProps {
  showAbout: () => void;
  showIndex: () => void;
}

export default function PageHeader(props: PageHeaderProps) {
  const { showAbout, showIndex } = props;
  return (
    <Box bg={useColorModeValue("gray.100", "blackAlpha.500")} px={2}>
      <Flex h={48} alignItems={"center"} justifyContent={"space-between"}>
        <HStack spacing={5}>
          <Image
            borderRadius={"full"}
            boxSize={"128px"}
            src={"penguin.png"}
            onClick={showIndex}
          />
          <Text fontSize={"3xl"} as={"b"}>
            PENGUIN PASSPORT
          </Text>
          <Link onClick={showIndex} fontSize={"xl"}>
            HOME
          </Link>
          <Link onClick={showAbout} fontSize={"xl"}>
            ABOUT
          </Link>
        </HStack>

        <Flex alignItems={"center"}>
          <HStack spacing={2}>
            <ColorModeButton />
            <Connect />
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
}
