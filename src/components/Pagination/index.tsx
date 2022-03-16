import { Box, Button, Stack } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

export function Pagination() {
    return (
        <Stack
            direction="row"
            mt="8"
            justify="space-between"
            align="center"
            spacing="6"
        >
            <Box>
                <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
            </Box>
            <Stack direction="row" spacing="2">
                <PaginationItem isCurrent={true} number={1} />
                <PaginationItem isCurrent={false} number={2} />
                <PaginationItem isCurrent={false} number={3} />
                <PaginationItem isCurrent={false} number={4} />
                <PaginationItem isCurrent={false} number={5} />
                <PaginationItem isCurrent={false} number={6} />
            </Stack>
        </Stack>
    )
}