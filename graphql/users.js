const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLInterfaceType,
  GraphQLInputObjectType
} = require("graphql");
const sqlQuery = require("../lib/sqlQuery");
const userDao = require("../dao/usersDao");

const User = new GraphQLObjectType({
  name: "User",
  description: "用户信息实体",
  fields: () => {
    return {
      id: { type: GraphQLInt },
      username: { type: GraphQLString },
      userage: { type: GraphQLInt },
      address: { type: GraphQLString },
      phone: { type: GraphQLString },
      password: { type: GraphQLString }
    };
  }
});

const Result = new GraphQLObjectType({
  name: "Result",
  description: "成功实体",
  fields: () => {
    return {
      code: { type: GraphQLInt }
    };
  }
});

// frontend post data {query: `{user(phone: "13612817761") { phone username userage }}`}

module.exports = {
  query: {
    user: {
      type: User,
      description: "根据phone查询单个用户",
      args: {
        phone: { type: GraphQLString }
      },
      resolve: async function(source, { phone }) {
        let res = await sqlQuery(userDao.queryByPhone, [phone]);
        delete res[0]["password"];

        return res[0];
      }
    },
    users: {
      type: new GraphQLList(User),
      description: "查询全部用户列表",
      resolve: async function() {
        return await sqlQuery(userDao.queryAll);
      }
    }
  },
  mutation: {
    addUser: {
      type: User,
      description: "添加用户",
      args: {
        username: { type: GraphQLString },
        userage: { type: GraphQLInt },
        address: { type: GraphQLString },
        phone: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve: async function(
        source,
        { username, userage, address, phone, password }
      ) {
        const res = await sqlQuery(userDao.insert, [
          username,
          userage,
          address,
          phone,
          password
        ]);
        return { id: res.insertId };
      }
    },
    updateUsername: {
      type: Result,
      description: "更新用户名",
      args: {
        username: { type: GraphQLString },
        phone: { type: GraphQLString }
      },
      resolve: async function(source, { username, phone }) {
        const res = await sqlQuery(userDao.updateUsername, [username, phone]);

        if (res.changedRows === 1) {
          return { code: 0 };
        }

        return { code: 1 };
      }
    }
  }
};
