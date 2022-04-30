import CurrentTotals from "./CurrentTotals"
import { Stack, Box, Flex, Center } from "@chakra-ui/react"
import Bike from "./Bike"
import Bike1 from '../assets/bike1.jpeg'
import Bike2 from '../assets/bike2.jpeg'
import Bike3 from '../assets/bike3.jpeg'
import RenterForm from "./RenterForm"
import { useContext, useState } from "react"
import { BlockchainContext } from "../context/BlockchainContext"
import ClipLoader from "react-spinners/ClipLoader";

const Dashboard = () => {
    const { renterExists } = useContext(BlockchainContext)
    let [loading, setLoading] = useState(true);

    return (
        <Stack
            as={Box}
            textAlign={'center'}
            spacing={{ base: 8, md: 14 }}
            py={{ base: 20, md: 36}}>
        { renterExists == null ? <Center><ClipLoader loading={loading} size={75} /></Center> : renterExists ? <CurrentTotals /> : <RenterForm /> }
        <Flex justifyContent={'center'} alignItems={'center'}>
            <Bike bike={Bike1}/>
            <Bike bike={Bike2}/>
            <Bike bike={Bike3}/>
        </Flex>
        </Stack>
    )
}

export default Dashboard