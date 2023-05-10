import { HStack, VStack, Icon, Text } from "@chakra-ui/react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

const Pagination = ({ pages, currPage, setCurrPage, setOffset }) => {

    const handlePaginate = (event) => {
        if (event < 0) {
            if (currPage === 0) return;
            setCurrPage(event < -1 ? 0 : (currPage - 1));
            setOffset((event < -1 ? 0 : (currPage - 1))*15);
            return;
        }
        if (event > 0) {
            if (currPage === pages.length - 1) return;
            setCurrPage(event > 1 ? (pages.length - 1) : (currPage + 1));
            setOffset((event > 1 ? (pages.length - 1) : (currPage + 1))*15);
            return;
        }

        setCurrPage(+event.target.innerText - 1);
        setOffset((+event.target.innerText - 1)*15);
        return;
    };

    return (
        <HStack w='100%' h='25px' justify='center' gap={0} mb={5}>
            {(pages.length > 1) &&
            <>
                <VStack
                    rounded='sm'
                    bg='brand.100'
                    transition='0.15s ease-in'
                    _hover={{ cursor: 'pointer', bg: 'brand.300', color: 'brand.600' }}
                    onClick={() => handlePaginate(-2)}>
                    <Icon as={MdKeyboardDoubleArrowLeft}></Icon>
                </VStack>
                <VStack
                    rounded='sm'
                    bg='brand.100'
                    transition='0.15s ease-in'
                    _hover={{ cursor: 'pointer', bg: 'brand.300', color: 'brand.600' }}
                    onClick={() => handlePaginate(-1)}>
                    <Icon as={MdKeyboardArrowLeft}></Icon>
                </VStack>
            </>}
            {pages && pages.map((page, index) =>
                <VStack
                    key={index}
                    rounded='sm'
                    h='100%'
                    w='25px'
                    justify='center'
                    bg={currPage === page ? 'brand.300' : 'brand.100'}
                    color={currPage === page ? 'brand.100' : 'inherit'}
                    transition='0.15s ease-in'
                    _hover={{ cursor: 'pointer', bg: 'brand.300', color: 'brand.600' }}
                    onClick={handlePaginate}>
                    <Text fontSize='0.8em'>{page+1}</Text>
                </VStack>)}
            {(pages.length > 1) &&
            <>
                <VStack
                    rounded='sm'
                    bg='brand.100'
                    transition='0.15s ease-in'
                    _hover={{ cursor: 'pointer', bg: 'brand.300', color: 'brand.600' }}
                    onClick={() => handlePaginate(1)}>
                    <Icon as={MdKeyboardArrowRight}></Icon>
                </VStack>
                <VStack
                    rounded='sm'
                    bg='brand.100'
                    transition='0.15s ease-in'
                    _hover={{ cursor: 'pointer', bg: 'brand.300', color: 'brand.600' }}
                    onClick={() => handlePaginate(2)}>
                    <Icon as={MdKeyboardDoubleArrowRight}></Icon>
                </VStack>
            </>}
        </HStack>);
};

export default Pagination;
