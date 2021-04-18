'use strict' // 2021-04-18 00.49

const fs = require('fs')
const path = require('path')
const { xdDirScan } = require('./util/xdDirScan')
const { xdFsCopy } = require('./util/xdFsCopy')
const { xdPath } = require('./util/xdPath')
const Config = require('./Config')

module.exports = function tsk_copy_files (opts)
{
    const debug = process.argv.includes('-debug')
    const config = new Config(opts)
    if (debug) console.log({ config })
    const srcdirRel = xdPath.std(config.sourceDir)
    const srcdirAbs = xdPath.abs(config.sourceDir)
    if (debug) console.log({ srcdirRel, srcdirAbs })
    const srcs = xdDirScan(srcdirAbs, 'files').filter(config.filterFn)
    const dsts = []
    let copyN = 0
    let skipN = 0

    for (let i = 0; i < srcs.length; i++)
    {
        console.log(`${ i + 1 }/${ srcs.length }`)
        const srcRel = `${ srcdirRel }/${ srcs[i] }`
        const srcAbs = `${ srcdirAbs }/${ srcs[i] }`
        const dstRel = xdPath.std(config.dstFn(srcRel))
        const dstAbs = xdPath.abs(dstRel)
        if (config.verbose) console.log(`src: ${ srcRel }\ndst: ${ dstRel }`)
        if (debug) console.log({ srcRel, srcAbs, dstRel, dstAbs })
        if (dsts.includes(dstAbs)) throw `duplicate destination path`
        dsts.push(dstAbs)

        if (config.overwrite || !fs.existsSync(dstAbs))
        {
            xdFsCopy(srcAbs, dstAbs)
            copyN++
        }
        else
        {
            if (config.verbose) console.log(`* skipped *`)
            skipN++
        }
    }

    console.log(`\ncopied:  ${ copyN }`)
    if (skipN) console.log(`skipped: ${ skipN }`)
}

