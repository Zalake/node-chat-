var oracledb = require('oracledb');
oracledb.autoCommit = true;
oracledb.createPool({
  user:"shrishail_z",
  password: "thbs123",
  connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = orcl11g.thbs.india.com)(PORT = 1521))(CONNECT_DATA =(SID= ORAC11G)))",
  poolMax: 5,
  poolMin: 5,
  poolIncrement:0
  },function(err,pool){
   
    module.exports.pool = pool;
  });