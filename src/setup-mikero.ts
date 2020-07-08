import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import fs from 'fs'
import * as path from 'path';
import {formatWithOptions} from "util";


const IS_WINDOWS = process.platform === 'win32';
const url = 'https://github.com/Anrop/docker-mikero-tools/archive/0.5.50.tar.gz'
const MIKERO_CACHE_NAME = 'mikero-tools'


async function run() {
    try{
        if (IS_WINDOWS){
            core.setFailed('This can be used only for Linux');
        }


            core.info(`Dowloading MikeroTools ${url}`);
            let downloadPath = await tc.downloadTool(url);

            core.info(`Extracting MikeroTools ${downloadPath}`);
            let extPath: string = await tc.extractTar(downloadPath, path.join(__dirname, 'mikero_tools'))

            core.info(`MikeroTools Extract Path ${extPath}`);

            let finalPath: string = path.join(extPath, 'docker-mikero-tools-0.5.50')

            let binPath: string = path.join(finalPath, 'bin')
            let libPath: string = path.join(finalPath, 'lib')
            core.info(`Path Bin: ${binPath}`)
            core.info(`Path Lib: ${binPath}`)

            core.addPath(binPath);
            core.exportVariable('LD_LIBRARY_PATH', libPath);



        console.log('Successfully installed', 'Mikero Tools');

    } catch (e) {
        core.setFailed(e.message);
    }
}

run();