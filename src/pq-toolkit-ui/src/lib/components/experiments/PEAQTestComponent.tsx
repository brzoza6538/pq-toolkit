'use client'

import { type FullPEAQTest } from '@/lib/schemas/experimentSetup'
import {
  type PEAQResult,
  type PartialResult
} from '@/lib/schemas/experimentState'
import PEAQPlayer from '../player/PEAQPlayer'
import { getSampleUrl } from './common/utils'
import React, { useEffect, useState } from 'react'
import PEAQSlider from '@/lib/components/experiments/common/PEAQSlider'

const PEAQTestComponent = ({
  testData,
  initialValues,
  experimentName,
  setAnswer,
  feedback
}: {
  testData: FullPEAQTest
  initialValues?: PartialResult<PEAQResult>
  experimentName: string
  setAnswer: (result: PartialResult<PEAQResult>) => void
  feedback: string
}): JSX.Element => {
  const { samples, question } = testData

  const [shuffledSamples] = useState<
    Array<{ sampleId: string; assetPath: string }>
  >(samples)

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
    const result: PEAQResult = {
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

  const getPEAQscale = (): JSX.Element => {
    const scale = [' ', ' ', 'Very annoying', 'Annoying', 'Slightly annoying', 'Perceptible, but not annoying', 'Imperceptible']

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
        PEAQ Test
      </h2>
      <div className="flex flex-col gap-md">
        <div className="flex flex-col gap-xs">
          <div className="text-center">{question}</div>
        </div>
        <PEAQPlayer
          assets={[...shuffledSamples].reduce<
            Map<string, { url: string; footers: JSX.Element[] }>
          >((map, sample, idx) => {
            const sampleName = `Sample ${idx}`
            map.set(sampleName, {
              url: getSampleUrl(experimentName, sample.assetPath),
              footers:
					[
                      <PEAQSlider
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
		  scale={getPEAQscale()}
        />
      </div>
    </div>
  )
}

export default PEAQTestComponent
