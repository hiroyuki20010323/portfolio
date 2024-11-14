import { signInWithEmailAndPassword, signInWithPopup,GoogleAuthProvider } from 'firebase/auth';
import React from 'react'
import { auth, provider } from './firebaseConfig';
import { Link, useNavigate,  } from 'react-router-dom';
import { useAuthContext } from './AuthContext';


const Login = () => {
  const  navigate = useNavigate();
  const user = useAuthContext();
  console.log(user)
  const handleSubmit = (event:React.FormEvent<HTMLFormElement>)=> {
    event.preventDefault();
    // 通常はeventが発生した時に、デフォルトでページのリロードが行われるがそれを防ぐ。つまりリロードされない。
    // リロードと再レンダリングは違う、リロードはサーバーからすべてのデータを取得してページの生成を再実行するのに対して、再レンダリングは、reactのコンポーネントを再描画すると言う意味
    const {email, password} = event.target.elements;
    console.log(email.value,password.value)
    // TODO 後で確認
    signInWithEmailAndPassword(auth,email.value,password.value)
    navigate('/')
  }


  const handleGoogleLogin= async()=>{
    try{
      await signInWithPopup(auth,provider)

      navigate('/');
  }catch(error){
    console.log(error)
   }
  }

  return (
    <div>
      <h1>ログイン</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input name='email' type='email' placeholder='email'/>
        </div>
        <div>
          <label>パスワード</label>
          <input name="password" type='password' placeholder='password'/>
        </div>
        <div>
          <button>ログイン</button>
          <button onClick={handleGoogleLogin}>Googleでログイン </button>
        </div>
        
        <div>
          ユーザー登録は<Link to={'/signup'}>こちら</Link>
        </div>
      </form>
    
    </div>
  )
}

export default Login