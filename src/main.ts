import * as core from '@actions/core';
import {mikeroInstall} from './setup-mikero'
import * as io from '@actions/io'
import * as inp from './inputs'


async function run() {
    try {
        const settings = inp.getInputs();
        core.info(`ENV: ${settings.buildPath}`)
        await mikeroInstall();

        let _path: string = await io.which('makepbo', true);

        core.info(`MakePbo: ${_path}`)

    } catch (e) {
        core.setFailed(e.message);
    }

}

run()