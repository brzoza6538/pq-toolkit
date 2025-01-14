import {
  TestTypeEnum,
  type ABTest,
  type ABXTest,
  type APETest,
  type BaseTest,
  type MUSHRATest,
  type ACRTest,
  ABTestSchema,
  ABXTestSchema,
  APETestSchema,
  MUSHRATestSchema,
  ACRTestSchema,
  type ExperimentSetup
} from './experimentSetup'

/**
 * Validates if test has valid schema base on its type
 * @param test any type of test
 * @returns \{ data: ABTest | ABXTest | MUSHRATest | ACRTest | APETest, validationError: null } if test is valid
 * @returns \{ data: null, validationError: string } if test is invalid
 */
export const validateTestSchema = (
  test: BaseTest
):
  | { data: ABTest | ABXTest | MUSHRATest | ACRTest | APETest; validationError: null }
  | { data: null; validationError: string } => {
  let schema
  switch (test.type) {
    case TestTypeEnum.enum.AB:
      schema = ABTestSchema
      break
    case TestTypeEnum.enum.ABX:
      schema = ABXTestSchema
      break
    case TestTypeEnum.enum.APE:
      schema = APETestSchema
      break
    case TestTypeEnum.enum.MUSHRA:
      schema = MUSHRATestSchema
      break
	case TestTypeEnum.enum.ACR:
	  schema = ACRTestSchema
	  break
  }

  const parsed = schema.safeParse(test)
  if (parsed.success) return { data: parsed.data, validationError: null }
  return { data: null, validationError: parsed.error.message }
}

/**
 * Lists all sample asset path from an experiment
 * @param experiment experiment setup
 * @returns array of unique sample asset path
 */
export const listExperimentSamples = (
  experiment: ExperimentSetup
): string[] => {
  const uniqueSamples = new Set<string>()
  experiment.tests.forEach((test) => {
    if (test.type === TestTypeEnum.enum.AB) {
      const castTest = test as ABTest
      castTest.samples.forEach((sample) => uniqueSamples.add(sample.assetPath))
    } else if (test.type === TestTypeEnum.enum.ABX) {
      const castTest = test as ABXTest
      castTest.samples.forEach((sample) => uniqueSamples.add(sample.assetPath))
    } else if (test.type === TestTypeEnum.enum.APE) {
      const castTest = test as APETest
      castTest.samples.forEach((sample) => uniqueSamples.add(sample.assetPath))
    } else if (test.type === TestTypeEnum.enum.MUSHRA) {
      const castTest = test as MUSHRATest
      castTest.samples.forEach((sample) => uniqueSamples.add(sample.assetPath))
      castTest.anchors.forEach((sample) => uniqueSamples.add(sample.assetPath))
      uniqueSamples.add(castTest.reference.assetPath)
    } else if (test.type === TestTypeEnum.enum.ACR) {
      const castTest = test as ACRTest
      castTest.samples.forEach((sample) => uniqueSamples.add(sample.assetPath))
    }
  })

  return Array.from(uniqueSamples)
}
