const axios = require("axios");
require("dotenv").config();
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY;
const API_ENDPOINT_AUDIT_AI = process.env.API_ENDPOINT_AUDIT_AI;
const API_COINGECKO = process.env.API_COINGECKO;
const API_KEY_COINGECKO = process.env.API_KEY_COINGECKO;
const API_OPENAPI_DEXVIEW = process.env.API_OPENAPI_DEXVIEW;
const API_GO_PLUS = process.env.API_GO_PLUS;


exports.getTokenAuditorMeta = async (req, res) => {
  try {
    const reqId = req.params.id; // Access the id parameter from req.params

    const data = await getContractMetaData(reqId);

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Error fetching data" });
  }
};

const getContractMetaData = async (contractAddress) => {
  try {

    const etherScanResult = await axios.get(
      `https://api.etherscan.io/api?module=token&action=tokeninfo&address=${contractAddress}&apikey=${ETHERSCAN_API_KEY}`
    );



    if (etherScanResult.data.status === "1") {
      res.status(200).json(etherScanResult.data.result);
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Error fetching data" });
  }
};


exports.getTokenAuditorSecurity = async (req, res) => {
  try {
    const reqId = req.params.id; // Access the id parameter from req.params

    const params = {
      contract_addresses: reqId,
    };

    const response = await axios.get(API_GO_PLUS, { params });

    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    const data = response?.data?.result; // Access data directly from response
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Error fetching data" });
  }
}

exports.getTokenLiveData = async (req, res) => {
  try {
    const tokenAddress = req.params.id; // Access the id parameter from req.params

    const data = await fetchData(tokenAddress);

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Error fetching data" });
  }
}







const getTokenAuditorSecurityByContract = async ({ contract_addresses }) => {
  try {

    const params = {
      contract_addresses
    };

    const response = await axios.get(API_GO_PLUS, { params });

    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    const data = response?.data?.result; // Access data directly from response
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

exports.getContractScore = async (req, res) => {
  const contractAddress = req.params.id; // Access the id parameter from req.params

  try {
    const getSingleContractScore = await getDexToolsDataByContactAddress("score", contractAddress, "AllDataContract");
    res.status(200).json(getSingleContractScore);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Error fetching data" });

  }

}



const getDexToolsDataByContactAddress = async (type, contract_address, sendAllData) => {


  try {

    const response = await axios.get(`https://public-api.dextools.io/trial/v2/token/ether/${contract_address}/${type}`, { headers: { 'x-api-key': "MsgpO02PE030S8iYrATWe1Fz7wdG4JOI3gKPx5zM" } });
    const selectedData = response?.data?.data ? response?.data?.data : null;
    if (sendAllData === "AllDataContract") {
      return selectedData;
    }
    else {
      return selectedData?.mcap ? selectedData : null;
    }

  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }




  // if (response.status === 200) {

  //   if (sendAllData === "AllDataContract") {

  //   }
  //   else {
  //     const selectedData = response?.data?.data?.mcap ? response.data.data : null;
  //     return selectedData;
  //   }
  // } else {
  //   return null;
  //   // throw new Error("Failed to fetch contractData");
  // }
}


exports.getAllDataContract = async (req, res) => {
  try {
    const contractAddress = req.params.id; // Access the id parameter from req.params


    const getSingleContractInfo = await getDexToolsDataByContactAddress("info", contractAddress, "AllDataContract");


    const getSingleContractScore = await getDexToolsDataByContactAddress("score", contractAddress, "AllDataContract");


    const getSingleContractPrice = await getDexToolsDataByContactAddress("price", contractAddress, "AllDataContract");
    const getSingleContractLocks = await getDexToolsDataByContactAddress("locks", contractAddress, "AllDataContract");
    const getSingleContractS = await getDexToolsDataByContactAddress("", contractAddress, "AllDataContract");
    // const getSingleContractSecurity = 
    const getSingleContractSecurityData = await getTokenAuditorSecurityByContract({ contract_addresses: contractAddress });
    // const getSingleContractMetaData = await getContractMetaData(contractAddress);






    // const getSingleContractChart = await getDexToolsDataByContactAddress("chart", contractAddress);

    // const getSingleContractHolders = await getDexToolsDataByContactAddress("holders", contractAddress);
    // const getSingleContractTransactions = await getDexToolsDataByContactAddress("transactions", contractAddress);
    // const getSingleContractTrades = await getDexToolsDataByContactAddress("trades", contractAddress);

    const data = {
      info: getSingleContractInfo,
      score: getSingleContractScore,
      price: getSingleContractPrice,
      locks: getSingleContractLocks,
      security: getSingleContractSecurityData,
      socialData: getSingleContractS,
      // metaData: getSingleContractMetaData,
      // chart: getSingleContractChart,
      // holders: getSingleContractHolders,
      // transactions: getSingleContractTransactions,
      // trades: getSingleContractTrades
    };

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);

    res.status(500).json({ error: "Error fetching data" });
  }

}


exports.getGasTracker = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    const data = response.data; // Access data directly from response
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Error fetching data" });
  }
};

// CODE Auditor APIs
exports.getCodeAuditData = async (req, res) => {
  try {
    const reqId = req.params.id; // Access the id parameter from req.params

    const etherScanResult = await axios.get(
      `https://api.etherscan.io/api?module=contract&action=getabi&address=${reqId}&apikey=${ETHERSCAN_API_KEY}`
    );

    if (
      etherScanResult.data.status === "1" &&
      etherScanResult.data.message === "OK"
    ) {

      res
        .status(200)
        .json(
          etherScanResult?.data?.result
            ? etherScanResult?.data?.result
            : ""
        );

    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Error fetching data" });
  }
}

exports.getCodeAuditDataUsingCode = async (req, res) => {
  try {
    {

      const codeContent = req.body.codeContent;

      // Define the request body
      const requestBody = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: codeContent
          },
          {
            role: "assistant",
            content: "Please analyze the vulnerabilities in this specific contract code."
          }
        ],
        temperature: 0.7
      };

      // Define the request headers
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPEN_AI_API_KEY}` // Replace with your actual API key
      };

      // Make the API request
      const auditReport = await axios.post(API_ENDPOINT_AUDIT_AI, requestBody, { headers });

      // Return the audit report in the response
      res.status(200).json(auditReport?.data?.choices[0]?.message?.content ? auditReport.data.choices[0].message.content : "No audit report found");
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Error fetching data" });
  }
}


// exports.getNewData = async (req, res) => {


//   try {
//     // Function to fetch Ethereum-based tokens from CoinGecko
//     const fetchEthereumTokens = async () => {
//       const url = "https://api.coingecko.com/api/v3/coins/markets";
//       const params = new URLSearchParams({
//         vs_currency: "usd",
//         order: "market_cap_desc",
//         per_page: 50,
//         page: 1,
//         platforms: "ethereum"  // Filter by Ethereum platform
//       });
//       const response = await fetch(`${url}?${params}`);
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error("Failed to fetch Ethereum tokens from CoinGecko");
//       }
//     };

//     // Function to fetch token data from Etherscan
const fetchTokenDataFromEtherscan = async (tokenAddress) => {
  try {

    const etherScanResult = await axios.get(
      `https://api.etherscan.io/api?module=contract&action=getabi&address=${tokenAddress}&apikey=${ETHERSCAN_API_KEY}`
    );


    return etherScanResult?.data?.result ? etherScanResult?.data?.result : ""

  }

  catch (error) {
    throw new Error("Failed to fetch data");


  }
};

// // Fetch Ethereum tokens
// const ethereumTokens = await fetchEthereumTokens();
// if (!ethereumTokens) {
//   throw new Error("Failed to fetch Ethereum tokens");
// }

// // Process tokens
// const processedTokens = [];
// for (const token of ethereumTokens) {
//   const tokenAddress = token.contract_address;
//   const tokenDataEtherscan = await fetchTokenDataFromEtherscan(tokenAddress);
//   if (tokenDataEtherscan) {
//     processedTokens.push({
//       name: token.name,
//       symbol: token.symbol,
//       marketCap: token.market_cap,
//       price: token.current_price,
//       etherscanData: tokenDataEtherscan
//     });
//   }
// }

// // Send response with processed token data
// res.json(processedTokens);

//   } catch (error) {
//   console.error("Error:", error.message);
//   res.status(500).json({ error: "An error occurred while processing the request" });
// }

// }




const fetchData = async (contractAddress) => {
  try {
    let liveContractData;
    if (contractAddress) {
      const contractResponse = await axios.get(`${API_OPENAPI_DEXVIEW}/tokens/${contractAddress}`);
      liveContractData = contractResponse?.data?.pairs[0];

    }
    return liveContractData;


  } catch (error) {
    liveContractData = null;
    return liveContractData

  }

}


// exports.getTokenData = async (req, res) => {
//   let contractData;
//   try {

//     const {time, id} = req.params; // Destructure time and id from req.params

//     // const id = req.body.id;
//     // const time = req.body.time;

//     const timeFrame = { 1: "1h", 4: "4h", 6: "6h", 12: "12h", 24: "24h" }[req.params.time] || "1h";

//     const fetchEthereumTokens = async () => {
//       const params = {
//         vs_currency: "usd",
//         order: "market_cap_desc",
//         per_page: 50,
//         page: 1,
//         platforms: "ethereum",
//         sparkline: id ? false : true,
//         price_change_percentage: timeFrame ? timeFrame : "1h"
//       };

//       if (id) {
//         params.ids = id;
//         contractData = await fetchData(id);
//       };

//       const response = await axios.get(`${API_COINGECKO}/coins/markets`, { params, headers: { 'x-cg-demo-api-key': API_KEY_COINGECKO } });
//       if (response.status === 200) {
//         return response.data;
//       } else {
//         throw new Error("Failed to fetch Ethereum tokens from CoinGecko");
//       }
//     };

//     // Fetch Ethereum tokens
//     const ethereumTokens = await fetchEthereumTokens();
//     // console.log("ethereumTokens", ethereumTokens);
//     if (!ethereumTokens) {
//       throw new Error("Failed to fetch Ethereum tokens");
//     }

//     res.json({ ethereumTokens, contractData: contractData || null });

//   } catch (error) {
//     console.error("Error:", error.message);
//     res.status(500).json({ error: "An error occurred while processing the request" });
//   }
// }


exports.getTokenData = async (req, res) => {
  try {

    const fetchEthereumTokens = async () => {

      const response = await axios.get(`https://public-api.dextools.io/trial/v2/ranking/ether/gainers`, { headers: { 'x-api-key': "MsgpO02PE030S8iYrATWe1Fz7wdG4JOI3gKPx5zM" } });
      if (response.status === 200) {

        const selectedData = response?.data?.data;

        return selectedData;
      } else {
        throw new Error("Failed to fetch Ethereum tokens from dextools");
      }
    }

    // Fetch Ethereum tokens
    const ethereumTokens = await fetchEthereumTokens();
    let filteredEtherTokens;
    filteredEtherTokens = ethereumTokens?.slice(0, 15);
    if (!ethereumTokens) {
      throw new Error("Failed to fetch Ethereum tokens");
    }
    for (const token of filteredEtherTokens) {
      const tokenAddress = token?.mainToken?.address;
      const tokenDataEtherscan = await fetchData(tokenAddress);

      const getSingleContractInfo = await getDexToolsDataByContactAddress("info", tokenAddress);
      if (tokenDataEtherscan) {
        token.liveContractData = tokenDataEtherscan;
        token.infoData = getSingleContractInfo;
      }
    }
    filteredEtherTokens = ethereumTokens.filter(token => token.infoData);
    console.log("filteredEtherTokens", filteredEtherTokens)

    res.json({ ethereumTokens: filteredEtherTokens?.slice(0, 5) });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
}

