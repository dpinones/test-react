import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'

import TestAbi from '../abi/testAbi.json'

export function useTestContract() {
  return useContract({
    abi: TestAbi as Abi,
    address: '0x6617a86c7fe8bd7f2cfcdcbf89f76cc6814ee007b968064d0c90e1d6e064370',
  })
}