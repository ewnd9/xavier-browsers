export function sync(fn) {
  return function(data, cb) {
    try {
      fn(data.args);
      cb(formatResponse(data.id, 'ok'));
    } catch (err) {
      cb(formatResponse(data.id, 'err'));
    }
  };
};

export function promise(promiseFn) {
  return function(data, cb) {
    promiseFn(data.args)
      .then(res => {
        cb(formatResponse(data.id, res));
      })
      .catch(err => {
        cb(formatResponse(data.id, 'err'));
      });
  };
};

function formatResponse(id, result) {
  return JSON.stringify({ id, result });
};
