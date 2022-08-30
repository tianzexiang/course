import type { IThumbnail } from '../types.js'

interface IProps {
  thumbnail: IThumbnail
  key: string | number
}

function Thumbnail(props: IProps) {
  const { thumbnail } = props
  return (
    <li className="item">
      <div className="cover">
        <img className="img" src={thumbnail.cover} />
      </div>
      <div className="info">
        <a href="#" className="avatar-container">
          <img className="avatar" src={thumbnail.avatar}></img>
          <p>{thumbnail.name}</p>
        </a>
        <div className="statistics-container">
          <div className="likes-container">
            <img
              className="likes-icon"
              src="./images/icon-like.svg"
              width="14"
            />
            <p>{thumbnail.likes}</p>
          </div>
          <div className="views-container">
            <img
              className="views-icon"
              src="./images/icon-view.svg"
              width="14"
            />
            <p>{thumbnail.views}</p>
          </div>
        </div>
      </div>
    </li>
  )
}
export default Thumbnail
