const axios = require('axios')

const getCoinList = async code => {

  let endpoint = `https://api.coingecko.com/api/v3/coins/${code}?localization=fr&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`

  const response = await axios.get(endpoint)

  return response.data
}

const getCoinsMarkets = async (id, date) =>  {

  let endpoint = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${args.vs_currency}`
  
  const response = await axios.get(endpoint)
  const responseData = await response.json()

  return responseData
}

const getCoinByDate = async (id, date) => {
      
  let endpoint = `https://api.coingecko.com/api/v3/coins/${id}/history?date=${date}&localization=false`
  
  const response = await axios.get(endpoint)
  const responseData = await response.json()

  return responseData
}

module.exports = {
  getCoinList,
  getCoinsMarkets,
  getCoinByDate
}