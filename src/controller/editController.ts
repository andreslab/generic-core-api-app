import Jimp from 'jimp';
import fs from 'fs';
import { isMissingDeclaration } from 'typescript';

class editController {
    path = './uploads/cheque.jpg';
    pathEdit= './edit';

    public processImage(){
        if (this.createPath()){
            Jimp.read(this.path)
            .then(img => {
                return this.cropNameOwner(img);
            })
            .catch(err => {
                console.error(err);
            });

            Jimp.read(this.path)
            .then(img => {
               return this.cropNameClient(img);
            })
            .catch(err => {
                console.error(err);
            });

            Jimp.read(this.path)
            .then(img => {
                return this.cropAmount(img);
            })
            .catch(err => {
                console.error(err);
            });

            Jimp.read(this.path)
            .then(img => {
                return this.cropSignature(img);
            })
            .catch(err => {
                console.error(err);
            });
        }
    }

    public createPath(): boolean{
        
        if (!fs.existsSync(this.pathEdit)){
            fs.mkdir(this.pathEdit, (error) => {
                if (error) {
                 console.trace('Error creating directory.', error);
                 return false;
                }else {
                    return true;
                }
            });
        }else{
            return true;
        }
        return false;
    }

    public cropNameClient(img: Jimp):Jimp{
        return img.greyscale().crop( 5, 50, 150, 100 ).write(this.pathEdit + '/nameClient' + new Date().toISOString() +'.jpg')
    }
    public cropNameOwner(img: Jimp):Jimp{
        return img.greyscale().crop( 5, 50, 150, 100 ).write(this.pathEdit + '/nameOwner' + new Date().toISOString() +'.jpg')
    }
    public cropAmount(img: Jimp):Jimp{
        return img.greyscale().crop( 5, 50, 150, 100 ).write(this.pathEdit + '/amount' + new Date().toISOString() +'.jpg')
    }
    public cropSignature(img: Jimp):Jimp{
        return img.greyscale().crop( 5, 50, 150, 100 ).write(this.pathEdit + '/signature' + new Date().toISOString() +'.jpg')
    }
}

export const EditController = new editController();