const {Etudiant} = require("../models/index")

exports.getEtudiant = async function(req, res) {
   
      Etudiant.findAll()
        .then((result) => {
          res.status(200).json(result)
        })
        .catch(err => {
          res.status.send(err)
        })
}

exports.createEtudiant = (request, response) => {
    const { nom, bourse } = request.body
  
   
    console.log("body",request.body)
    Etudiant.create(request.body)
      .then(() => {
        response.status(201).send("Add successfully")
      })
      .catch(err => {
        response.status(500).send(err)
      })
}

exports.getEtudiantById = (request, response) => {
    const id = parseInt(request.params.id)
    console.log("id",id)
  
    try {
      Etudiant.findByPk(id)
      .then((results) => { 
          response.status(200).json(results)
      })
      .catch(err => { 
         response.status(500).send(err)
      })
      
  } catch (error) {
      res.status(400).json({
          status : "400",
          data : error
      })
      
  }
  }

  exports.updateEtudiant = (request, response) => {
    const { nom, bourse } = request.body
    const id = parseInt(request.params.id)
    console.log("id modif",id)


    try{
       Etudiant.update(request.body,{where : { id: id}})
        .then(result => {
          response.status(200).json(result)
        })
        .catch(err => {
          response.status(500).send(err)
        })
     

  }catch(err){
      return response.status(400).json({
          status:'400', 
          data : err.message
      })
  }
  }

  exports.deleteEtudiant = (request, response) => {
    const id = parseInt(request.params.id)
  
   
    Etudiant.destroy({where : { id : id}})
      .then(() => {
          response.status(200).send(`User deleted with ID: ${id}`)
      })
      .catch(err => {
        response.status(500).send(err)
      })
  }