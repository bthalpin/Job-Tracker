const fetch = require('node-fetch')
const cheerio = require('cheerio')
const fs = require('fs')

const getRawData = (URL) => {
    return fetch(URL)
        .then(response => response.text())
        .then(data =>  data)
}

// const URL = 'https://www.linkedin.com/jobs/view/3082555808/?refId=6ba1d2b5-ca14-4b3a-a692-def796e075ee'

export const scrapeData = async () => {
    const rawData = await getRawData(URL)
    const parsedData = cheerio.load(rawData)
    const info = (parsedData('li'))
    // const allData = info[0].map(child => {
    //     if (!child.children){
    //         return
    //     }
    //     return child.children.data
    // })
    let allData =[]
    for (let i=0;i<info.length;i++){
        if (info[i].children){
            if(info[i].children[0].children){
                if(info[i].children[0].children[0].data.replace(/\n/g,'').replace(/ /g,'').length){
                    console.log(info[i].children[0].children[0].data.replace(/\n/g,'').replace(' ','').length)
                    allData.push(info[i].children[0].children[0].data.replace(/\n/g,''))
                }
            }
            else {
                if(info[i].children[0].data.replace(/\n/g,'').replace(/ /g,'').length){
                    console.log(info[i].children[0].data.replace(/\n/g,'').replace(/ /g,'').length,'1')

                allData.push(info[i].children[0].data)}
            }
            // allData.push(info.children[i].children[0].data)
        }
    }
    console.log(allData,'test')
    // console.log(info[0].children[0].children[0])
    // console.log(info.children[6].children,info.children.length)
}