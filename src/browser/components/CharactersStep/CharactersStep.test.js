import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import chai, { expect, assert } from 'chai'
import { translate as t } from 'browser/containers/Translator'
import { CharactersStep } from 'browser/components/CharactersStep'
chai.should()
chai.use(chaiEnzyme())

describe('<CharactersStep />', () => {

  const props = {}
  const wrapper = shallow(<CharactersStep {...props} />)

  it('has <div>', () => {
    const el = wrapper.find('div')
    expect(el).to.have.length(1)
    expect(el).to.have.className('CharactersStep')
  })

  it('failes the test', () => {
    assert(false)
  })

})