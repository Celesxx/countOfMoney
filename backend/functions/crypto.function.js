const axios = require('axios')

const getCoinsList = async length => {
  const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=70&page=1&sparkline=false`);

  console.log("response = ", response.data[0])
  let cryptos = []
  for (let i = 0; i != length; i += 1) {
    cryptos.push({
      gecko: response.data[i].id,
      symbol: response.data[i].symbol,
      genesis_date: response.data[i].genesis_date,
      rank: response.data[i].market_cap_rank,
      image: response.data[i].image,
      current_price: response.data[i].current_price,
      price_change_24h: response.data[i].price_change_24h,
      market_cap: response.data[i].market_cap,
      total_volume: response.data[i].total_volume
    })
  }
  return cryptos
}

const getCoinsById = async code => {
  const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=70&page=1&sparkline=false`);

  let cryptos = []
  for (let i = 0; i != 3; i += 1) {
    cryptos.push({
      gecko: response.data[i].id,
      symbol: response.data[i].symbol,
      genesis_date: response.data[i].genesis_date,
      rank: response.data[i].market_cap_rank,
      image: response.data[i].image,
    })
  }
  return cryptos
  // return {
  //       gecko: crypto.id,
  //       symbol: crypto.symbol,
  //       genesis_date: crypto.genesis_date,
  //       rank: crypto.market_cap_rank,
  //       // market_data: {
  //       //     current_price: crypto.market_data.current_price,
  //       //     ath: crypto.market_data.ath,
  //       //     ath_change_percentage: crypto.market_data.ath_change_percentage,
  //       //     ath_date: crypto.market_data.ath_date,
  //       //     atl: crypto.market_data.atl,
  //       //     atl_change_percentage: crypto.market_data.atl_change_percentage,
  //       //     atl_date: crypto.market_data.atl_date,
  //       //     total_volume: crypto.market_data.total_volume,
  //       //     high_24h: crypto.market_data.high_24h,
  //       //     low_24h: crypto.market_data.low_24h,
  //       // },
  //       last_updated: crypto.last_updated,
  //   }
}

const getCoinsMarkets = async (id, date) => {

  let endpoint = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${args.vs_currency}`

  const response = await axios.get(endpoint)
  const responseData = await response.json()

  return responseData
}

const getCoinByDate = async (id, date) => {

  let endpoint = `https://api.coingecko.com/api/v3/coins/${id}/history?date=${date}&localization=false`
  const response = await axios.get(endpoint)

  return response.data
}

const getCoinByHistory = async (id, time, qty) => {

  let endpoint = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=eur&days=${qty}&interval=${time}`
  const response = await axios.get(endpoint)

  return response.data
}

module.exports = {
  getCoinsById,
  getCoinsMarkets,
  getCoinByDate,
  getCoinByHistory,
  getCoinsList
}