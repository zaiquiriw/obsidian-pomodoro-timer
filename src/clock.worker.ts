let running: boolean = false
let start: number | undefined
let startTime: number | undefined
let interval: number
let prev: number | undefined
let lowFps: boolean = false

const tick = (t: number): void => {
    if (start === undefined) {
        start = t
        prev = t
    }

    interval += t - prev!

    if (running) {
        const elapsed = t - start
		if(lowFps) {
			if (interval >= 1000) {
				self.postMessage(startTime! + elapsed)
				interval = 0
			}
		} else {
			self.postMessage(startTime! + elapsed)
		}
        requestAnimationFrame(tick)
    }

    prev = t
}

self.onmessage = async ({ data }) => {
    if (data.start) {
		lowFps = data.lowFps
        if (!running) {
            running = true
            interval = 0
            startTime = new Date().getTime()
            requestAnimationFrame(tick)
        }
    } else {
        running = false
        start = undefined
        startTime = undefined
        prev = undefined
    }
}
