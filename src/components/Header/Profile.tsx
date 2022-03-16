import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
interface ProfileProps {
    showProfileData?: boolean;
}

export default function Profile({ showProfileData }: ProfileProps) {
    return (
        <Flex
            align="center"
        >
            {
                showProfileData && (
                    <Box mr="4" textAlign="right">
                        <Text>
                            Fernando Silva
                        </Text>
                        <Text
                            color="gray.300"
                            fontSize="small"
                        >
                            fernandosilva.smsrio@gmail.com
                        </Text>
                    </Box>
                )
            }

            <Avatar
                size="md"
                name="Fernando Silva"
                src="https://github.com/yarnando.png"
            />

        </Flex>
    )
}