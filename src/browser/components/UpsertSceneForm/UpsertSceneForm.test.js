import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import chai, { expect, assert } from 'chai'
import { translate as t } from 'browser/containers/Translator'
import { UpsertSceneForm } from 'browser/components/UpsertSceneForm'
chai.should()
chai.use(chaiEnzyme())

describe('<UpsertSceneForm />', () => {

  const props = {}
  const wrapper = shallow(<UpsertSceneForm {...props} />)

  it('has <div>', () => {
    const el = wrapper.find('div')
    expect(el).to.have.length(1)
    expect(el).to.have.className('UpsertSceneForm')
  })

  it('failes the test', () => {
    assert(false)
  })

})