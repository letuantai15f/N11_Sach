// import * as express from 'express'
// import * as helmet from 'helmet'
// import * as logger from 'morgan'
import express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import httpProxy from 'express-http-proxy';
import {resolve} from 'path'
import {readFileSync} from 'fs'
import  {load} from 'js-yaml';
import { config } from 'nodemon';

// const express = require('express');
const app = express();

const pathFile = resolve(process.cwd(),'config.yml')
console.log('pathFile: ',pathFile);
const readConfig =readFileSync(pathFile,{encoding:'utf8'})
console.log('readConfig: ',readConfig);
const  {services}  = load(readConfig,{json:true})
console.log('services: ',services);



app.use(logger('dev'))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/',(req,res)=>{
    return res.json({message:'Running aplication'})
})
console.log('services: ',services);


// services.forEach(({name,url}) => {
//     app.use('/${name}',httpProxy(url,{timeout:3000}))
// });

// services.forEach(({name,url}) => {
//     app.use('/${name}',httpProxy(url,{timeout:3000}))
    
// });
app.use('/books',httpProxy('http://localhost:3002',{timeout:3000}))
app.use('/user',httpProxy('http://localhost:3001',{timeout:3000}))




app.listen(3000, () => console.log('Applicate rodendo'))
