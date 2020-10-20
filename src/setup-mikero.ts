import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as path from 'path';
import * as io from '@actions/io'


const url = 'https://github.com/SCHTAMP/mikero-tools/archive/0.7.70.tar.gz'
const MIKERO_CACHE_NAME = 'mikero-tools'


export async function mikeroInstall() {
    try{
        if (process.platform === 'win32'){
            core.setFailed('This can be used only for Linux');
        }

            core.info(`Downloading MikeroTools ${url}`);
            let downloadPath = await tc.downloadTool(url);

            core.info(`Extracting MikeroTools ${downloadPath}`);
            let extPath: string = await tc.extractTar(downloadPath, path.join(__dirname, 'mikero_tools'))

            core.info(`MikeroTools Extract Path ${extPath}`);

            let finalPath: string = path.join(extPath, 'mikero-tools-0.7.70')

            const options = { recursive: true, force: false }

            await io.cp(path.join(finalPath, "bin/"), '/usr/local/bin/', options);
            await io.cp(path.join(finalPath, "lib/"), '/usr/local/lib/', options);


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