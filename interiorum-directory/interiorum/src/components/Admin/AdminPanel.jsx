import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import UsersList from "./UsersList";
import { BLOCKED_ROLE, WANT_ADMIN_ROLE } from "../../common/constants";
import SearchUsers from "./SearchUsers";

const AdminPanel = () => {
    return (
        <VStack w='100%' p={4} align='center'>
            <SearchUsers />
            <HStack w='80%' justify='center' align='start' gap={2}>
                <UsersList roleType={WANT_ADMIN_ROLE} />
                <UsersList roleType={BLOCKED_ROLE} />
            </HStack>
        </VStack>
    );
};

export default AdminPanel;
