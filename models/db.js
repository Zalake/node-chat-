var oracledb = require('oracledb');
oracledb.autoCommit = true;
oracledb.createPool({
  user:"******",
  password: "*****",
  connectString: "*****",
  poolMax: 5,
  poolMin: 5,
  poolIncrement:0
  },function(err,pool){
   
    module.exports.pool = pool;
  });