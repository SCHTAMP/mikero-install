import * as core from '@actions/core';
import {mikeroInstall} from './setup-mikero'
import * as io from '@actions/io'


async function run() {
    try {
        let settings = core.getInput('build-path')
        core.info(`ENV: ${settings}`)
        await mikeroInstall;

        // let _path: string = await io.which('makepbo', true);
        //
        // core.info(`MakePbo: ${_path}`)

    } catch (e) {
        core.setFailed(e.message);
    }

}

run()