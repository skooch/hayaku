import VultrNode from '@vultr/vultr-node'

export const vultr = VultrNode.initialize({
    apiKey: process.env.VULTR_API_KEY
})