const jsc = require('jsverify');
const { processInputs, sendMessage } = require('./utils');

describe('processInputs', () => {
  it('should return with proper input', () => {
    expect(processInputs('tell @kate something')).toEqual({
      type: 'tell',
      user: '@kate',
      text: 'something'
    })
  })
  it('should handle any length of `text`', () => {
    const stringGenerator = jsc.suchthat(jsc.asciistring, a => !a.includes('@') && a.length>1)

    jsc.assertForall(stringGenerator, s => {
      const result = processInputs(`assign @kate ${s}`)
      return !!result.text;
    }) 
  })
  it('should error if the order is wrong', () => {
    expect(() => {
      console.log(processInputs('tell something @kate'))
    }).toThrow()
  })

  describe('user detection', () => {
    it('should error if the user is missing the @', () => {
      expect(() => {
        console.log(processInputs('tell something kate'))
      }).toThrow()
    });
    it('should error if there is more than one user', () => {
      expect(() => {
        console.log(processInputs('tell @something @kate'))
      }).toThrow()
    })
  })
})