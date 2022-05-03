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
  },
  colors: [
    'transparent', 'coral', 'cornflowerblue', 'yellow', 'plum', 'burlywood'
  ],
  tickets: []
}
// DOM selectors
// left panel
const currentWinTicket = document.querySelector('#winner-ticket-number span')
const prizeNavTab = document.querySelector('#nav-tab')
const prizeShow = document.querySelector('#prize-data-panel')
// right panel- the wheel
const theWheel = document.querySelector('.the-wheel')
const turnablePart = document.querySelector('.spin-wheel')
// right panel- ticket input
const ticketInputs = document.querySelector('#myTextarea textarea')
const ticketInputArea = document.querySelector('#myTextarea')

// Model
const Model = {
  ticketsOnWheel: [],
  currentPrize: '',
  prizeCounts: {
    prize1: 0,
    prize2: 0,
    prize3: 0,
    prize4: 0,
    prize5: 0,
    prize6: 0,
    prize7: 0,
    prize8: 0,
    prize9: 0,
    prize10: 0,
    prize11: 0,
  },
  winTicket: '',
  baseRotateDeg: 0,
  winLocation: 0
}

// View
const View = {
  showWinnerTicket(ticketNumber) {
    currentWinTicket.innerText = ticketNumber
  },
  showPrizeCounts(prizeCounts) {
    for(let prize in prizeCounts) {
      const dataPanel = document.querySelector(`.${prize}-count`)
      dataPanel.innerText = prizeCounts[prize]
    }
  },
  showCurrentPrize(currentPrize) {
    prizeShow.innerHTML = `
    <li>${currentPrize.name}</li>
    <li class="prize-picture p-2"><img src="${currentPrize.img}"></li>
    `
  },
  showTicketCounts(ticketsCount) {
    document.querySelector('.count-tickets h2').innerText = ticketsCount
  },
  renderPrizeNavTab(prizeRawDatas) {
    let rawHTML = ''
    for (let prize in prizeRawDatas) {
      rawHTML += `
      <button class="nav-link fs-6 fs-bold prize" id="${prize}" data-bs-toggle="tab" data-bs-target="#prize-data-panel"
        type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
        獎項${prizeRawDatas[prize].tab} <span>(</span><span class="${prize}-count">0</span><span>/${prizeRawDatas[prize].number})</span>
      </button>
      `
    }
    prizeNavTab.innerHTML = rawHTML
  },
  renderWheelDataPanel(tickets, colors) {
    const ticketCounts = tickets.length || 1
    const colorCounts = colors.length
    const eachDeg = 360 / ticketCounts
    const drawX = Number((Math.tan(eachDeg / 2 * Math.PI / 180) * 50).toFixed(2))
    const clipPath = eachDeg < 180 ? `polygon(0 50%, 100% ${50 - drawX}%, 100% ${50 + drawX}%)` : `polygon(0 0, 100% 0%, 100% 100%, 0 100%)`
    let rawHTML = ''
    for (let i = 0; i < ticketCounts; i++) {
      const location = eachDeg * i
      rawHTML += `
      <div class="ticket-in-wheel" style="background-color:${colors[i % colorCounts]};clip-path:${clipPath};transform:rotate(${location}deg);"><span>${tickets[i]}</span></div>
      `
    }
    turnablePart.innerHTML = rawHTML
  },
  rotateTheWheel(ticketCounts, winnerIndex, rotateDeg) {
    const eachDeg = 360 / ticketCounts
    const location = eachDeg * winnerIndex
    const rotate = rotateDeg + 3600 - location
    // const rotateDuring = Math.ceil(rotateDeg / 360)
    turnablePart.style.transform = `rotate(${rotate}deg)`
    turnablePart.style.transition = `transform 7s ease-in-out`
  }
}

// Control
const Control = {
  getDatasFromInputArea() {
    const datas = ticketInputs.value.split('\n') || []
    if (datas && datas.length !== 0) {
      Model.ticketsOnWheel = datas
      localStorage.setItem('textareaKeep', JSON.stringify(datas))
    } else {
      return alert('沒有彩卷資料喔！')
    }
  },
  putDatasToTextArea(datas) {
    let rawTextareaHTML = ''
    if (datas && datas.length >= 0) {
      datas.forEach(ticket => {
        rawTextareaHTML += `
${ticket}`
      })
      ticketInputs.value = rawTextareaHTML.slice(1)
    }
  },
  getDatasFromLocalStorage() {
    // 還沒抽的彩卷存檔
    const textareaKeeper = JSON.parse(localStorage.getItem('textareaKeep')) || []
    // 放入textArea
    this.putDatasToTextArea(textareaKeeper)
    // 放入Model.ticketsOnWheel
    Model.ticketsOnWheel = textareaKeeper
    
    // 抽過的彩卷存檔
    const lotteryResultKeeper = JSON.parse(localStorage.getItem('lottoryResults')) || {}
    // 放入Model.prizeCounts
    for(let prize in Model.prizeCounts) {
      const text = prize
      Model.prizeCounts[prize] = (lotteryResultKeeper[text]) ? lotteryResultKeeper[text].length : 0
    }
  },
  renderPrizeNavTabsPanel() {
    View.renderPrizeNavTab(rawDatas.prizes)
  },
  // 中獎彩卷顯示
  renderWinTicketPanel(ticketIndex) {
    if (ticketIndex >= 0) {
      Model.winTicket = Model.ticketsOnWheel.splice(ticketIndex, 1)[0]
      View.showWinnerTicket(Model.winTicket)
    }
  },
  renderPrizeCountNumber() {
    View.showPrizeCounts(Model.prizeCounts)
  },
  // 獎品展示區
  renderPrizePanel(prizeID) {
    Model.currentPrize = prizeID
    View.showCurrentPrize(rawDatas.prizes[prizeID])
  },
  // 獎品中獎彩卷數量
  renderPrizeTicketCountPanel() {
    View.showPrizeCounts(Model.prizeCounts)
  },
  // 轉盤彩卷置入
  renderWheelPanel() {
    if (Model.ticketsOnWheel.length > 0) {
      View.renderWheelDataPanel(Model.ticketsOnWheel, rawDatas.colors)
    } else {
      View.renderWheelDataPanel(['[空]'], rawDatas.colors)
    }
  },
  // 彩卷數量顯示
  renderTicketCountPanel() {
    View.showTicketCounts(Model.ticketsOnWheel.length)
  },
  // 抽獎轉盤旋轉事件
  rotateWheelPanel() {
    if (Model.currentPrize && Model.currentPrize !== '') {
      // 轉盤旋轉
      const ticketsCount = Model.ticketsOnWheel.length
      const winTicketIndex = Math.floor(Math.random() * ticketsCount)
      turnablePart.style.transform = `rotate(${Model.baseRotateDeg}deg)`
      View.rotateTheWheel(ticketsCount, winTicketIndex, Model.baseRotateDeg)
      Model.baseRotateDeg += 3600
      setTimeout(() => {
        // 轉完各種畫面變動
        Control.renderWinTicketPanel(winTicketIndex)
        Model.prizeCounts[Model.currentPrize] ++
        Control.renderPrizeCountNumber()
        View.showTicketCounts(Model.ticketsOnWheel.length)
        Control.renderWheelPanel()
        Control.putDatasToTextArea(Model.ticketsOnWheel)
        // textArea彩票更新存進local storage
        Control.getDatasFromInputArea()
        // lotteoryResults彩卷存進local storage
        const dataFromLocalStorage = JSON.parse(localStorage.getItem('lottoryResults')) || {}
        const currentPrize = Model.currentPrize
        if(!dataFromLocalStorage[currentPrize]) dataFromLocalStorage[currentPrize] = []
        dataFromLocalStorage[currentPrize].push(Model.winTicket)
        localStorage.setItem('lottoryResults', JSON.stringify(dataFromLocalStorage))
      }, 8000)
    } else {
      return alert(`還沒選獎品喔！`)
    }
  },
  renderInitialFullScreenPanel() {
    this.renderPrizeNavTabsPanel()
    this.getDatasFromLocalStorage()
    this.renderWheelPanel()
    this.renderTicketCountPanel()
    this.renderPrizeCountNumber()
  }
}

// Event Listeners
ticketInputArea.addEventListener('click', function manualInputOrDeleteTicket(event) {
  if (event.target.matches('.textarea-save')) {
    Control.getDatasFromInputArea()
    Control.renderWheelPanel()
    Control.renderTicketCountPanel()
  }
  
})
prizeNavTab.addEventListener('click', function choosePrize(event) {
  const target = event.target
  if (target.tagName === 'BUTTON') {
    Control.renderPrizePanel(target.id)
    
  }
})
turnablePart.addEventListener('click', function rotateTheWheel(event) {
  if (event.target.matches('.turnable-part')) {
    Control.rotateWheelPanel()
  }
})

// render原始畫面
Control.renderInitialFullScreenPanel()


