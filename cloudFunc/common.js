const vm = require("vm");

module.exports = {
  buildFunc: function(ctx, body, args) {
    if (!body) return "";
    const code = `func = ${body}; promise = func(args, ctx);`;
    const sandbox = {
      ctx,
      args,
      promise: null,
      console: console
    };
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox);

    return sandbox;
  }
};
