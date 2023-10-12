import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [walletAddress, setWalletAddress] = useState<string>("");

  useEffect(() => {
    isWalletConnected();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    addWalletListener();
  });

  // Function Helpers

  // request access to Metamask or any available wallet
  async function requestAccount() {
    console.log("Attempting to connect user Metamask Wallet");

    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const userAccount = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setUserAccount(userAccount);
      } catch (err: any) {
        console.error("Error occurred : ", err.message);
      }
    } else {
      // Could not find a wallet
      console.log("Please Install Metamask");
    }
  }

  // Check if wallet is already connected
  async function isWalletConnected() {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const userAccount = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (userAccount.length > 0) {
          setUserAccount(userAccount);
        }
      } catch (err: any) {
        console.error("Error occurred : ", err.message);
      }
    }
  }

  // Listen for change or disconnect wallet event
  function addWalletListener() {
    try {
      window.ethereum.on("accountsChanged", (userAccount: any) => {
        if (userAccount.length > 0) {
          setUserAccount(userAccount);
        } else {
          setWalletAddress("");
          console.log("Wallet Disconnected!");
        }
      });
    } catch (err: any) {
      console.error("Error occurred : ", err.message);
    }
  }

  // Retrieve user account and set address
  function setUserAccount(userAccount: any) {
    let userAddress = userAccount[0];
    console.log("User wallet connected at ", userAddress);
    setWalletAddress((prev) => (prev = userAddress));
  }

  return (
    <>
      <div className=" flex justify-between items-center my-10 mx-16 ">
        <h1 className="text-4xl font-semibold">Peculium Token(PEC)</h1>
        <button
          className="bg-light-blue border border-gray-500 p-3 font-medium hover:bg-light-orange   "
          onClick={requestAccount}
        >
          {walletAddress && walletAddress.length > 0
            ? `Connected : ${walletAddress.substring(
                0,
                6
              )}... ${walletAddress.substring(38)} `
            : "Connect Wallet"}
        </button>
      </div>
    </>
  );
}

export default App;

// 1. Connect Wallet
// 2. Check if already connected
// 3. Detect when wallet is disconnected or changed
// 4. resolve errors
