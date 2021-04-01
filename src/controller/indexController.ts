import { Request, response, Response } from  'express';
import { Agent } from 'http';

class IndexController {

    public processPayment (req:Request, _res: Response){

        const token = req.body.token;
        const amount = req.body.amount;
        const capital = 100

        var code: Number = 0;
        var msg: String = "Error generico"

        //////////////////////////////////////////////////////////////////// 
         
        const request = require('request'); 
        var api = "http://localhost:3000/api/verify"; 
        var deviceInstance = {
           "token": token,
      }
        
       interface verify {
       verify: boolean;
       }
           
       request({
       url: api,
       method: "POST",
       headers: {"Accept": "application/json"},
       json: true,
       body: deviceInstance
       }, (err:Error, res: Response, body: verify) => {

           if (err) {
               return console.error('upload failed:', err);
           }

           if (res.statusCode !== 200){
               console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
               res.send('Error');
               return false;
           }

           if (body.verify) {
                if (amount <= capital){
                    code = 22;
                    msg = "Se genero el cobro del cheque";
                }else{
                    code = 43;
                    msg = "Saldo insuficiente";
                }
           }else{
               code = 53;
               msg = "Token invalido";
           }

           _res.writeHead(200, {"Content-Type": "application/json"});
           var json = JSON.stringify({
               value: true,
               msg: msg,
               code: code,
           });
           _res.end(json);
       });

    }

    

    public verifyCheck (req:Request, _res: Response){
        
        const token = req.body.token;
        const serial = req.body.serial;
        const serial_db = "120343"

        var code: Number = 0;
        var msg: String = "Error generico"

        ////////////////////////////////////////////////////////////////////
         
         const request = require('request'); 
         var api = "http://localhost:3000/api/verify"; 
         var deviceInstance = {
            "token": token,
       }
         
        interface verify {
        verify: boolean;
        }
            
        request({
        url: api,
        method: "POST",
        headers: {"Accept": "application/json"},
        json: true,
        body: deviceInstance
        }, (err:Error, res: Response, body: verify) => {

            if (err) {
                return console.error('upload failed:', err);
            }

            if (res.statusCode !== 200){
                console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
                res.send('Error');
                return false;
            }

            if (body.verify) {
                if (serial == serial_db){
                    code = 20;
                    msg = "Se verifico el cheque";
                }else {
                    code = 41;
                    msg = "Serial invalido";
                }
            }else{
                code = 53;
                msg = "Token invalido";
            }

            _res.writeHead(200, {"Content-Type": "application/json"});
            var json = JSON.stringify({
                value: true,
                msg: msg,
                code: code,
            });
            _res.end(json);
        });

    }

    /*public verifyToken(token: String = "NONE"):Boolean{
        const request = require('request'); 
         var api = "http://localhost:3000/api/verify"; 
         var deviceInstance = {
            "token": token,
       }
         
        interface verify {
        verify: boolean;
        }
            
        request({
        url: api,
        method: "POST",
        headers: {"Accept": "application/json"},
        json: true,
        body: deviceInstance
        }, (err:Error, res: Response, body: verify) => {

            if (err) {
                //return console.error('upload failed:', err);
                return false;
            }

            if (res.statusCode !== 200){
                console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
                res.send('Error');
                return false;
            }

            if (body.verify) {
                return true;
            }else{
                return false;
            }
        });

        return false;
    }*/
}

export const indexController = new IndexController();