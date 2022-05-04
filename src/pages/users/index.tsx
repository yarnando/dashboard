import { useEffect, useState } from "react";
import NextLink from "next/link";

import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Link,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";

import { RiAddLine, RiPencilLine } from "react-icons/ri";

import Header from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import Sidebar from "../../components/Sidebar";

import { useUsers } from "../../services/hooks/useUsers";

import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";

export default function UserList() {

  const [page, setPage] = useState(1)

  const { data, isLoading, isFetching, error } = useUsers(page)

  // Estado para o isWideVersion já começar como false para corrigir bug ao abrir a página
  const [isWideVersion, setIsWideVersion] = useState(false);

  // Hook para monitorar o breakpoint
  const isWideVersionChakra = useBreakpointValue({
    base: false,
    md: true,
  });

  // useEffect para setar o estado
  useEffect(() => {
    setIsWideVersion(isWideVersionChakra);
  }, [isWideVersionChakra])

  async function handlePrefetchUser(userId) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`)

      return response.data
    }, {
      staleTime: 1000 * 60 * 10, // 10 minutos
      //tempo de fresh do user que foi buscado
    })
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius="8" bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {
                !isLoading && isFetching && 
                <Spinner
                  size="sm"
                  color="gray.500"
                  ml="4"
                />
              }
            </Heading>

            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="green"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                _hover={{
                  cursor: "pointer",
                }}
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>

          {
            isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : error ? (
              <Flex justify="center">
                <Text>Falha ao obter dados dos usuários</Text>
              </Flex>
            ) : (
              <>
                <Table colorScheme="whiteAlpha" w={["100%"]}>
                  <Thead>
                    {isWideVersion ? (
                      <Tr>
                        <Th px={["0", "0", "6"]} color="gray.300" width="8">
                          <Checkbox colorScheme="green" />
                        </Th>
                        <Th>Usuário</Th>
                        <Th>Data de cadastro</Th>
                        <Th>Ações</Th>
                      </Tr>
                    ) : (
                      <Tr>
                        <Th
                          px={["0", "0", "6"]}
                          color="gray.300"
                          display="flex"
                          justifyContent="space-between"
                        >
                          <Text>Selecionar todos:</Text>
                          <Checkbox colorScheme="green" />
                        </Th>
                      </Tr>
                    )}
                  </Thead>
                  <Tbody>

                    {data.users.map(user => {
                      return (
                        <Tr
                          key={user.id}
                          display={["block", "block", "table-row"]}
                          borderBottom={["2px dashed gray", "2px dashed gray", "none"]}
                          _last={{ borderBottom: "none" }}
                        >
                          <Td
                            px={["0", "0", "6"]}
                            textAlign={["right", "right", "inherit"]}
                            justifyContent={["space-between", "space-between", "inherit"]}
                            display={["flex", "flex", "revert"]}
                            _before={{
                              display: "flex",
                              alignItems: "center",
                              textAlign: "left",
                              color: "gray.400",
                              content: `attr(data-label)`,
                            }}
                            data-label={!isWideVersion ? "Check:" : ""}
                          >
                            <Checkbox colorScheme="green" />
                          </Td>
                          <Td
                            px={["0", "0", "6"]}
                            textAlign={["right", "right", "inherit"]}
                            justifyContent={["space-between", "space-between", "inherit"]}
                            display={["flex", "flex", "revert"]}
                            _before={{
                              display: "flex",
                              alignItems: "center",
                              textAlign: "left",
                              color: "gray.400",
                              content: `attr(data-label)`,
                            }}
                            data-label={!isWideVersion ? "Usuário:" : ""}
                          >
                            <Box>
                              <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                                <Text></Text>
                              </Link>
                              <Text fontWeight="bold">{user.name}</Text>
                              <Text fontSize="sm" color="gray.300">
                                {user.email}
                              </Text>
                            </Box>
                          </Td>
                          <Td
                            px={["0", "0", "6"]}
                            textAlign={["right", "right", "inherit"]}
                            justifyContent={["space-between", "space-between", "inherit"]}
                            display={["flex", "flex", "revert"]}
                            _before={{
                              display: "flex",
                              alignItems: "center",
                              textAlign: "left",
                              color: "gray.400",
                              content: `attr(data-label)`,
                            }}
                            data-label={!isWideVersion ? "Data de Cadastro:" : ""}
                          >
                            {user.createdAt}
                          </Td>
                          <Td
                            px={["0", "0", "6"]}
                            textAlign={["right", "right", "inherit"]}
                            justifyContent={["space-between", "space-between", "inherit"]}
                            display={["flex", "flex", "revert"]}
                            _before={{
                              display: "flex",
                              alignItems: "center",
                              textAlign: "left",
                              color: "gray.400",
                              content: `attr(data-label)`,
                            }}
                            data-label={!isWideVersion ? "Ações:" : ""}
                          >
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              colorScheme="purple"
                              leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                              _hover={{
                                cursor: "pointer",
                              }}
                            >
                              Editar
                            </Button>
                          </Td>
                        </Tr>
                      )
                    })}

                  </Tbody>
                </Table>

                <Pagination
                  totalCountOfRegisters={data.totalCount}
                  currentPage={page}
                  onPageChange={setPage}
                />
              </>
            )
          }

        </Box>
      </Flex>
    </Box>
  );
}