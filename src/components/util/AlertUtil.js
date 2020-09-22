const alertErr = (msg) => {
    alert(msg)
}

const alertErrWithLine = (msg, line) => {
    alert(msg + "\n Line: " + line)
}

export default { alertErr, alertErrWithLine }