import {isAddress} from '@ethersproject/address'
import {Command} from '@oclif/core'

type ArrayElement<ArrayType extends readonly unknown[] | undefined> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

