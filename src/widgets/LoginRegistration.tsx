import { useState, useEffect } from 'react'
import { produce } from 'immer'
import { message } from 'antd'
import { Input } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import { usebegin } from '@/store/contextmodel'
import useTokenStore from '@/store/token'
import { useWindowWidth } from '@/store/utile'
import styled from '@emotion/styled'
import { Login, register, verifyCode } from '@/api/useApi'

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
  const setLogininformation = usebegin((state: any) => state.setLogininformation)
  const changeToken = useTokenStore(state => state.changeToken)

  const windowWidth = useWindowWidth() //监听页面宽度

  const [messageApi, contextHolder] = message.useMessage()
  const [data, setData] = useState({
    username: '', //账号
    password: '', //密码
    affirmpss: '', //确认密码
    imgcode: '', //图形验证码
    type: '登录'
  })
  const [verifyData, setVerifyData] = useState<any>({})

  useEffect(() => {
    init()
  }, [])
  function init() {
    verifyCode().then((res: any) => {
      setVerifyData(res.data[0])
    })
  }

  function goLogin() {
    //登录完成
    if (data.type == '登录') {
      //登录
      if (data.username == '' || data.password == '') {
        messageApi.open({
          type: 'warning',
          content: '请输入账号或密码'
        })
      } else {
        Login({
          User: data.username,
          Pass: data.password,
          VerifyCode: data.imgcode,
          Key: verifyData.key,
          CheckToken: verifyData.checkToken
        }).then((res: any) => {
          if (res.code == 200) {
            const obj = res.data[0]
            setLogininformation({
              username: obj.Device_name,
              money: obj.Device_money,
              ggtime: obj.Device_ggtime,
              gg: obj.Device_gg,
              sid: obj.Device_Sid,
              roles: obj.Device_Roles
            })

            changeToken(res.token)
            message.success('登录成功')
            setTimeout(() => {
              location.reload()
            }, 800)
          }
        })
      }
    } else {
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
      } else {
        register({
          User: data.username,
          Pass: data.password,
          Compass: data.password
        }).then((res: any) => {
          if (res.code == 200) {
            message.success('注册成功')
            switchover('登录')
          } else {
            message.warning(res.msg)
          }
        })
      }
    }
  }

  function switchover(val: string) {
    setData(
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
                setData(
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
                  setData(
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
                    onChange={(val: any) =>
                      setData(
                        produce(pre => {
                          pre.affirmpss = val.target.value
                        })
                      )
                    }
                  />
                </form>
              </div>
            </>
          )}
          {data.type == '登录' && (
            <div className="flex items-center mt-5">
              <Input
                size="lg"
                autoComplete=""
                placeholder="请输入验证码"
                value={data.imgcode}
                onChange={(val: any) =>
                  setData(
                    produce(pre => {
                      pre.imgcode = val.target.value
                    })
                  )
                }
              />
              {/* 验证码图片 */}
              <img
                className="h-[45px] rounded-lg ml-2 cursor-pointer"
                src={verifyData.img}
                onClick={init}
              />
            </div>
          )}

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
