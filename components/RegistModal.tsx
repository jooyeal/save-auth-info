import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Spacer,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { setStorage } from "../util/manageStorage";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const RegistModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [inputData, setInputData] = useState<{
    title?: string;
    id?: string;
    password?: string;
  }>();
  const [error, setError] = useState<{ isError?: boolean; message?: string }>();

  const onSubmit = () => {
    if (inputData && inputData.title && inputData.id && inputData.password) {
      const res = setStorage({
        title: inputData.title,
        id: inputData.id,
        password: inputData.password,
      });
      if (res.status === "error") {
        setError({ isError: true, message: res.message });
      } else {
        setError({ isError: false, message: "" });
        onClose();
        toast({
          title: "SAVED",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      setError({ isError: true, message: "all input is required" });
    }
  };
  return (
    <Modal onClose={onClose} size="xs" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>CREATE</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={error?.isError}>
            <FormLabel>TITLE</FormLabel>
            <Input
              type="text"
              maxLength={30}
              onChange={(e) =>
                setInputData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <FormLabel>ID</FormLabel>
            <Input
              type="text"
              maxLength={30}
              onChange={(e) =>
                setInputData((prev) => ({ ...prev, id: e.target.value }))
              }
            />
            <FormLabel>PASSWORD</FormLabel>
            <Input
              type="text"
              maxLength={30}
              onChange={(e) =>
                setInputData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <Spacer h={4} />
            <Button w="full" colorScheme="messenger" onClick={onSubmit}>
              ADD
            </Button>
            {error && (
              <FormErrorMessage
                textTransform="uppercase"
                display="flex"
                justifyContent="center"
              >
                {error.message}
              </FormErrorMessage>
            )}
          </FormControl>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RegistModal;
