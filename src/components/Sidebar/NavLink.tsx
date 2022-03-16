import { Icon, Text, Link, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { ElementType } from "react";

interface NavLinkProps extends ChakraLinkProps {
    icon: ElementType;
    children: string;
}

export function NavLink({ icon, children, ...rest }: NavLinkProps) {
    return (
        <Link display="flex" {...rest}>
            <Icon as={icon} fontSize="20" />
            <Text ml="4" fontWeight="medium">
                {children}
            </Text>
        </Link>
    )
}