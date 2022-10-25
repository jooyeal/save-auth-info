import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import InfoModal from "./InfoModal";

type Props = {
  title: string;
  id: string;
  password: string;
  actionRefetch: () => void;
};

const InfoCard: React.FC<Props> = ({ title, id, password, actionRefetch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box className="w-80 shadow-lg p-2 rounded" onClick={onOpen}>
      <Text className="text-lg font-bold">{title}</Text>
      <Flex>
        <Text className="font-bold">ID: </Text>
        <Text className="truncate">{title}</Text>
      </Flex>
      <Flex>
        <Text className="font-bold">PW: </Text>
        <Text className="truncate">{password}</Text>
      </Flex>
      <InfoModal
        title={title}
        isOpen={isOpen}
        onClose={onClose}
        actionRefetch={actionRefetch}
      />
    </Box>
  );
};

export default InfoCard;
