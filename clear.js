/**
 * Created by ChengZheLin on 2019/5/20.
 * Features:
 */

'use strict'
const fs = require('fs')
const path = require('path')
const dist = path.resolve(__dirname, './dist')

;(function () {
  if (!fs.existsSync(dist)) {
    return false
  }

  function delDir (path) {
    let files = []
    if (fs.existsSync(path)) {
      files = fs.readdirSync(path)
      files.forEach((file, index) => {
        let curPath = path + '/' + file
        if (fs.statSync(curPath).isDirectory()) {
          delDir(curPath)
        } else {
          fs.unlinkSync(curPath)
        }
      })
      try{
        fs.rmdirSync(path)
      }catch(e) {
        console.log(`error :${e}`)
      }
    }
  }

  console.info('Clear dist...')
  delDir(dist)
})()
