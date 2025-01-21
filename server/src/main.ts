import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import { v4 as uuidv4 } from "uuid";
import admin from "firebase-admin";


const prisma = new PrismaClient();
const app = express();
const PORT = 3080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// admin SDKの接続設定
admin.initializeApp({
	credential: admin.credential.cert({
		projectId: process.env.FIREBASE_PROJECT_ID,
		privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
		clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
	}),
});

// S3の接続
const s3 = new S3Client({
	region: process.env.AWS_REGION || "",
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
	},
});

// バケットに画像をアップロードするミドルウェアの処理
const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: process.env.S3_BUCKET_NAME!,
		contentType: multerS3.AUTO_CONTENT_TYPE,
		metadata: function (req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key: function (req, file, cb) {
			const uniqueFileName = `${uuidv4()}-${file.originalname}`;
      // TODOuserIconというパスに画像関係を全てアップロードしてしまっているため、あとでパスを切る
			const filePath = `userIcon/${uniqueFileName}`;
			cb(null, filePath);
		},
	}),
});



app.get("/", (req, res) => {
	res.status(200).send("Hello Fast Share!!!!");
});

// 認証トークンの検証
app.post("/auth/verify", async (req, res) => {
	const authHeader = req.headers.authorization;
	const idToken = authHeader && authHeader.split("Bearer ")[1];

	if (!idToken) {
		res.status(400).json({ message: "トークンがありません" });
		console.log("トークンがないよ");
		return;
	}

	try {
		const decodedToken = await admin.auth().verifyIdToken(idToken);
		res
			.status(200)
			.send({ message: "トークンが有効です", uid: decodedToken.uid });
	} catch (e) {
		res.status(401).send("無効なトークンです");
		console.log("無効なトークンだよ");
	}
});

// メールアドレスとパスワード新規登録
app.post("/api/user", async (req, res) => {
	try {
		if (!req.body) {
			console.log("データが存在しません");
			res.status(400).json({ error: "ユーザーデータが存在しません。。。" });
		}

		const id = req.body.uid;
		const userName = req.body.displayName;
		const iconData = req.body.icon_url || req.body.photoURL;

		const existingUser = await prisma.users.findUnique({
			where: { id },
		});

		if (existingUser) {
			res.status(200).json({ message: "ユーザーは既に存在します" });
			return;
		}

		await prisma.users.create({
			data: {
				id,
				user_name: userName,
				icon_url: iconData,
			},
		});
		res.status(201).json({ message: "ユーザーの登録に成功しました。" });
	} catch (e) {
		console.log("ユーザーデータの保存に失敗しました");
		res.status(500).json({ error: "データの保存に失敗しました" });
	}
});

// 以下のエンドポイントは使用しない。patchで代替できる
// app.post('/api/profile',upload.single('icon_url'),async(req,res)=>{
//   try{
// if(!req.file){
//   console.log('ファイルがアップロードされていません')
//   res.status(400).json({error: 'ファイルがアップロードされていません'})
//   return
// }

// const userName = req.body.user_name
// const iconKey = (req.file as any)?.key
// const iconLocation = (req.file as any)?.location

// await prisma.users.create({
//   data:{
//     user_name:userName,
//     icon_url:iconLocation
//   }
// })

// res.status(201).json({
//   message:'アップロード成功',
// })
//   }catch(error){
//     console.log('データ保存エラー:',error);
//      res.status(500).json({error:'サーバーエラー'})
//   }
// })

// プロフィール情報取得
app.get("/api/profile", async (req, res) => {
	try {
		const token = req.headers.authorization?.split("Bearer ")[1];
		if (!token) {
			res.status(400).json({ message: "許可されていないリクエストです。" });
			return;
		}
		const decodedToken = await admin.auth().verifyIdToken(token);
		console.log(decodedToken);
		const uid = decodedToken.uid;
		const user = await prisma.users.findUnique({ where: { id: uid } });
		if (!user) {
			res.status(400).json({ error: "ユーザー情報を取得できませんでした" });
			return;
		}
		res.json({
			newUserName: user.user_name,
			fileUrl: user.icon_url,
			message: "取得成功",
		});
	} catch (error) {
		console.error("データ取得エラー", error);
		res.status(500).json({ error: "サーバーエラー" });
	}
});

// プロフィール情報の更新
app.patch("/api/profile", upload.single("icon_url"), async (req, res) => {
	console.log("Body:", req.body);
	console.log("File:", req.file || "No file uploaded");
	try {
		const token = req.headers.authorization?.split("Bearer ")[1];
		if (!token) {
			res.status(400).json({ message: "許可されていないリクエストです。" });
			return;
		}
		const decodedToken = await admin.auth().verifyIdToken(token);
		console.log(decodedToken);
		const uid = decodedToken.uid;

		const { user_name } = req.body;

		const updatedUser = await prisma.users.update({
			where: { id: uid },
			data: {
				...(user_name && { user_name }),
				...(req.file && { icon_url: (req.file as any)?.location }),
			},
		});
		res.status(201).json(updatedUser);
	} catch (error) {
		console.error("Error updating user:", error);
		res.status(500).json({ error: "ユーザーの更新に失敗しました。" });
	}
});

// グループの作成
app.post("/api/group", upload.single("group_icon"), async (req, res) => {
	try {
		const groupIcon = (req.file as any)?.location;
		const group_name = req.body.group_name;
		const group_description = req.body.group_description;
		const newGroup = await prisma.groups.create({
			data: {
				group_name,
				group_description,
				group_icon: groupIcon,
			},
		});
		await prisma.participations.create({
			data: {
				id: uuidv4(),
				user_id: req.body.uid,
				group_id: newGroup.id,
			},
		});
		res.status(201).json({
			message: "グループの作成に成功しました。",
		});
	} catch (error) {
		res.json({
			message: "データが送信されていません",
		});
		console.log("データの処理に失敗");
	}
});

// グループ一覧取得
app.get("/api/group", async (req, res) => {
	try {
		const token = req.headers.authorization?.split("Bearer ")[1];
		if (!token) {
			res.status(400).json({ message: "許可されていないリクエストです。" });
			return;
		}
		const decodedToken = await admin.auth().verifyIdToken(token);
		console.log(decodedToken);
		const uid = decodedToken.uid;
		const participations = await prisma.participations.findMany({
			where: { user_id: uid },
			include: { group: true },
		});

		const groups = participations.map((participations) => participations.group);
		console.log(groups);
		res.status(201).json(groups);
	} catch (e) {
		res.status(500).json({
			message: "グループ情報を取得できませんでした。",
		});
		console.log(e);
	}
});

// グループを開く処理
app.post("/api/open-group", async (req, res) => {
	try {
		const token = req.headers.authorization?.split("Bearer ")[1];
		if (!token) {
			res.status(400).json({ message: "許可されていないリクエストです。" });
			return;
		}
		const decodedToken = await admin.auth().verifyIdToken(token);
		console.log(decodedToken);
		const user_id = decodedToken.uid;
		const { group_id } = req.body;
		//  下記すでにtrueの値をfalseに変える。これにより別のグループの開くボタンを押した時に現在開かれているグループをcloseする。
		await prisma.participations.updateMany({
			where: { user_id },
			data: { isActive: false },
		});
		await prisma.participations.updateMany({
			// 複合主キーで開くグループを一意に特的する。
			where: {
				AND: [{ user_id }, { group_id }],
			},
			data: { isActive: true },
		});
		res.status(201).json({ message: "グループを開きました！！" });
	} catch (e) {
		console.log("何らかのエラー", e);
		res.status(500).json({ message: "グループひらけませんでした。。。" });
	}
});

// グループのプロフィールを取得する
app.get("/api/open-group", async (req, res) => {
	try {
		const token = req.headers.authorization?.split("Bearer ")[1];
		if (!token) {
			res.status(400).json({ message: "許可されていないリクエストです。" });
			return;
		}
		const decodedToken = await admin.auth().verifyIdToken(token);
		console.log(decodedToken);
		const user_id = decodedToken.uid;
		const activeGroup = await prisma.participations.findFirst({
			where: {
				user_id,
				isActive: true,
			},
			include: { group: true },
		});
		res.status(201).json(activeGroup?.group);
	} catch (e) {
		console.log("グループのデータ取得できませんでした。。。", e);
		res.status(500).json("処理に失敗しました。");
	}
});

// グループのプロフィールを更新する処理
app.patch(
	"/api/group-profile",
	upload.single("group_icon"),
	async (req, res) => {
		try {
			const token = req.headers.authorization?.split("Bearer ")[1];

			if (!token) {
				res.status(400).json({ message: "許可されていないリクエストです。" });
				return;
			}

			const { group_name, group_description, groupId } = req.body;
			const groupIdInt = parseInt(groupId, 10);
			//  フロントからのFormDataは文字列でidが送信されてくるのでIntに変換する

			const updateGroup = await prisma.groups.update({
				where: { id: groupIdInt },
				data: {
					...(req.file && { group_icon: (req.file as any)?.location }),
					...(group_name && { group_name }),
					...(group_description && { group_description }),
				},
			});
			res.status(201).json(updateGroup);
			console.log(updateGroup);
		} catch (e) {
			console.error("Error updating user:", e);
			res
				.status(500)
				.json({ error: "グループプロフィールの更新に失敗しました。" });
		}
	},
);

// グループを削除する処理
app.delete("/api/group-profile", async (req, res) => {
	try {
		// カスケードを設定しようとしたが、なぜかDBの権限の問題でうまく実行できなかったので、先に中間テーブルのレコードを削除した。
		await prisma.participations.deleteMany({
			where: { group_id: req.body.groupId },
		});
		await prisma.groups.delete({
			where: { id: req.body.groupId },
		});
		res.status(200).json({ message: "グループが削除されました。" });
	} catch (e) {
		console.log("削除できなかったエラー", e);
		res
			.status(500)
			.json({ message: `サーバー側で削除がうまく実行できませんでした`, e });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
