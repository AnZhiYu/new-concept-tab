import { useState } from "react"

function IndexPopup() {
  const [data, setData] = useState("")


  return (
    <div
      style={{
        padding: 16
      }}>
      <a href="/tabs/page.html" target="_blank">
        View Docs
      </a>
    </div>
  )
}

export default IndexPopup
