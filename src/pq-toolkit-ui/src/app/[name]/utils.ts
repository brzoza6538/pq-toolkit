import { randomInt } from '@/core/utils/mathUtils'
import { shuffleArray } from '@/lib/components/experiments/common/utils'
import {
  type BaseTest,
  type ABXTest,
  type FullABXTest,
  type MUSHRATest,
  type FullMUSHRATest,
  type PEAQTest,
  type FullPEAQTest
} from '@/lib/schemas/experimentSetup'

export const fillTest = (test: BaseTest): BaseTest => {
  switch (test.type) {
    case 'ABX':
      return fillABXTest(test as ABXTest)
    case 'MUSHRA':
      return fillMUSHRATest(test as MUSHRATest)
	case 'PEAQ':
		return fillPEAQTest(test as PEAQTest)
  }

  return test
}

export const fillABXTest = (test: ABXTest): FullABXTest => {
  return {
    ...test,
    xSampleId:
      test.xSampleId ??
      test.samples[randomInt(0, test.samples.length - 1)].sampleId
  }
}

export const fillMUSHRATest = (test: MUSHRATest): FullMUSHRATest => {
  const { samples, reference, anchors } = test
  const samplesCombined = [...samples, ...anchors, reference]
  const samplesShuffle = shuffleArray(samplesCombined)

  return {
    ...test,
    samplesShuffle: samplesShuffle.map((sample) => sample.sampleId)
  }
}

export const fillPEAQTest = (test: PEAQTest): FullPEAQTest => {
	const { samples } = test
	const samplesCombined = [...samples]
	const samplesShuffle = shuffleArray(samplesCombined)
  
	return {
	  ...test,
	  samplesShuffle: samplesShuffle.map((sample) => sample.sampleId)
	}
  }
  