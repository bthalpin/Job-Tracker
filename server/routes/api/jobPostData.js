const router = require('express').Router();
const {scrapeData} = require('../../utils/scrapeData');

router.route('/').post(async (req,res)=>{
    try {
        const URL = req.body.URL;
        console.log(URL)
        const scrapedData = await scrapeData(URL)
        console.log(scrapedData)
        if (scrapedData.description){
            console.log(scrapedData)
            res.status(200).json(scrapedData)
            return
        }
        res.status(400).json({error:'Unable to scrape data'})
    } catch {
        res.status(500).json({error:'Unable to scrape data'})
    }

})


module.exports = router;
