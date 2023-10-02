import 'dotenv/config'
import randomstring from 'randomstring'
import * as commander from 'commander'
import { vultr } from './src/vultr.mjs'
import { getSSHKey } from './src/credentials.mjs'
import { eta } from './src/templating.mjs'
import * as objectScan from 'object-scan'

commander.program
    .option("--instance")
    .option("--script")
    .option("--list-instances")
    .option("--list-scripts")

commander.program.parse()

const options = commander.program.opts()

// TODO: Strip comments before uploading
if (options.script) {
    const ipxeScript: Buffer = Buffer.from(eta.render('default.ipxe', {
        SSH_KEY: getSSHKey(process.env.SSH_PUBLIC_KEY) ?? '',
        ALPINE_BRANCH: process.env.ALPINE_BRANCH ?? 'latest-stable',
        ALPINE_VERSION: process.env.ALPINE_VERSION ?? ''
    }))

    console.log("Uploading the following iPXE script:\n")
    console.log(ipxeScript.toString() + "\n")

    const scriptResponse = await vultr.startupScripts.createStartupScript({
        name: `hayaku-${randomstring.generate({length: 5,})}`,
        type: 'pxe',
        script: ipxeScript.toString('base64'),
    })
}

// TODO: Filter listPlans with objectScan
// objectScan.default('')

if (options.listInstances) console.log(await vultr.plans.listPlans({}))

if (options.instance) {
    const randName = randomstring.generate({length: 5,})
    const instanceResponse = await vultr.instances.createInstance({ 
        "region": "mel",
        "plan": "vc2-1c-1gb",
        "label": `hayaku-test-${randName}`,
        // TODO: Pull in script, vultr API is weird
        // "startup_id": scriptResponse.startup_script.id,
        // "iso_id": scriptResponse.startup_script.id,
        "hostname": `hayaku-test-${randName}`
    })

    console.log(instanceResponse)
}

if (options.listScripts) console.log(await vultr.startupScripts.listStartupScripts({}))