import express from 'express';
import {PrismaClient} from '@prisma/client';
import cors from 'cors';
import path from 'path';
import  {S3Client} from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3'
import {v4 as uuidv4}  from 'uuid'
import serviceAccount from './fast-share-5189c-firebase-adminsdk-56qis-6fd2cb3c05.json'

// import methodOverride from 'method-override';

import admin, { messaging, ServiceAccount } from 'firebase-admin'
import { log } from 'console';




const prisma = new PrismaClient();
const app = express();
const PORT = 3080;





 admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
 })

// app.use(methodOverride('_method'));

const s3 = new S3Client({
  region: process.env.AWS_REGION || '',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME!,
    contentType:multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      const uniqueFileName = `${uuidv4()}-${file.originalname}`
      const filePath = `userIcon/${uniqueFileName}`
      cb(null, filePath)
    },
    
  })
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
  res.send('Hello Fast Share!!!!');
});


app.post('/auth/verify',async(req,res)=>{
  const authHeader = req.headers.authorization;
  const idToken = authHeader && authHeader.split('Bearer ')[1];
 
if(!idToken){
  res.status(400).json({message:'トークンがありません'});
  console.log('トークンがないよ')
  return
}

try{
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  res.status(200).send({message:'トークンが有効です',uid:decodedToken.uid})
}catch(e){
  res.status(401).send('無効なトークンです');
  console.log('無効なトークンだよ')
}

})
// メールアドレスとパスワード新規登録
app.post('/api/user',async(req,res)=>{
try{
  if(!req.body){
    console.log('データが存在しません')
    res.status(400).json({error:'ユーザーデータが存在しません。。。'})
  }

  const id = req.body.uid
  const userName = req.body.displayName
  const iconData = req.body.icon_url || req.body.photoURL

  const existingUser = await prisma.users.findUnique({
    where: { id },
  });

  if (existingUser) {
  res.status(200).json({ message: "ユーザーは既に存在します" });
  return
  }
  
  
  await prisma.users.create({
    data:{
      id,
      user_name:userName,
      icon_url:iconData
    }
  })
res.status(201).json({message:'ユーザーの登録に成功しました。'})

}catch(e){
  console.log('ユーザーデータの保存に失敗しました')
  res.status(500).json({error:'データの保存に失敗しました'})
}
})



app.post('/api/profile',upload.single('icon_url'),async(req,res)=>{
  try{
if(!req.file){
  console.log('ファイルがアップロードされていません')
  res.status(400).json({error: 'ファイルがアップロードされていません'})
  return
}


const userName = req.body.user_name


    // const iconKey = (req.file as any)?.key
const iconLocation = (req.file as any)?.location
   
// await prisma.users.create({
//   data:{
//     user_name:userName,
//     icon_url:iconLocation
//   }
// })

res.status(201).json({
  message:'アップロード成功',
})
  }catch(error){
    console.log('データ保存エラー:',error);
     res.status(500).json({error:'サーバーエラー'})
  }
})

// プロフィール情報取得
app.get('/api/profile',async(req,res)=>{
  try{
    const token = req.headers.authorization?.split('Bearer ')[1];
 if(!token){
  res.status(400).json({message:'許可されていないリクエストです。'})
  return
 }
 const decodedToken = await admin.auth().verifyIdToken(token);
 console.log(decodedToken)
const uid = decodedToken.uid
 const user = await prisma.users.findUnique({where:{id:uid}});
 if(!user){
  res.status(400).json({error:'ユーザー情報を取得できませんでした'});
  return 
 }
res.json({
  newUserName:user.user_name,
  fileUrl:user.icon_url,
  message:'取得成功'
});

  }
catch(error){
console.error('データ取得エラー',error)
res.status(500).json({error:'サーバーエラー'})
}
})

app.patch('/api/profile', upload.single('icon_url'), async (req, res) => {
  console.log('Body:', req.body); 
  console.log('File:', req.file || 'No file uploaded'); 
  try{
    const token = req.headers.authorization?.split('Bearer ')[1];
 if(!token){
  res.status(400).json({message:'許可されていないリクエストです。'})
  return
 }
 const decodedToken = await admin.auth().verifyIdToken(token);
 console.log(decodedToken)
const uid = decodedToken.uid


  
  const { user_name } = req.body;

    const updatedUser = await prisma.users.update({
      where: {id:uid},
      data: {
        ...(user_name && { user_name }),
        ...(req.file && { icon_url: (req.file as any)?.location }), 
      },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'ユーザーの更新に失敗しました。' });
  }
});

app.post('api/group',async(req,res)=>{
  try{
    console.log(req.body)
  }catch(error){
    res.json({
      message:'データが送信されていません'
    })
  }
})



app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
