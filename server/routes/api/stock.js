const router = require('express').Router();
const axios = require('axios')
const { auth } = require('../auth')

router.get('/quote/:ticker', (req, res, next)=>{
  const { ticker } = req.params
  axios.get(`https://api.iextrading.com/1.0/stock/${ticker}/quote`)
    .then(res => res.data)
    .then(quote => res.send(quote))
    .catch(next)
});

router.post('/buy', auth, (req, res, next)=>{

  req.user.addTransaction(Object.assign({type: 'BUY'}, req.body))
    .then(transaction => {
      if(!transaction) throw 'error'
      res.send(transaction);    
    })
    .catch(next)
});

router.post('/sellorder', (req, res, next)=>{
  //takes {symbol, qty, currentPrice, total}
  res.send('to get a quote')
});


module.exports = router;