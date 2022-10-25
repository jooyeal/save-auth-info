import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import InfoCard from "../components/InfoCard";
import RegistModal from "../components/RegistModal";
import { Data, getStorage } from "../util/manageStorage";

const Home: NextPage = () => {
  const [datas, setDatas] = useState<Data[] | null>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [refetch, setRefetch] = useState<boolean>(false);
  const actionRefetch = () => setRefetch((prev) => !prev);
  useEffect(() => {
    const res = getStorage();
    setDatas(res);
  }, [refetch]);

  return (
    <Flex pt={20} justifyContent="center">
      <Head>
        <title>Hello My Password</title>
        <meta
          name="description"
          content="Lets manage our personal id and password"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Flex flexDirection="column" p={4} gap={4}>
        <Button className="uppercase" colorScheme="messenger" onClick={onOpen}>
          add new id
        </Button>
        {datas?.map((data, index) => (
          <InfoCard
            key={index}
            title={data.title}
            id={data.id}
            password={data.password}
            actionRefetch={actionRefetch}
          />
        ))}
      </Flex>
      <RegistModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default Home;
