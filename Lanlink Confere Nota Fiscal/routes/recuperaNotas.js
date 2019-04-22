const env = require('../configs/env')
const sequelize = require('../configs/Sequelize')
const jscomum = require('../public/jsComum')
const rateio = []
exports.recuperaNota = async function (valor,sigfil,codsnf,numnfc, res) {
    sequelize.query("select CodCcu,sum(distinct VlrRat) vlrrat from " + env.database.table + " where NomEmp = :search and SigFil = :filial and codsnf = :codsnf and numnfc = :numnfc group by CodCcu",
    { replacements: { search: valor, filial: sigfil, codsnf: codsnf, numnfc: numnfc } }
    , { type: sequelize.QueryTypes.SELECT }
    ).then((rateios)=>{

      rateio[0] = jscomum.unicoItem(rateios[0])
      console.log(rateio[0])
    })
    console.log("teste de console "+rateio)
    sequelize.query("select isnull(codpro,codser)codpro,isnull(DesPro,desser)DesPro,isnull(cplipc,cplisc)cplipc,isnull(VlrBruSer,vlrbrupro)VlrBruSer,CodCcu,sum(VlrRat) vlrrat from " + env.database.table + " where NomEmp = :search and SigFil = :filial and codsnf = :codsnf and numnfc = :numnfc group by codpro,CodSer,DesPro,DesSer,cplipc,CplIsc,VlrBruSer,VlrBruPro,CodCcu",
      { replacements: { search: valor, filial: sigfil, codsnf: codsnf, numnfc: numnfc } }
      , { type: sequelize.QueryTypes.SELECT }
    ).then((notas) => {
      const nota = [[], []]
      for (var i = 0; i <= notas.length - 1; i++) {
        for (var j = 0; j <= notas[i].length - 1; j++) {
          nota[i][j] = {}
          nota[i][j].codpro = notas[i][j].codpro;
          nota[i][j].DesPro = notas[i][j].DesPro;
          nota[i][j].cplipc = notas[i][j].cplipc;
          nota[i][j].VlrBruSer = notas[i][j].VlrBruSer;
          nota[i][j].CodCcu = notas[i][j].CodCcu;
          nota[i][j].vlrrat = notas[i][j].vlrrat
        }
      }
      
      if(nota[0].length == 0){
        res.render('index3Visualizacao', { notas: null, rateios: null})  
      } else{
        res.render('index3Visualizacao', { notas: jscomum.unicoItem(nota[0]), rateios: rateio[0]})
      }
    })
  }
  