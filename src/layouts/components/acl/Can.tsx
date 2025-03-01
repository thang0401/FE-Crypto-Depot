import { createContext } from 'react'
import { AnyAbility } from '@casl/ability'
import { createContextualCan } from '@casl/react'

export const AbilityContext = createContext<any>(undefined!)

export default createContextualCan(AbilityContext.Consumer)
