
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

// eslint-disable-next-line no-undef
describe('generator-marmot:app', () => {
  // eslint-disable-next-line no-undef
  beforeAll(() => helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
    name: 'marmot',
    verson: '0.0.1',
    description: 'test',
    author: 'AlfieriChou',
    email: 'alfierichou@gmail.com'
  }))

  // eslint-disable-next-line no-undef
  it('creates files', () => {
    assert.file(['marmot/package.json'])
  })
})
