import express from 'express';
import {PrismaClient} from '@prisma/client';
import multer from 'multer';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();
const PORT = 3080;
const upload = multer({dest:'../../public/uploads'})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
  res.send('Hello from Express with TypeScript!!!!');
});

app.post('/api/saveProfile',upload.single('userIcon'),async(req,res)=>{
  try{
    const {userName} =req.body;
    const  userIcon = req.file
console.log(req.body)
    if(!userName || !userIcon){
       res.status(400).json({error:'userNameとuserIconは必須です'})
       return
    }

    const saveProfile =await prisma.users.create({
      data:{user_name:userName,icon_url:userIcon.path}
    })
  res.status(201).json({message:'保存成功',profile:saveProfile});
  }catch(error){
    console.log('データ保存エラー:',error);
     res.status(500).json({error:'サーバーエラー'});
  }
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
