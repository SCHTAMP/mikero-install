import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as path from 'path';
// import * as fs from  'fs';
let ncp = require('ncp').ncp;

const url = 'https://github.com/SCHTAMP/mikero-tools/archive/0.7.70.tar.gz'
const MIKERO_CACHE_NAME = 'mikero-tools'

// const copyRecursiveSync = function (src: string, dest: string) {
//     let exists = fs.existsSync(src);
//     let stats = exists ? fs.statSync(src): false;
//     let isDirectory = exists && stats ? stats.isDirectory() : false;
//     if (isDirectory) {
//         fs.mkdirSync(dest);
//         fs.readdirSync(src).forEach(function (childItemName) {
//             copyRecursiveSync(path.join(src, childItemName),
//                 path.join(dest, childItemName));
//         });
//     } else {
//         fs.copyFileSync(src, dest);
//     }
// };

export async function mikeroInstall() {
    try{
        ncp.limit = 16;
        if (process.platform === 'win32'){
            core.setFailed('This can be used only for Linux');
        }

            core.info(`Downloading MikeroTools ${url}`);
            let downloadPath = await tc.downloadTool(url);

            core.info(`Extracting MikeroTools ${downloadPath}`);
            let extPath: string = await tc.extractTar(downloadPath, path.join(__dirname, 'mikero_tools'))

            core.info(`MikeroTools Extract Path ${extPath}`);

            let finalPath: string = path.join(extPath, 'mikero-tools-0.7.70')

            ncp(path.join(finalPath, 'bin'), "/usr/local/bin", (err: any) =>
            {
                 if (err) {
                   return core.setFailed(err);
                 }
                 core.info('Copy BIN done!');
                });

            ncp(path.join(finalPath, 'lib'), "/usr/local/lib", (err: any) =>
            {
                 if (err) {
                   return core.setFailed(err);
                 }
                 core.info('Copy LIB done!');
            });
            // let binPath: string = path.join(finalPath, 'bin')
            // let libPath: string = path.join(finalPath, 'lib')
            //
            // core.addPath(binPath);
            // core.exportVariable('LD_LIBRARY_PATH', libPath);



        console.log('Successfully installed', MIKERO_CACHE_NAME);

    } catch (e) {
        core.setFailed(e.message);
    }
}

module.exports = {
    mikeroInstall
}