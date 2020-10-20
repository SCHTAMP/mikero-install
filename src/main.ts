import * as core from '@actions/core';
import {mikeroInstall} from './setup-mikero'
 import * as io from '@actions/io'
import * as fs from 'fs'
import * as inp from './inputs'
import * as exec from '@actions/exec'
import * as path from "path";



async function run() {
    try {
        const settings = inp.getInputs();
        core.info(`ENV: ${settings.buildPath}`)
        await mikeroInstall();
        await exec.exec("ldconfig");

        if (!await io.which('makepbo', true)){
            core.setFailed('Make Pbo not exists')
            return
        }

        const buildPath = settings.buildPath
        const directoryPath = settings.directoryPath

        if (!fs.existsSync(buildPath)) {
            core.setFailed('Build Path not exists')
            return
        }

        if (settings.directBuild){
            core.setFailed('Not implemented')
            return
        } else {
            fs.readdir(directoryPath, (err, files) => {
                if (err) {
                    core.setFailed('Error read directory')
                    return
                }
                files.forEach((file, index) => {
                    let filePath = path.join(directoryPath, file)

                    fs.stat(filePath, (error, stat) => {
                        if (error) {
                            console.error("Error stating file.", error);
                            return;
                        }

                        if (stat && stat.isDirectory()) {
                            let bPath : string = path.resolve(directoryPath, file)
                            let destPath : string = buildPath
                            core.debug(`CI args: makepbo ${bPath} ${destPath}`)
                            exec.exec('makepbo', ["-PAX=none", bPath, destPath]) // 0: Path to build 1: Where to put pbo
                                .catch(reason => {
                                    core.error(reason)
                                })
                        }
                    })
                })
            })
        }

    } catch (e) {
        core.setFailed(e.message);
    }
}

run()