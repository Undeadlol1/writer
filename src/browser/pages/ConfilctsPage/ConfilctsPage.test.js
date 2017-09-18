import React from 'react'
import sinon from 'sinon'
import chaiEnzyme from 'chai-enzyme'
import chai, { expect, assert } from 'chai'
import { shallow, mount, render } from 'enzyme'
import { ConfilctsPage } from 'browser/pages/ConfilctsPage'
import { translate } from 'browser/containers/Translator'
chai.should()
chai.use(chaiEnzyme())

describe('<ConfilctsPage />', () => {
  const props = {
                  loading: false,
                  location: {pathname: 'some'},
                }
  const wrapper = shallow(<ConfilctsPage {...props} />)

  it('has className and tagName', () => {
    expect(wrapper).to.have.className('ConfilctsPage')
    expect(wrapper.type().name).to.eq('PageWrapper')
  })

  it('has <Grid>', () => {
    expect(wrapper.find('Styled(Grid)')).to.have.length(1);
  })

  it('failes the test', () => {
    assert(false)
  })

})