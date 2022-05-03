// rawDatas
const rawDatas = {
  prizes: {
    prize1: {
      tab: "一",
      name: "自己拿也很重雷神之錘",
      number: 1,
      img: "prize1.jpg"
    },
    prize2: {
      tab: "二",
      name: "其實活動不方便鋼鐵人套裝",
      number: 1,
      img: "prize2.jpg"
    },
    prize3: {
      tab: "三",
      name: "蜘蛛人多功能萬用蜘蛛絲",
      number: 5,
      img: "prize3.jpg"
    },
    prize4: {
      tab: "四",
      name: "公益美國隊長猛男月曆",
      number: 5,
      img: "prize4.jpg"
    },
    prize5: {
      tab: "五",
      name: "男人算甚麼黑寡婦防身術課程",
      number: 4,
      img: "prize5.jpg"
    },
    prize6: {
      tab: "六",
      name: "誰能比我綠綠巨人出氣抱枕",
      number: 6,
      img: "prize6.jpg"
    },
    prize7: {
      tab: "七",
      name: "奇異博士時間管理術演講門票",
      number: 5,
      img: "prize7.jpg"
    },
    prize8: {
      tab: "八",
      name: "很帥但沒威力安全鷹眼弓箭",
      number: 1,
      img: "prize8.jpg"
    },
    prize9: {
      tab: "九",
      name: "size matter防疫蟻人面罩",
      number: 3,
      img: "prize9.jpg"
    },
    prize10: {
      tab: "十",
      name: "炫富用滅霸寶石手套",
      number: 1,
      img: "prize10.jpg"
    },
    prize11: {
      tab: " ±",
      name: "瓦甘達黑科技小物盲盒",
      number: 2,
      img: "prize11.jpg"
    }
  }
}
// DOM選擇棄
const prizeWinnersListLeft = document.querySelector('#prize-winners-list-left')
const prizeWinnersListRight = document.querySelector('#prize-winners-list-right')
// View
const View = {
  // 中獎彩卷查詢頁面
  renderPrizeWinnerPage(datas, prizesRawDatas) {
    let rawLeftHTML = ''
    let rawRightHTML = ''
    for (let prizeID in prizesRawDatas) {
      if (prizeID === 'prize7') break
      rawLeftHTML += `
      <li class="mt-2" id="${prizeID}-winner">
        <h2>${prizesRawDatas[prizeID].name} ~ ${prizesRawDatas[prizeID].number}名</h2>
        <ul class="list-group list-group-horizontal">
      `
      if (datas[prizeID] && datas[prizeID].length > 0) {
        datas[prizeID].forEach(winner => {
          rawLeftHTML += `<li class="list-group-item list-group-item-info fs-4 fw-bold me-2">${winner}</li>`
        })
      }
      rawLeftHTML += `
        </ul>
      </li>
      `
    }
    for (let i = 7; i <= 11; i++) {
      const thePrize = `prize${i}`
      rawRightHTML += `
      <li class="mt-2" id="${thePrize}-winner">
        <h2>${prizesRawDatas[thePrize].name} ~ ${prizesRawDatas[thePrize].number}名</h2>
        <ul class="list-group list-group-horizontal">
      `
      if (datas[thePrize] && datas[thePrize].length > 0) {
        datas[thePrize].forEach(winner => {
          rawRightHTML += `<li class="list-group-item list-group-item-info fs-4 fw-bold me-2">${winner}</li>`
        })
      }
      rawRightHTML += `
        </ul>
      </li>
      `
    }
    prizeWinnersListLeft.innerHTML = rawLeftHTML
    prizeWinnersListRight.innerHTML = rawRightHTML
  }
}
// Control
const Control = {
  renderPrizeWinnerPage() {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem('lottoryResults')) || {}
    View.renderPrizeWinnerPage(dataFromLocalStorage, rawDatas.prizes)
  }
}
// Event Listener
document.querySelector('.delete-local-data').addEventListener('click', () => {
  localStorage.removeItem('lottoryResults')
  localStorage.removeItem('textareaKeep')

  Control.renderPrizeWinnerPage()
})

Control.renderPrizeWinnerPage()