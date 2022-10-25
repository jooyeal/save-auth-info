import { Box, Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { BiMenu } from "react-icons/bi";
import Menu from "./Menu";

type Props = {};

const Header = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      w="full"
      h={16}
      top={0}
      position="fixed"
      justifyContent="space-between"
      alignItems="center"
      pl={2}
      pr={2}
      bgColor="messenger.600"
    >
      <IconButton
        aria-label="menu"
        icon={<BiMenu size={30} />}
        colorScheme="messenger"
        onClick={onOpen}
      />
      <Box
        textTransform="uppercase"
        color="white"
        fontWeight="bold"
        fontSize={24}
      >
        SAVE AUTH INFO
      </Box>
    </Flex>
  );
};

export default Header;
