import { Button, Box, Image, Text, Stack } from "@chakra-ui/react"
import { useContext } from "react"
import { BlockchainContext } from "../context/BlockchainContext"

const Bike = ({ bike }) => {
    const {checkOut, checkIn} = useContext(BlockchainContext)
    return (
        <Box boxSize='lg' mx={2}>
            <Image src={bike} mb={10} />
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <Stack spacing={0} direction={'row'} align={'center'} justify={'center'} mt={5}>
                <Button
                    onClick={checkOut}
                    m={2}
                    fontSize={'sm'}
                    fontWeight={600}
                    bg={'teal.500'}
                    color={'white'}
                    _hover={{
                        bg: 'teal.300',
                    }}>
                    Check Out
                </Button>
                <Button
                    onClick={checkIn}
                    m={2}
                    fontSize={'sm'}
                    fontWeight={600}
                    color={'white'}
                    bg={'teal.500'}
                    _hover={{
                        bg: 'teal.300',
                    }}>
                    Check In
                </Button>
            </Stack>
        </Box>
    )
}

export default Bike