var axios = require("axios").default;

var options = {
    method: 'GET',
    url: 'https://mboum-finance.p.rapidapi.com/ne/news',
    headers: {
      'x-rapidapi-host': 'mboum-finance.p.rapidapi.com',
      'x-rapidapi-key': '3851ad1cfdmsh3a9c0327108a78ap17b24ejsn8d6ba14f1940'
    }
  };



exports.getAllNews = async code => 
{

    let data
    
    await axios.request(options)
    .then( response => 
    {
        console.log("test")
        data = response
        
    }).catch(error => 
    {
        console.error(error)
    })

    return data

}
