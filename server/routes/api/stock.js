const router = require('express').Router();

router.get('/stock/:ticker', (req, res, next)=>{

  res.send('to get a quote')

});

router.post('/stock/buyorder', (req, res, next)=>{
  //takes {symbol, qty, currentPrice, total}
  res.send('to get a quote')
});

router.post('/stock/sellorder', (req, res, next)=>{
  //takes {symbol, qty, currentPrice, total}
  res.send('to get a quote')
});


module.exports = router;