import crypto from 'crypto'

// get salt
function getSalt (length: number): string {
  return crypto.randomBytes(length).toString('hex')
}

// get hmac pwd
function getHmacPWD (pwd: string, salt: string): string {
  return crypto.createHmac('sha1', salt).update(pwd).digest('hex')
}

// get uuid
function getUUId () {
  return crypto.randomUUID()
}

export { getSalt, getHmacPWD, getUUId }
