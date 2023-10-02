import fs from 'node:fs'
import path from 'node:path'
import tilde from 'expand-tilde'
import { error } from 'node:console'

export function getSSHKey(location: string | undefined): string | undefined {
    if (location) {
        try {
            return fs.readFileSync(path.resolve(tilde(location)))
                .toString()
                .replace(/(\r\n|\n|\r)/gm,"")
        } catch {
            console.error("Couldn't load SSH key!")
            throw error()
        }
    } else return undefined
}