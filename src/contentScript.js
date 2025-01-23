window.addEventListener('load', mount, {
  once: true,
})

const accountRegex = /(.*) \(.*\)|Account ID: (.*)/

async function mount() {
  let account = getAccount()
  let tries = 0

  while (!account && tries < 100) {
    tries++
    await new Promise(resolve => setTimeout(resolve, 100))
    account = getAccount()
  }

  if (!account) {
    console.error('Account not found')
    return
  }

  const titleElement = document.querySelector('title')
  if (!titleElement) {
    console.error('Title element not found')
    return
  }

  titleElement.innerText = `${account} - ${titleElement.innerText}`

}

function getAccount() {
  const ele = document.querySelector('[data-testid="awsc-account-info-tile"]>div>div>span')

  if (!ele)
    return undefined

  const text = ele.innerText

  return accountRegex.exec(text)?.[1]

}