interface IProps {
  dialogVisible: boolean
}

function NavDialog(props: IProps) {
  let { dialogVisible = false } = props
  return (
    <div
      className={
        dialogVisible ? 'nav-dialog dialog-show' : 'nav-dialog dialog-hide'
      }
    >
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
  )
}

export default NavDialog
