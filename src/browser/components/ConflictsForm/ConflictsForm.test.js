import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import chai, { expect, assert } from 'chai'
import { translate as t } from 'browser/containers/Translator'
import { ConflictsForm } from 'browser/components/ConflictsForm'
chai.should()
chai.use(chaiEnzyme())

describe('<ConflictsForm />', () => {

  const props = {}
  const wrapper = shallow(<ConflictsForm {...props} />)

  it('has <div>', () => {
    const el = wrapper.find('div')
    expect(el).to.have.length(1)
    expect(el).to.have.className('ConflictsForm')
  })

  it('failes the test', () => {
    assert(false)
  })

})