module.exports = {  
  attributes: {
    name: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    userName: {
      type: 'string'
    },
    password: {
      type: 'string'
    }   
  },
  index: [
    {
      ind:{userName:1},
      ops: {
        unique: true,
        required: true,
      }
    },
    {
      ind:{name:1, lastName:1},
      ops: {
        unique: true,
        w:1
      }
    },
    {
      ind:{password:1},
      ops: {
        required: true,
        w:1
      }
    }
  ]
};
