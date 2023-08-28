import express from'express';
import { Sequelize, DataTypes, Model } from 'sequelize';

const app = express()

const  sequelize  = new Sequelize({
  dialect : 'postgres',
  host: 'localhost',
  database : 'fllow',
  username: 'postgres',
  password: '1555',
  logging:false
  
})

try {
  app.use(express.json())

  await sequelize.authenticate();
  console.log('connection soccessfully');

  const info = sequelize.define('info', {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    name:{
      type: DataTypes.CHAR(20),
      allowNull: false
    },
    age:{
      type:DataTypes.INTEGER,
      allowNull: false
    }
     
  },{
    freezeTableName: true
  })
  info.sync()

app.get('/info', async (req,res)=>{

  const data = await info.findAll()
 
  res.json(data)

})

app.get('/info/:id', async (req,res)=>{

  const data = await info.findOne({where:{id:req.params.id}})
 
  res.json(data)

})


  app.post('/add', async (req, res)=>{
  const data = await  info.build({
      name: req.body.name,
      age: req.body.age
     })
     console.log(data);
     await data.save()
     res.json(data)
  })


  app.put('/user/:id', async (req,res)=>{
    const data = await info.findOne({where:{id:req.params.id}})
    data.name = req.body.name,
    data.age = req.body.age
    await data.save()

    res.json(data)
  })

  app.delete('/users/:id', async (req,res)=>{
    const data = await info.destroy({where:{id:req.params.id}})


    res.json(data)
  })
} catch (error) {
  console.log(error);
  sequelize.close();
}







app.listen(5050, console.log('create servaer 5050'))


  


  
  



