import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'

import TestAbi from '../abi/testAbi.json'

export function useTestContract() {
  return useContract({
    abi: TestAbi as Abi,
    address: '0x4ce0ec61da6c8e03c186a49e8b35a6448c2486f15385969e7bf4563eed9bab9',
  })
}