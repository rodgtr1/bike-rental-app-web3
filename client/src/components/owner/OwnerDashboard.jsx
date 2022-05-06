import {
    Box,
    chakra,
    Flex,
    SimpleGrid,
    Stack,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode, useContext } from 'react';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { BlockchainContext } from '../../context/BlockchainContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WithdrawForm from './withdrawForm';

function StatsCard(props) {
    const { title, stat, icon, bgColor } = props;
    return (
        <Stat
            px={{ base: 2, md: 4 }}
            py={'5'}
            shadow={'xl'}
            border={'1px solid'}
            borderColor={useColorModeValue('gray.800', 'gray.500')}
            rounded={'lg'}
            backgroundColor={bgColor}>
            <Flex justifyContent={'space-between'}>
                <Box pl={{ base: 2, md: 4 }}>
                    <StatLabel fontWeight={'medium'} isTruncated>
                        {title}
                    </StatLabel>
                    <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                        {stat}
                    </StatNumber>
                </Box>
                <Box
                    my={'auto'}
                    color={useColorModeValue('gray.800', 'gray.200')}
                    alignContent={'center'}>
                    {icon}
                </Box>
            </Flex>
        </Stat>
    );
}

export default function OwnerDashboard() {
    const { ownerBalance, balance, owner } = useContext(BlockchainContext);
    return (
        owner ? (
            <>
                <Box maxW="lg" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
                    <chakra.h1
                        textAlign={'center'}
                        fontSize={'4xl'}
                        py={10}
                        fontWeight={'bold'}>
                        Here's your balance:
                    </chakra.h1>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
                        <StatsCard
                            title={'Owner Balance'}
                            stat={ownerBalance}
                            icon={<MdOutlineAccountBalanceWallet size={'3em'} />}
                        />
                        <StatsCard
                            title={'Contract Balance'}
                            stat={balance}
                            icon={<MdOutlineAccountBalanceWallet size={'3em'} />}
                        />
                    </SimpleGrid>
                    <WithdrawForm />
                </Box>
                <ToastContainer autoClose={3000} />
            </>)
            : (
                <>
                    <Box maxW="lg" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
                        <chakra.h1
                            textAlign={'center'}
                            fontSize={'4xl'}
                            py={10}
                            fontWeight={'bold'}>
                            Access Denied
                        </chakra.h1>
                    </Box>
                    <ToastContainer autoClose={3000} />
                </>
            )
    );
}