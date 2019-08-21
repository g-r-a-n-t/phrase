import Ipfs from 'ipfs'
import { useEffect, useState } from 'react'
import config from '../config'

let ipfs = null

/*
 * A quick demo using React hooks to create an ipfs instance.
 *
 * Hooks are brand new at the time of writing, and this pattern
 * is intended to show it is possible. I don't know if it is wise.
 *
 * Next steps would be to store the ipfs instance on the context
 * so use-ipfs calls can grab it from there rather than expecting
 * it to be passed in.
 */
export default function useIpfsFactory ({ commands }) {
  const [isIpfsReady, setIpfsReady] = useState(Boolean(ipfs))
  const [ipfsInitError, setIpfsInitError] = useState(null)

  useEffect(() => {
    async function startIpfs () {
      if (ipfs) {
        console.log('IPFS already started')
      } else if (window.ipfs && window.ipfs.enable) {
        console.log('Found window.ipfs')
        ipfs = await window.ipfs.enable({ commands })
      } else {
        try {
          console.time('IPFS Started')
          // all other config values are overwritten here
          // TODO: Merge config instead of overwriting
          ipfs = await Ipfs.create({config: config.ipfs})
          console.timeEnd('IPFS Started')
        } catch (error) {
          console.error('IPFS init error:', error)
          ipfs = null
          setIpfsInitError(error)
        }
      }

      setIpfsReady(Boolean(ipfs))
    }

    // The fn to useEffect should not return anything other than a cleanup fn,
    // So it cannot be marked async, which causes it to return a promise,
    // Hence we delegate to a async fn rather than making the param an async fn.
    startIpfs()
  }, [commands])


  return { ipfs, isIpfsReady, ipfsInitError }
}
