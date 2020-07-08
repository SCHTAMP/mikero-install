import * as core from '@actions/core'
import * as path from 'path'
// import * as glob from '@actions/glob'
import {IGitSettings} from './git-settings'

export function getInputs() {

    const result = ({} as unknown) as IGitSettings

    let githubWorkspacePath = process.env['GITHUB_WORKSPACE']
    if (!githubWorkspacePath) {
        throw new Error('GITHUB_WORKSPACE not defined')
    }
    githubWorkspacePath = path.resolve(githubWorkspacePath)
    core.debug(`GITHUB_WORKSPACE = '${githubWorkspacePath}'`)




    result.buildPath = core.getInput('build-path') || './build'
    result.buildPath = path.resolve(githubWorkspacePath, result.buildPath)
    core.debug(`buildPath = ${result.buildPath}`)
    if (
        !(result.buildPath + path.sep).startsWith(
            githubWorkspacePath + path.sep
        )
    ) {
        throw new Error(
            `Repository path '${result.buildPath}' is not under '${githubWorkspacePath}'`
        )
    }

    return result
}