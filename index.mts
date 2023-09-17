import VultrNode from '@vultr/vultr-node'
import 'dotenv/config'
import { Eta } from 'eta'
import fs from 'node:fs'
import path from 'node:path'
import tilde from 'expand-tilde'
import { error } from 'node:console'
import randomstring from 'randomstring'

const vultr = VultrNode.initialize({
    apiKey: process.env.VULTR_API_KEY
})

const eta = new Eta({
    views: 'script_templates',
    useWith: true,
    rmWhitespace: true,
    autoTrim: [false, false]
})

function getSSHKey(location: string | undefined): string | undefined {
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

// TODO: Strip comments before uploading
const ipxeScript: Buffer = Buffer.from(eta.render('default.ipxe', {
    SSH_KEY: getSSHKey(process.env.SSH_PUBLIC_KEY) ?? '',
    ALPINE_BRANCH: process.env.ALPINE_BRANCH ?? 'latest-stable',
    ALPINE_VERSION: process.env.ALPINE_VERSION ?? ''
}))

console.log("Uploading the following iPXE script:\n")
console.log(ipxeScript.toString() + "\n")

await vultr.startupScripts.createStartupScript({
    name: `hayaku-${ randomstring.generate({length: 5,})}`,
    type: 'pxe',
    script: ipxeScript.toString('base64'),
})

const ass = await vultr.startupScripts.listStartupScripts({})

console.log(ass)