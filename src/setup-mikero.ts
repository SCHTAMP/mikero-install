import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import fs from 'fs'
import * as path from 'path';
import {formatWithOptions} from "util";


const IS_WINDOWS = process.platform === 'win32';
const url = 'https://mikero.bytex.digital/api/download?filename=depbo-tools-0.7.70-linux-64bit.tgz'
const MIKERO_CACHE_NAME = 'mikero-tools'


async function run() {
    try{
        if (IS_WINDOWS){
            core.setFailed('This can be used only for Linux');
        }


            core.info(`Dowloading MikeroTools ${url}`);
            let downloadPath = await tc.downloadTool(url);

            core.info(`Extracting MikeroTools ${downloadPath}`);
            let extPath: string = await tc.extractTar(downloadPath)
            let binPath: string = path.join(extPath, 'bin')
            let libPath: string = path.join(extPath, 'lib')

            core.info(`MikeroTools ${extPath}`);

            fs.readdir(extPath,(err, files) => {
                core.info(`Files: ${files}`)
            })

            core.info(`Path Bin: ${binPath}`)


            core.addPath(binPath);
            core.exportVariable('LD_LIBRARY_PATH', libPath);



            // core.addPath(toolPath);

        console.log('Successfully installed', '1');

    } catch (e) {
        core.setFailed(e.message);
    }

}

run();