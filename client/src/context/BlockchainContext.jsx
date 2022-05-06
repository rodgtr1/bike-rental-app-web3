import React, { useEffect, useState } from 'react'
import { abi, contractAddress } from '../config.json'
import { ethers } from "ethers"
import { toast } from 'react-toastify';

export const BlockchainContext = React.createContext("");

export const BlockchainProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [balance, setBalance] = useState(0)
    const [ownerBalance, setOwnerBalance] = useState();
    const [renterExists, setRenterExists] = useState()
    const [renter, setRenter] = useState()
    const [renterBalance, setRenterBalance] = useState()
    const [due, setDue] = useState()
    const [duration, setDuration] = useState()
    const [owner, setOwner] = useState(false)

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    const address = contractAddress;
    const contractAbi = abi;
    const contract = new ethers.Contract(address, contractAbi, signer);

    const connectWallet = async () => {
        try {
            if (!window.ethereum) return alert("Please install Metmask")

            const accounts = await provider.send( "eth_requestAccounts" );
            console.log(accounts[0])
            setCurrentAccount(accounts[0])
        } catch (error) {
            console.log(error)
            throw new Error("No ethereum object")
        }
    }

    const checkifWalletIsConnected = async () => {
        try {
            if (!window.ethereum) return alert("Please install Metmask")

            const accounts = await provider.send( "eth_accounts" );
            if (accounts.length) {
                setCurrentAccount(accounts[0])
            } else {
                console.log("No accounts found")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getBalance = async () => {
        try {
            if (owner) {
                const contractBalance = await contract.balanceOf();
                setBalance(ethers.utils.formatEther(contractBalance))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getOwnerBalance = async () => {
        try {
            if (owner) {
                const contractBalance = await contract.getOwnerBalance();
                setOwnerBalance(ethers.utils.formatEther(contractBalance))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const ownerWithdraw = async () => {
        try {
            const ownerBalance = await contract.withdrawOwnerBalance();
            await ownerBalance.wait()
            await getOwnerBalance()
            await getBalance()
        } catch (error) {
            console.log(error)
        }
    }

    const isOwner = async () => {
        try {
            if (currentAccount) {
                const owner = await contract.isOwner()
                setOwner(owner);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const checkRenterExists = async () => {
        try {
            if (currentAccount) {
                const renter = await contract.renterExists(currentAccount)
                setRenterExists(renter);
                if (renter) {
                    await getRenter();
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getRenter = async () => {
        try {
            if (currentAccount) {
                const renter = await contract.getRenter(currentAccount)
                setRenter(renter)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const addRenter = async (walletAddress, firstName, lastName, canRent, active, balance, due, start, end) => {
        try {
            const addRenter = await contract.addRenter(walletAddress, firstName, lastName, canRent, active, balance, due, start, end)
            await addRenter.wait()
            console.log(`${firstName} added!`)
            checkRenterExists()
        } catch (error) {
            console.log(error)
        }
    }

    const getRenterBalance = async() => {
        try {
            if (currentAccount) {
                const balance = await contract.balanceOfRenter(currentAccount)
                setRenterBalance(ethers.utils.formatEther(balance))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deposit = async(value) => {
        try {
            const bnbValue = ethers.utils.parseEther(value);
            const deposit = await contract.deposit(currentAccount, {value: bnbValue})
            await deposit.wait()
            await getRenterBalance();
        } catch (error) {
            console.log(error)
        }
    }

    const getDue = async() => {
        try {
            if (currentAccount) {
                const due = await contract.getDue(currentAccount)
                setDue(ethers.utils.formatEther(due));
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getTotalDuration = async() => {
        try {
            if (currentAccount) {
                const totalDuration = await contract.getTotalDuration(currentAccount)
                setDuration(Number(totalDuration))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const makePayment = async(value) => {
        try {
            const bnbValue = ethers.utils.parseEther(value);
            const deposit = await contract.makePayment(currentAccount, bnbValue)
            await deposit.wait()
            await getRenter()
            await getRenterBalance()
            await getTotalDuration()
            await getDue();
        } catch (error) {
            toast.error(error.data.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    const checkOut = async() => {
        try {
            const checkOut = await contract.checkOut(currentAccount)
            await checkOut.wait()
            await getRenter()
        } catch (error) {
            toast.error(error.data.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    const checkIn = async() => {
        try {
            const checkIn = await contract.checkIn(currentAccount)
            await checkIn.wait()
            await getRenter()
            await getDue()
            await getTotalDuration()
        } catch (error) {
            toast.error(error.data.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }



    useEffect(() => {
        checkifWalletIsConnected()
        checkRenterExists()
        getRenterBalance()
        getDue();
        getTotalDuration();
        getOwnerBalance();
        isOwner();
        getBalance();
    }, [currentAccount, owner])



    return (
        <BlockchainContext.Provider
            value={{
                connectWallet,
                currentAccount,
                renterExists,
                addRenter,
                renterBalance,
                deposit,
                due,
                duration,
                renter,
                makePayment,
                checkOut,
                checkIn,
                ownerBalance,
                ownerWithdraw,
                balance,
                owner
            }}>
                { children }
        </BlockchainContext.Provider>
    )
}