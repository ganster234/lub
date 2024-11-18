import { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { usebegin } from '@/store/contextmodel'
import { Login, register } from '@/api/useApi'
import { produce } from 'immer'
import { message } from 'antd'
import { Input } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import useTokenStore from '@/store/token'
import { useWindowWidth } from '@/store/utile'

// 四号登录 （左边右边图片）
const Element = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  background-size: cover;

  /* justify-content: space-between; */
  .FromLayer {
    background-image: url('/12LoginBG.svg');
  }
  .codep {
    margin-top: 20px;
    p {
      margin-bottom: 10px;
      color: #646566;
    }
  }
  .LoginBox {
    .baidushowd {
      background-color: white;
      border-radius: 8px;
      width: 360px;
      box-sizing: border-box;
      padding: 25px;
      box-shadow: 0px 0px 20px 1px rgba(45, 140, 240, 0.3);
    }
    .chldbox {
      .linhgth {
        color: #323233;
      }
    }
  }
`

export default function LoginRegistration() {
  const windowWidth = useWindowWidth() //监听页面宽度
  const changeToken = useTokenStore(state => state.changeToken) //调用store
  const changeUser = useTokenStore(state => state.changeUserInfo) //调用

  const [messageApi, contextHolder] = message.useMessage()
  const videoDOm: any = useRef(null)
  const takestore: any = usebegin()

  const [data, setdata] = useState({
    username: '', //账号
    password: '', //密码
    affirmpss: '', //确认密码
    invitationCode: '', //邀请码
    imgcode: '', //图形验证码
    type: '登录'
  })
  useEffect(() => {
    if (takestore.disclosedBallot) {
      //记住账号密码
      setdata(
        produce(pre => {
          pre.username = takestore.curtain //账号
          pre.password = takestore.encipherment //密码
        })
      )
    } else {
      setdata(
        produce(pre => {
          pre.username = '' //账号
          pre.password = '' //密码
        })
      )
    }
    if (videoDOm.current) {
      videoDOm.current.play()
    }
  }, [])
  const goLogin = () => {
    //登录完成
    if (data.type == '登录') {
      //登录
      if (data.username == '' || data.password == '') {
        messageApi.open({
          type: 'warning',
          content: '请输入账号或密码'
        })
      } else {
        changeUser({
          username: '普通号'
        })
        changeToken('dc6e13b90b4bd1515923e1171100ea25')
        message.success('登录成功')
        location.reload()
        // Login({
        //   account: data.username,
        //   password: data.password,
        //   captcha: data.imgcode,
        //   keeplogin: 0,
        // }).then((res: any) => {
        //   console.log(res);
        //   if (res.code == 0) {
        //     takestore.setuser(res.data.userinfo);
        //     changeToken(res.data.userinfo.token);
        //     message.success("登录成功");
        //     location.reload();
        //     if (takestore.disclosedBallot) {
        //       //记住密码
        //       takestore.setcurtain(data.username);
        //       takestore.setencipherment(data.password);
        //     }
        //   } else {
        //     message.warning(res.msg);
        //   }
        // });
      }
    } else {
      const regex = /^(?=.*[a-z])(?=.*[A-Z]).{10,}$/
      if (data.username == '' || data.password == '') {
        messageApi.open({
          type: 'warning',
          content: '请输入注册账号或密码'
        })
      } else if (data.password !== data.affirmpss) {
        messageApi.open({
          type: 'warning',
          content: '两次密码不一致'
        })
      } else if (!regex.test(data.affirmpss)) {
        message.warning('密码至少10位，且必须包含大小写字母')
      } else if (data.invitationCode.length > 4 && data.invitationCode.length < 6) {
        message.warning('推广码至少4-8位')
      } else {
        register({
          account: data.username,
          password: data.password,
          password_confirm: data.password,
          invite_code: data.invitationCode
        }).then((res: any) => {
          console.log(res)
          if (res.code == 0) {
            message.success('注册成功')
            switchover('登录')
          } else {
            message.warning(res.msg)
          }
        })
      }
    }
    // //登录
  }
  const switchover = (val: string) => {
    setdata(
      produce(pre => {
        pre.type = val
      })
    )
  }
  return (
    <Element className={windowWidth < 700 ? ' bg-[#add3ff2c]' : ''}>
      {contextHolder}
      <div
        className={
          'flex LoginBox justify-center min-w-[300px] ' +
          (windowWidth < 700 ? 'w-[100%]' : 'w-[45%]')
        }
      >
        <div className={'chldbox  ' + (windowWidth < 700 ? 'baidushowd' : 'w-[470px] p-[30px]')}>
          <img className="w-full mb-6" src="/loginBgnav.png" alt="" />
          <div className="flex items-center gap-4 mb-[44px] text-[22px] font-bold">
            <h2
              className={`cursor-pointer text-[#092F65] ${
                data.type == '登录' ? '' : 'text-[20px] text-[#677187]'
              }`}
              onClick={() => switchover('登录')}
            >
              用户登录
            </h2>
            <h2
              className={`cursor-pointer text-[#092F65] ${
                data.type != '登录' ? '' : 'text-[20px] text-[#677187]'
              }`}
              onClick={() => switchover('注册')}
            >
              注册
            </h2>
          </div>
          <div className="codep">
            <div className="mb-2 ml-2 text-slate-600">账号</div>
            <Input
              size="lg"
              value={data.username}
              placeholder={`请输入${data.type}账号`}
              onChange={(val: any) => {
                setdata(
                  produce(pre => {
                    pre.username = val.target.value
                  })
                )
              }}
            />
          </div>
          <div className="codep">
            <div className="mb-2 ml-2 text-slate-600">密码</div>
            <form
              onSubmit={event => {
                event.preventDefault()
              }}
            >
              <Input
                size="lg"
                type="password"
                autoComplete=""
                value={data.password}
                placeholder={`请输入${data.type}密码`}
                onKeyDown={e => {
                  if (e.nativeEvent.keyCode == 13) {
                    goLogin()
                  }
                }}
                onChange={(val: any) => {
                  setdata(
                    produce(pre => {
                      pre.password = val.target.value
                    })
                  )
                }}
              />
            </form>
          </div>
          {data.type == '注册' && (
            <>
              <div className="codep">
                <form
                  onSubmit={event => {
                    event.preventDefault()
                  }}
                >
                  <Input
                    size="lg"
                    type="password"
                    autoComplete=""
                    value={data.affirmpss}
                    placeholder={`请再次输入${data.type}密码`}
                    onChange={(val: any) => {
                      setdata(
                        produce(pre => {
                          pre.affirmpss = val.target.value
                        })
                      )
                    }}
                  />
                </form>
              </div>
            </>
          )}
          <div className="flex items-center mt-4">
            <Input size="lg" placeholder="请输入验证码" />
            {/* 验证码图片 */}
            <div className="bg-orange-600 w-[100px] h-full">验证🐎</div>
          </div>
          <Button
            className={'rounded-[5px] w-full text-[16px] h-[50px] mt-[70px] ' + 'bg-[#695DFF]'}
            color={'primary'}
            onClick={goLogin}
          >
            {data.type}
          </Button>
        </div>
      </div>
      {windowWidth >= 700 && (
        <div
          style={{ backgroundImage: `url('/bgimg.png')` }}
          className="w-[55%] h-full flex justify-center items-center FromLayer"
        ></div>
      )}
    </Element>
  )
}
