import Head from 'next/head'
import { ReactNode } from 'react'
import NoteTabBar from './NoteTabBar'
import styles from './base-layout.module.scss'

interface IBaseLayout {
  title: string
  children: ReactNode
}

function BaseLayout(props: IBaseLayout) {
  const { title, children } = props
  return (
    <div className={styles.baseLayout}>
      <Head>
        <title>{title} | NextNote</title>
        <meta name="note-login" content="note" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className={styles.content}>{children}</main>
      <footer className={styles.footer}>
        <NoteTabBar />
      </footer>
    </div>
  )
}
export default BaseLayout
