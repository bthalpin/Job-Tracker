const router = require('express').Router();
const {scrapeData} = require('../../utils/scrapeData');

router.route('/').post(async (req,res)=>{

    const URL = req.body.URL;
    console.log(URL)
    const scrapedData = await scrapeData(URL)
    console.log(scrapedData)
    if (scrapedData){
        res.status(200).json(scrapedData)
    }

})


module.exports = router;
