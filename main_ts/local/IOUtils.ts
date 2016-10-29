import * as fs from 'fs';
import * as _ from 'lodash';
import Promise = require('bluebird');

exports.getFileNamesFromDirectory = (path: string) => {

    return new Promise((resolve, reject) => {
        fs.readdir(path, (err: NodeJS.ErrnoException, files: String[]) => {
            if(err){
                reject(err);
            } else {
                resolve(files);
            }
        });
    })

}