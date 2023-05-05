import { Flex } from "@chakra-ui/react";
import UsersList from "./UsersList";
import { BLOCKED_ROLE, WANT_ADMIN_ROLE } from "../../common/constants";

const AdminPanel = () => {
    return (
        <Flex w='container' p={4} justify={'center'}>
            <UsersList roleType={WANT_ADMIN_ROLE} />
            <UsersList roleType={BLOCKED_ROLE} />
        </Flex>
    );
};

export default AdminPanel;
