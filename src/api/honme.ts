import { http } from '@/utils/http'
// 获取轮播图
type Banner = {
  id: string
  imgUrl: string
}
export const getBanners = () => {
  return http<Banner[]>({ url: '/home/banner' })
}
