import CMAssist from '../components/CMAssist'

const definedEx = []

let defineEx = (cmd, exHandle, desc = '', shortCmd) => {
  if (!cmd || !pi.isFunction(exHandle)) {
    return definedEx
  }

  let exBody = {
    cmd,
    exHandle,
    desc,
    shortCmd: shortCmd || cmd
  }

  CodeMirror.Vim.defineEx(exBody.cmd, exBody.shortCmd, (cm, params) => {
    params = Object.assign({
      args: [],
      argString: '',
      input: '',
      line: false,
      commandName: ''
    }, params)

    params.get = (index = 0, defaultValue) => {
      if (params.args && params.args.length > index) {
        return params.args[index]
      }

      return defaultValue
    }

    exBody.exHandle(params, cm)
  })

  definedEx.push(exBody)
}

class NMAssist extends CMAssist{

  constructor(instanceOfCodeMirror) {
    super(instanceOfCodeMirror);
  }

}

export default NMAssist
