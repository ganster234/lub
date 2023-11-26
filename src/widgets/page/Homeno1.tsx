import { useNavigate } from "react-router-dom"  //引入编程式路由跳转

export default function Home(){
    const navigate = useNavigate()
    return(
        <div onClick={()=>{
            navigate("/cs")
        }}>
            <p>home,</p><button>点击路由跳转</button>
        </div>
    )
}