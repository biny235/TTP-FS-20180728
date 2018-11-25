const router = require('express').Router();
const axios = require('axios')
const { auth } = require('../auth')

router.get('/quote/:ticker', (req, res, next)=>{
  const { ticker } = req.params
  axios.get(`https://api.iextrading.com/1.0/stock/${ticker}/quote`)
    .then(res => {
      if(res.status !== 200) throw {status: 404, message: 'Stock not found'}
      return res.data
    })
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


module.exports = router;