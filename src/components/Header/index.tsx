import { 
    Flex,
} from "@chakra-ui/react";

import NotificationsNav from "./NotificationsNav";
import Profile from "./Profile";
import SearchBox from "./SearchBox";
import Logo from "./Logo";

export default function Header() {
    return(
        <Flex
            as="header"
            w="100%"
            maxWidth={1480}
            h="20"
            mx="auto"
            mt="4"
            px="6"
            align="center"
        >
            <Logo />

            <SearchBox />

            <Flex
                align="center"
                marginLeft="auto"
            >
                <NotificationsNav />

                <Profile />

            </Flex>

        </Flex>
    )
}