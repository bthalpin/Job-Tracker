const fetch = require('node-fetch')
const cheerio = require('cheerio')
const fs = require('fs')
const { link } = require('fs/promises')

const getRawData = (URL) => {
    return fetch(URL)
        .then(response => response.text())
        .then(data =>  {
            // console.log(data,'RAW!!!!')
            return data})
}

// const URL = 'https://www.linkedin.com/jobs/view/3082555808/?refId=6ba1d2b5-ca14-4b3a-a692-def796e075ee'

module.exports = {

    scrapeData : async function(URL){
        const rawData = await getRawData(URL)
        const parsedData = await cheerio.load(rawData)
        // console.log(parsedData)
        const info = (parsedData('li'))
        // console.log(info)

        // const indeedTitle = parsedData('.jobsearch-JobInfoHeader-title')
        // console.log(indeedTitle[0].children[0].data,'aaaa')
        let linkedInTitle = parsedData('h1')
        // console.log(linkedInTitle)
        if (linkedInTitle.length){
            // console.log(linkedInTitle[0].children,'inside')
            linkedInTitle = linkedInTitle[0].children[0].data
        } else {
            linkedInTitle = ''
        }
        // if (indeedTitle.length){
            // console.log(linkedInTitle[0].children,'inside')
            // indeedTitle = indeedTitle[0].children[0].data
        // } else {
            // indeedTitle = ''
        // }
        // console.log(indeedTitle,linkedInTitle[0].children[0].data,'TITLE') 
        // const description = info[0].map(child => {
        //     if (!child.children){
        //         return
        //     }
        //     return child.children.data
        // })
        let description =[]
        for (let i=0;i<info.length;i++){
            if (info[i].children){
                if(info[i].children[0].children){
                    if(info[i].children[0].children[0].data.replace(/\n/g,'').replace(/ /g,'').length){
                        // console.log(info[i].children[0].children[0].data.replace(/\n/g,'').replace(' ','').length)
                        // console.log(description)
                        description.push(info[i].children[0].children[0].data.replace(/\n/g,''))
                    }
                }
                else if (info[i].children){
                    if(info[i].children[0].data.replace(/\n/g,'').replace(/ /g,'').length){
                        // console.log(info[i].children[0].data.replace(/\n/g,'').replace(/ /g,'').length,'1')
    
                    description.push(info[i].children[0].data)}
                }
                // description.push(info.children[i].children[0].data)
            }
        }
        // console.log(description,linkedInTitle,indeedTitle)
        let jobData = {title:'',description:description}
        if (linkedInTitle.length){
            jobData.title = linkedInTitle
        }
        // if (indeedTitle.length){
        //     jobData.title = indeedTitle
        // }
        // console.log(description,'test')
        // console.log(jobData,'JOBDATA')
        return jobData;
        // console.log(info[0].children[0].children[0])
        // console.log(info.children[6].children,info.children.length)
    }
} 




// .jobsearch-JobInfoHeader-title
// .jobsearch-JobInfoHeader-companyName