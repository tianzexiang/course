import { getFileProps } from '@/api/ssr'
import { IGetFileContentResp, IResp } from '@/interfaces/response'
import { NavBar } from 'antd-mobile'
import FileSaveSvg from '../../assets/icons/file_save.svg'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import styles from './file.module.scss'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useFileActions } from '@/hooks/useFileActions'
import { filterHtml } from '@/utils/filterHtml'
import Head from 'next/head'

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = '' } = query
  const props = await getFileProps(id as string, req.headers.cookie)
  return props
}

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

function FileContent(props: IResp<IGetFileContentResp>) {
  const modules = {
    toolbar: [
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'link', 'clean'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  }
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
  ]

  const { data } = props
  const file = data!.fileContent[0]
  const [content, setContent] = useState(file.content)
  const router = useRouter()
  const { handleSaveFolderOrFile } = useFileActions({})

  const handleOnChange = (content: string) => {
    setContent(content)
  }
  const saveContent = async () => {
    const _content = filterHtml(content)
    await handleSaveFolderOrFile({
      id: file._id,
      content: _content,
    })
  }

  return (
    <div className={styles.fileWrapper}>
      <Head>
        <title>{file.title || 'note'} | NextNote</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <NavBar
        right={
          <i onClick={saveContent}>
            <FileSaveSvg className={styles.saveIcon} />
          </i>
        }
        onBack={() => router.back()}
      >
        {file.title}
      </NavBar>
      <QuillNoSSRWrapper
        value={content}
        onChange={(content: string) => handleOnChange(content)}
        className={styles.quill}
        modules={modules}
        formats={formats}
        theme="snow"
      />
    </div>
  )
}
export default FileContent
