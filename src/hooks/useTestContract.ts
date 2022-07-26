import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'

import TestAbi from '../abi/testAbi.json'

export function useTestContract() {
  return useContract({
    abi: TestAbi as Abi,
    address: '0x605ae4fab96f860623e521181c5b7d64c19e2e914cd73dd7048c6edceef470d',
  })
}