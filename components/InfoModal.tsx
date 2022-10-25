import React, { useEffect, useState } from "react";
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
  Box,
  ButtonGroup,
} from "@chakra-ui/react";
import { Data, editStorage, getStorageByTitle } from "../util/manageStorage";

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  actionRefetch: () => void;
};

const InfoModal: React.FC<Props> = ({
  title,
  isOpen,
  onClose,
  actionRefetch,
}) => {
  const [info, setInfo] = useState<Data | null>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [inputData, setInputData] = useState<{
    title?: string;
    id?: string;
    password?: string;
  }>();
  const toast = useToast();
  useEffect(() => {
    const data = getStorageByTitle(title);
    setInfo(data);
    setInputData({ title, id: data?.id, password: data?.password });
  }, [title]);

  const onSave = () => {
    if (inputData?.title && inputData.id && inputData.password) {
      editStorage({
        title,
        id: inputData.id,
        password: inputData.password,
        newTitle: inputData.title,
      });
      onClose();
      toast({
        title: "SAVED",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      actionRefetch();
    }
  };
  return (
    <Modal
      onClose={() => {
        setIsEdit(false);
        onClose();
      }}
      size="xs"
      isOpen={isOpen}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>CREATE</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {info && (
            <Box>
              <FormControl>
                <FormLabel>TITLE</FormLabel>
                <Input
                  defaultValue={info.title}
                  disabled={!isEdit}
                  onChange={(e) =>
                    setInputData((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
                <FormLabel>ID</FormLabel>
                <Input
                  defaultValue={info.id}
                  disabled={!isEdit}
                  onChange={(e) =>
                    setInputData((prev) => ({ ...prev, id: e.target.value }))
                  }
                />
                <FormLabel>PASSWORD</FormLabel>
                <Input
                  defaultValue={info.password}
                  disabled={!isEdit}
                  onChange={(e) =>
                    setInputData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </Box>
          )}
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            {isEdit ? (
              <Button colorScheme="messenger" onClick={() => setIsEdit(false)}>
                CANCEL
              </Button>
            ) : (
              <Button colorScheme="messenger" onClick={() => setIsEdit(true)}>
                EDIT
              </Button>
            )}
            {isEdit ? (
              <Button onClick={onSave}>SAVE</Button>
            ) : (
              <Button>DELETE</Button>
            )}
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InfoModal;
