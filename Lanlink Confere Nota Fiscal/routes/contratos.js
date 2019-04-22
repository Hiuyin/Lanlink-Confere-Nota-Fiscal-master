const env = require('../configs/env')
const sequelize = require('../configs/Sequelize')
const jscomum = require('../public/jsComum')

exports.recebeArraySQL = function (valor, res) {
    sequelize.query("select row_number() over(order by q.Empresa,q.Filial,q.Fornecedor,q.serie,q.nota)as ID, q.Empresa, q.Filial, q.Fornecedor, q.nota, q.serie, q.datemi, q.datent from (SELECT distinct Nomemp as Empresa, SigFil as Filial,nomfor as Fornecedor,numnfc as nota,codsnf as serie, convert(varchar(10),datemi,103) datemi,convert(varchar(10),datent,103) datent FROM " + env.database.table + " where nomfor like :search)q",
      { replacements: { search: '%' + valor + '%' } }
      , { type: sequelize.QueryTypes.SELECT }
    ).then((resultado) => {
      const resultados = [[], []]
      for (var i = 0; i <= resultado.length - 1; i++) {
        for (var j = 0; j <= resultado[i].length - 1; j++) {
          resultados[i][j] = {}
          resultados[i][j].Id = resultado[i][j].ID
          resultados[i][j].Empresa = resultado[i][j].Empresa;
          resultados[i][j].Filial = resultado[i][j].Filial;
          resultados[i][j].Fornecedor = resultado[i][j].Fornecedor;
          resultados[i][j].Nota = resultado[i][j].nota;
          resultados[i][j].Serie = resultado[i][j].serie;
          resultados[i][j].datemi = resultado[i][j].datemi;
          resultados[i][j].datent = resultado[i][j].datent;
        }
      }
      res.render('index2Notas', { contratos: jscomum.unicoItem(resultados[0])  })
    })
  
  
  }