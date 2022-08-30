interface IProps {
  dialogVisible: boolean
  setDialogVisible(visible: boolean): void
}

function HomeHeader(props: IProps) {
  const { dialogVisible = false, setDialogVisible } = props
  return (
    <header className="site-header">
      {/* 移动端header */}
      <div className="mobile-container">
        <div className="icon-container">
          <img
            className={dialogVisible ? 'icon-menu display-none' : 'icon-menu'}
            src="./images/icon-menu.svg"
            width="18"
            onClick={() => setDialogVisible(true)}
          />
          <img
            className={dialogVisible ? 'icon-menu' : 'icon-menu display-none'}
            src="./images/icon-close.svg"
            width="24"
            onClick={() => setDialogVisible(false)}
          />
        </div>
        <div className="title-container">
          <a href="#">
            <img className="title" src="./images/logo-black.svg" width="76" />
          </a>
        </div>
        <div className="sign-container">
          <a className="sign" href="#">
            Sign in
          </a>
        </div>
      </div>

      {/* 桌面端header */}
      <div className="desktop-container">
        <div className="title-container">
          <a href="#">
            <img className="title" src="./images/logo-black.svg" width="76" />
          </a>
          <ul className="nav">
            <li className="item">
              <a href="#">Inspiration</a>
            </li>
            <li className="item">
              <a href="#">Find Work</a>
            </li>
            <li className="item">
              <a href="#">Learn Design</a>
            </li>
            <li className="item">
              <a href="#">Marketplace</a>
            </li>
            <li className="item">
              <a href="#">Hire Designers</a>
            </li>
          </ul>
        </div>
        <div className="action-container">
          <a className="sign-in" href="#">
            Sign in
          </a>
          <a className="sign-btn" href="#">
            Sign up
          </a>
        </div>
      </div>
    </header>
  )
}
export default HomeHeader
