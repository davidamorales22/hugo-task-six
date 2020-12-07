import React from 'react'

export default function useController () {
  const [circles, setCircles] = React.useState([])
  const [history, setHistory] = React.useState([])
  const [current, setCurrent] = React.useState(0)
  const [open, setOpen] = React.useState(false)
  const [diameter, setDiameter] = React.useState(0)
  const [selection, setSelection] = React.useState(null)
  const resizeCanvas = () => {
    const container = window.document.getElementById('task-canvas-container')
    const canvas = window.document.getElementById('task-canvas')

    canvas.width = container.offsetWidth
    canvas.height = container.offsetHeight
  }
  React.useEffect(() => {
    window.addEventListener('resize', resizeCanvas, false)
    resizeCanvas()
  }, [])

  // refresh all circles
  const reDraw = () => {
    const canvas = window.document.getElementById('task-canvas')
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
    circles.forEach((circle, index) => {
      if (index === selection?.counter) circle.ctx.fillStyle = '#333'
      else ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI)
      ctx.fill()
      ctx.stroke()
    })
  }

  // click into canvas
  const handleClick = event => {
    const canvas = window.document.getElementById('task-canvas')
    const ctx = canvas.getContext('2d')
    const x = event.clientX - canvas.offsetLeft
    const y = event.clientY - canvas.offsetTop
    const r = 50 // default Radius

    // if click in a circle
    const filtered = circles.findIndex(circle => {
      const dx = circle.x - x
      const dy = circle.y - y
      return dx * dx + dy * dy < circle.r * circle.r
    })
    if (filtered > -1) {
      // select circle
      setSelection(circles[filtered])
      setDiameter(circles[filtered].r * 2)
    } else {
      // draw a circle
      ctx.beginPath()
      ctx.arc(x, y, r, 0, 2 * Math.PI)
      ctx.fillStyle = '#fff'
      ctx.fill()
      ctx.stroke()

      const circle = { counter: circles.length, x, y, r, ctx }
      setHistory(prev => [...prev, { type: 'draw', counter: circles.length, data: { ...circle } }])
      setCircles([...circles, { ...circle }])
    }
  }
  // slider update circles
  const handleChangeDiameter = (_event, value) => {
    const newCircles = circles
    const newRadius = Math.round(value / 2)

    if (newRadius > selection.r) {
      newCircles[selection.counter] = {
        ...newCircles[selection.counter],
        r: newRadius
      }
      // update circles list
      setCircles(newCircles)

      // update selection for refresh
      setSelection(prev => ({ ...prev, newR: newRadius }))
    }
    // diameter for label
    setDiameter(value)
  }
  const handleToggle = () => {
    setOpen(prev => !prev)
  }

  // accept changes into circle
  const handleAccept = () => {
    const newRadius = Math.round(diameter / 2)

    // insert into history
    setHistory(prev => [
      ...prev,
      {
        type: 'diameter',
        counter: selection.counter,
        old: selection.r,
        new: newRadius
      }
    ])

    // update selection
    setSelection(prev => ({ ...prev, r: newRadius }))

    // close dialog
    setOpen(false)
  }

  // cancel edit diameter
  const handleCancel = () => {
    // update circles
    const newCircles = circles
    newCircles[selection.counter] = { ...newCircles[selection.counter], r: selection.r }
    setCircles(newCircles)

    // undo selection change
    setSelection(prev => ({ ...prev, newR: prev.r }))

    // close dialog
    setOpen(false)
  }

  const handleUndo = () => {
    if (history.length > 0 && current >= 0) {
      const lastStep = history[current]
      const newCircles = [...circles]

      if (lastStep.type === 'draw')newCircles.splice(lastStep.counter, 1)

      if (lastStep.type === 'diameter')newCircles[lastStep.counter].r = lastStep.old

      setCircles(newCircles)
      setCurrent(prev => prev - 1)
    }
  }
  const handleRedo = () => {
    if (current + 1 < history.length) {
      const nextStep = history[current + 1]
      const newCircles = [...circles]

      if (nextStep.type === 'draw')newCircles.push(nextStep.data)

      if (nextStep.type === 'diameter')newCircles[nextStep.counter].r = nextStep.new

      setCircles(newCircles)
      setCurrent(prev => prev + 1)
    }
  }

  // update when selection change
  React.useEffect(
    () => {
      reDraw()
    },
    [selection, circles]
  )
  // update when history change
  React.useEffect(
    () => {
      setCurrent(history.length - 1)
    },
    [history]
  )

  return {
    handleRedo,
    handleUndo,
    handleCancel,
    handleAccept,
    handleToggle,
    handleChangeDiameter,
    handleClick,
    // state,
    circles,
    open,
    diameter,
    selection
  }
}
