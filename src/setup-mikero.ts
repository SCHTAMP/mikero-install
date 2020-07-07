import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import fs from 'fs'
import * as path from 'path';


const IS_WINDOWS = process.platform === 'win32';
const url = 'https://mikero.bytex.digital/api/download?filename=depbo-tools-0.7.70-linux-64bit.tgz'
const MIKERO_CACHE_NAME = 'mikero-tools'


async function run() {
    try{
        if (IS_WINDOWS){
            core.setFailed('This can be used only for Linux');
        }
        let toolPath = tc.find(MIKERO_CACHE_NAME, '1');


        if (!toolPath) {
            console.log('Downloading MikeroTools', url);
            let downloadPath = await tc.downloadTool(url);

            console.log('Extracting MikeroTools', url);
            let extPath: string = await tc.extractTar(downloadPath)
            let binPath: string = path.join(extPath, 'bin')
            let libPath: string = path.join(extPath, 'lib')

            if (!(fs.existsSync(binPath) || fs.existsSync(libPath))) {
                core.setFailed('Missing path to lib or bin directory');
            }

            core.addPath(binPath);
            core.exportVariable('LD_LIBRARY_PATH', toolPath);

            console.log('Caching tools');
            let cachedDir = await tc.cacheDir(extPath, MIKERO_CACHE_NAME, '1');
            toolPath = cachedDir;
            } else {
            console.log('Using cached tool');
            }

            core.addPath(toolPath);

        console.log('Successfully installed', '1');

    } catch (e) {
        core.setFailed(e.message);
    }

}