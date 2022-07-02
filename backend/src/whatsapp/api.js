const axios = require('axios')
axios({
  method: 'post',
  url: 'https://graph.facebook.com/v13.0/108504781896857/messages',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer EAAFPcCEAaP4BAFPsh1rbZA6ol1Tjl1EiUdENKJCoUSjxbF8CDuCO81kz9sxivaZBCAIxhVNLaECySDJpStb0TKnZCvMdwR1Blu8Fb4weis6VNqcqSrbppZBVkZBdtp2CgriTwVZA9iVvE6Gf1WSJ3nHoJQbjumyxZBUd2OjdU8XlA9JNiYTRJsbFULkZBZAbo8L4lZAhpva6sfrv8WUovg5c7j'
  },
  data: JSON.stringify({
    "messaging_product": "whatsapp",
    "to": "919101701545",
    "type": "template",
    "template": {
      "name": "hello_world",
      "language": {
        "code": "en_US"
      }
    }
  })

})
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
