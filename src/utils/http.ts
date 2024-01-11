import { useMemberStore } from '@/stores'
import type { extend } from '@dcloudio/uni-app'

const baseURL = 'https://pcapi-xiaotuxian-front.itheima.net'
const httpItterceptor = {
  invoke(options: UniApp.RequestOptions) {
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 处理超时
    options.timeout = 10000
    // 处理请求头
    options.header = {
      'content-type': 'application/json',
      'source-client': 'miniapp',
      ...options.header,
    }
    const memberStore = useMemberStore()
    // 处理 token
    memberStore.profile?.token && (options.header.Authorization = memberStore.profile.token)
  },
}
uni.addInterceptor('request', httpItterceptor)
uni.addInterceptor('uploadFile', httpItterceptor)

interface Data<T> {
  code: string
  msg: string
  result: T
}

type AAA<T extends Data<any>> = {
  data: T
}

export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        if (res.statusCode <= 200 && res.statusCode < 300) {
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({ url: 'pages/login/login' })
        } else {
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || 'query error',
          })
        }
      },
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络出现问题，换个网络试试吧',
        })
        reject(err)
      },
    })
  })
}

export type AwaitReturnTypeResult<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R extends { result: infer Result }
    ? Result
    : never
  : never
