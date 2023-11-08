import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import { custodialFactory } from './address';
import { factoryAbi } from './factoryAbi';
import { useAccount } from 'wagmi';
import { toast } from 'react-toastify';

function App() {
  const { address, connector, isConnected } = useAccount()
  const [creatingWallet, setCreatingWallet] = useState(false)
  const [transferState, setTransferState] = useState(false)
  const [viewTab, setViewTab] = useState(false)
  const [wallet, setWallet] = useState(null)
  const [childContract, setChildContract] = useState(null)
  const [amountVal, setAmountVal] = useState();
  const [benefactor, setBenefactor] = useState("");

  const provider = new ethers.getDefaultProvider("https://ethereum-sepolia.publicnode.com")
  const Contract = new ethers.Contract(custodialFactory, factoryAbi, provider);

  async function createWallet() {
    const providerWrite = new ethers.BrowserProvider(window.ethereum);
    const signer = await providerWrite.getSigner();

    console.log(providerWrite)
    try {
      setCreatingWallet(true);
      const FactoryContract = new ethers.Contract(
        custodialFactory,
        factoryAbi,
        signer
      );

      const tx = await FactoryContract.deployWallet(36254);
      await tx.wait();
      console.log(tx)
      setCreatingWallet(false);
      toast.success("Smart Wallet Created successful")
      readAccountDetails()

    } catch (error) {
      console.log(error);
      setCreatingWallet(false);
    }
  }

  const readAccountDetails = async () => {
    const tx = await Contract.hasAnAccountAndReturn("0x1b6e16403b06a51C42Ba339E356a64fE67348e92");
    console.log(tx)
    setChildContract(tx)
  }

  useEffect(() => {
    try {
      readAccountDetails();

    } catch (error) {
      console.log(error)
      setChildContract(null)
    }
  }, [childContract])


  async function transferFund() {
    try {
      setTransferState(true);
    } catch (error) {
      console.log(error);
      setTransferState(false);
    }
  }

  return (
    <div className='h-screen'>
      {/* Top Nav */}
      <div className="navbar bg-blue-400 w-full">
        <div className="flex-1">
          <span className="btn btn-ghost normal-case text-2xl text-white">CustodyWallet</span>
        </div>
        <div className="flex-none gap-2">
          <ConnectButton />
          {(isConnected && childContract) === null &&
            <div className="form-control">
              <button disabled={creatingWallet} onClick={() => createWallet()} className={`${creatingWallet && "hover:cursor-not-allowed text-white"} btn btn-md w-24 md:w-auto text-white`}>
                {creatingWallet &&
                  <span className="loading loading-spinner loading-sm text-white"></span>
                }
                <span>{creatingWallet ? "Processing" : "Create Wallet"}</span>
              </button>
            </div>
          }
          {(childContract) !== null &&
            <div className='flex gap-4'>
              <button className="btn">
                Balance:
                <div className="badge">{0}ETH</div>
              </button>
              <button className="bg-black btn hover:cursor-default hover:bg-black">{childContract}</button>
            </div>
          }
        </div>
      </div>

      {childContract == null &&
        <div className='mt-6 w-fit mx-auto'>
          <div className="tabs tabs-boxed">
            <span onClick={() => setViewTab(false)} className={`tab ${!viewTab && "tab-active"}`}>Transfer</span>
          </div>
        </div>
      }

      {childContract == null &&
        <span className='w-full block text-center mt-3 text-2xl font-bold'>Please connect your wallet and create account</span>
      }

      {childContract !== null &&
        <div className='mt-10 w-full md:max-w-xl mx-auto'>
          <div className="flex gap-3 flex-col justify-center w-full mx-auto md:gap-10">
            <div className="w-full">
              <label htmlFor="" className="font-normal text-[17px] leading-5 tracking-[0.5%] ">Amount to transfer</label>
              <div className="flex items-center border-[1px] border-[#696969] rounded-lg pl-[10px] gap-4 h-[72px] mt-2">
                <p className="font-normal head2 text-[16px] leading-[32px] ">ETH</p>
                <input value={amountVal} onChange={(e) => setAmountVal(e.target.value)} type="text" placeholder="0.00" className="bg-white text-[36px] leading-[53.2px] text-[#696969] h-[100%] w-fit outline-none rounded-r-lg" />
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="" className="font-normal text-[17px] leading-5 tracking-[0.5%] ">Beneficiary (ETH Wallet)</label>
              <div className="flex items-center border-[1px] border-[#696969] rounded-lg pl-[10px] w-full gap-4 h-[72px] mt-2">
                <input type="text" value={benefactor} onChange={(e) => setBenefactor(e.target.value)} placeholder="0xD6.....aEa" className="bg-white w-full text-[20px] leading-[53.2px] text-[#696969] h-[100%] outline-none  rounded-r-lg font-bold" />
              </div>
            </div>
          </div>
          {/* button */}
          <div className="flex justify-center mt-4">
            <button disabled={transferState} onClick={() => transferFund()} className={`${transferState && "hover:cursor-not-allowed text-white"} btn btn-md w-24 md:w-auto text-white`}>
              {transferState &&
                <span className="loading loading-spinner loading-sm text-white"></span>
              }
              <span>{transferState ? "Processing" : "Transfer"}</span>
            </button>
          </div>
        </div>
      }
    </div>
  )
}

export default App
