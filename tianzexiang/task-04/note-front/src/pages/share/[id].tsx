import { getShareContentProps } from '@/api/ssr'
import {
  IGetSharedFileContentResp,
  IGetUserInfoResp,
  IResp,
} from '@/interfaces/response'
import { Divider } from 'antd-mobile'
import { GetServerSideProps } from 'next'
import styles from './share.id.module.scss'
import { EyeOutline } from 'antd-mobile-icons'
import { useRouter } from 'next/router'
import { getUserInfo } from '@/api/user'
import { EHttpStatusCode } from '@/enums/status'
import { EPagePath } from '@/enums/page'
import { filterHtml } from '@/utils/filterHtml'
import Head from 'next/head'

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = '' } = query
  const props = await getShareContentProps(id as string)
  // 检查该用户是否登录
  const res = await getUserInfo({
    cookie: req.headers.cookie ? req.headers.cookie : '',
  })
  if (res.status === EHttpStatusCode.UNAUTHORIZED && res.code === 20005) {
    return {
      props: {
        ...props.props,
        user: {
          isLogin: false,
        },
      },
    }
  } else {
    return {
      props: {
        ...props.props,
        user: {
          data: res.data,
          isLogin: true,
        },
      },
    }
  }
}

function ShareContent(
  props: IResp<IGetSharedFileContentResp> & {
    user: { isLogin: boolean; data?: IGetUserInfoResp }
  }
) {
  const { data, user } = props
  const file = data!.fileContent[0]
  const router = useRouter()
  const _content = filterHtml(file.shared_file.content)

  return (
    <div className={styles.shareWrapper}>
      <Head>
        <title>{file.shared_file.title || 'note'} | NextNote</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      {/* 文章头部 */}
      <header className={styles.header}>
        <span className={styles.banner}>NextNote</span>
        {user.isLogin ? (
          <div
            className={styles.loggedIn}
            onClick={() => router.push(EPagePath.ME)}
          >
            {user.data?.nickname.substring(0, 1) || 'user'}
          </div>
        ) : (
          <div
            className={styles.notLoggedIn}
            onClick={() => router.push(EPagePath.LOGIN)}
          >
            登录
          </div>
        )}
      </header>
      {/* 文章内容 */}
      <div className={styles.contentWrapper}>
        {/* 文章内容头部信息 */}
        {/* 标题 */}
        <div className={styles.contentTitle}>{file.shared_file.title}</div>
        <Divider />
        {/* 其他信息 */}
        <div className={styles.contentInfo}>
          <span className={styles.author}>作者：{file.user.nickname}</span>
          <span className={styles.views}>
            <EyeOutline className={styles.viewIcon} />
            <span>
              {file.views > 9999
                ? `${(file.views / 10000).toFixed(1)} w`
                : file.views}
            </span>
          </span>
        </div>
        {/* 具体内容 */}
        <div className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: _content }} />
        </div>
      </div>
    </div>
  )
}
export default ShareContent
