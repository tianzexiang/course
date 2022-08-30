async function getData(url, options = {}) {
  try {
    const res = await fetch(url, options)
    return res.json()
  } catch (e) {
    return new Error(e)
  }
}


async function appendTemp() {
  const data = await getData("./task.json", {
    method: 'GET'
  })
  const listEl = document.querySelector(".thumbnail-list")
  let elArr = []
  for (let val of data) {
    const template =
      `
      <li class="item">
        <div class="cover">
          <img class="img" src="${val.cover}">
        </div>
        <div class="info">
          <a href="#" class="avatar-container">
            <img class="avatar" src="${val.avatar}"></img>
            <p>${val.name}</p>
          </a>
          <div class="statistics-container">
            <div class="likes-container">
              <img class="likes-icon" src="./images/icon-like.svg" width="14"></img>
              <p>${val.likes}</p>
            </div>
            <div class="views-container">
              <img class="views-icon" src="./images/icon-view.svg" width="14"></img>
              <p>${val.views}</p>
            </div>
          </div>
        </div>
      </li>
    `
    elArr.push(template)
  }
  const appendContent = elArr.join(' ')
  listEl.innerHTML = appendContent
}


const handleDialogChangeEvt = (status) => {
  return () => {
    const closeEl = document.querySelector('.close-icon')
    const menuEl = document.querySelector('.menu-icon')
    const dialogEl = document.querySelector('.nav-dialog')
    status.isShow = !status.isShow
    if (status.isShow) {
      closeEl.style.visibility = 'visible'
      menuEl.style.visibility = 'hidden'
      dialogEl.style.transform = 'translateX(0px)'
    } else {
      closeEl.style.visibility = 'hidden'
      menuEl.style.visibility = 'visible'
      dialogEl.style.transform = 'translateX(-200vw)'
    }
  }
}

const closeDialogEvt = (status) => {
  return () => {
    if (status.isShow) {
      const clientW = document.documentElement.clientWidth
      if(clientW >= 920) {
        const dialogEl = document.querySelector('.nav-dialog')
        dialogEl.style.transform = 'translateX(-200vw)'
        status.isShow = false
      }
    } else return
  }
}



const handleDialogChange = () => {
  let status = {isShow: false}
  return () => {
    const clickEl = document.querySelector('.icon-container')
    const docEl = document.documentElement
    clickEl.addEventListener('click', handleDialogChangeEvt(status))
    window.onresize = closeDialogEvt(status)
  }
}

const _handleDialogChange = handleDialogChange()


appendTemp()
_handleDialogChange()