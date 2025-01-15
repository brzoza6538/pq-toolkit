'use client'

import { type FullACRTest } from '@/lib/schemas/experimentSetup'
import {
  type ACRResult,
  type PartialResult
} from '@/lib/schemas/experimentState'
import ACRPlayer from '../player/ACRPlayer'
import { getSampleUrl } from './common/utils'
import React, { useEffect, useState } from 'react'
import ACRSlider from '@/lib/components/experiments/common/ACRSlider'

const ACRTestComponent = ({
  testData,
  initialValues,
  experimentName,
  setAnswer,
  feedback
}: {
  testData: FullACRTest
  initialValues?: PartialResult<ACRResult>
  experimentName: string
  setAnswer: (result: PartialResult<ACRResult>) => void
  feedback: string
}): JSX.Element => {
  const { samples, question } = testData

  const prepareSamples = (): Array<{ sampleId: string; assetPath: string }> => {
    const samplesCombined = [...samples]
    samplesCombined.sort((a, b) =>
      testData.samplesShuffle.findIndex((v) => v === a.sampleId) >
      testData.samplesShuffle.findIndex((v) => v === b.sampleId)
        ? 1
        : -1
    )
    return samplesCombined
  }

  const [shuffledSamples] = useState<
    Array<{ sampleId: string; assetPath: string }>
  >(prepareSamples())

  const [ratings, setRatings] = useState<Map<string, number>>(() => {
    const savedRatings: Array<{ sampleId: string; score: number }> = []
    if (initialValues?.samplesScores != null) {
      savedRatings.push(...initialValues.samplesScores)
    }

    return shuffledSamples.reduce<Map<string, number>>((map, sample) => {
      const idx = savedRatings.findIndex((r) => r.sampleId === sample.sampleId)

      if (idx !== -1) {
        map.set(sample.sampleId, savedRatings[idx].score)
      } else {
        map.set(sample.sampleId, 3)
      }

      return map
    }, new Map<string, number>())
  })

  const selectedPlayerState = useState<number>(0)

  useEffect(() => {
    const result: ACRResult = {
      testNumber: testData.testNumber,
      samplesScores: testData.samples.map(({ sampleId }) => ({
        sampleId,
        score: ratings.get(sampleId) ?? -1
      })),
      feedback
    }

    setAnswer(result)
  }, [
    setAnswer,
    ratings,
    testData.testNumber,
    testData.samples,
    feedback
  ])

  const sliderSetRating = (value: number, sampleId: string): void => {
    setRatings((prevState) => {
      const newState = new Map(prevState)
      newState.set(sampleId, value)
      return newState
    })
  }

  const getACRscale = (): JSX.Element => {
    const scale = ['', ' ', 'Bad', 'Poor', 'Fair', 'Good', 'Excellent']

    return (
      <div className="h-full flex flex-col justify-between">
        {scale.reverse().map((label: string) => (
          <div
            className="text-right text-xl font-bold text-pink-500 dark:text-pink-600"
            key={label}
          >
            {label}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-700 rounded-xl p-8 shadow-2xl">
      <h2 className="relative text-center text-3xl md:text-2xl font-semibold -mb-2">
        ACR Test
      </h2>
      <div className="flex flex-col gap-md">
        <div className="flex flex-col gap-xs">
          <div className="text-center">{question}</div>
        </div>
        <ACRPlayer
          assets={[...shuffledSamples].reduce<
            Map<string, { url: string; footers: JSX.Element[] }>
          >((map, sample, idx) => {
            const sampleName = `Sample ${idx}`
            map.set(sampleName, {
              url: getSampleUrl(experimentName, sample.assetPath),
              footers: [
                <ACRSlider
                  key={`slider_${idx}`}
                  rating={ratings.get(sample.sampleId) ?? 3}
                  setRating={(value) => {
                    sliderSetRating(value, sample.sampleId)
                  }}
                />,
                <div
                  className="text-center text-xl font-bold text-pink-500 dark:text-pink-600"
                  key={`rating_${idx}`}
                >
                  {ratings.get(sample.sampleId) ?? 3}
                </div>
              ]
            })
            return map
          }, new Map<string, { url: string; footers: JSX.Element[] }>())}
          selectedPlayerState={selectedPlayerState}
          scale={getACRscale()}
        />
      </div>
    </div>
  )
}

export default ACRTestComponent
