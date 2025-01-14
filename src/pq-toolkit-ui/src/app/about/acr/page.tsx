'use client'
import Header from '@/lib/components/basic/header'
import ScrollToTopButton from '@/lib/components/basic/scrollToTopButton'

const AboutAcr = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-stone-900 text-black dark:text-neutral-200">
      <Header />
      <div className="relative flex flex-col h-full w-full items-center justify-center my-auto fadeInUp mt-10">
        <div className="relative text-center mb-md">
          <h1
            className="relative text-4xl md:text-6xl font-bold mt-1 md:mt-6 pb-1.5 pt-1.5 before:absolute before:inset-0 before:animate-typewriterACR before:bg-gray-100
            dark:before:bg-stone-900 after:absolute after:inset-0 after:w-[0.125em] after:animate-caretMUSHRA after:bg-black dark:after:bg-neutral-200"
          >
            ACR Testing
          </h1>
        </div>
        <div className="relative mb-md ml-7 md:ml-20 mr-7 md:mr-20 p-1 md:p-8 mt-1 md:mt-2">
          <h1 className="relative text-sm md:text-lg font-semibold">
		    ACR (Absolute Category Rating) is a widely used method 
			for assessing the quality of multimedia content. 
			It involves participants rating a single stimulus on a predefined scale, 
			making it straightforward yet effective for obtaining perceptual quality evaluations.
          </h1>
          <h2 className="relative text-xl md:text-3xl font-bold mt-6">
		    What is Absolute Category Rating?
          </h2>
          <h3 className="relative text-sm md:text-lg font-semibold mt-2">
		    ACR testing requires participants to independently evaluate a single multimedia sample 
			(e.g., audio, video) and rate its quality on a numerical or descriptive scale, such as 1 to 5 (Bad to Excellent). 
			Each sample is assessed without direct comparison to a reference or other samples.
		  </h3>
          <h4 className="relative text-xl md:text-3xl font-bold mt-6">
		    Advantages of ACR Testing
          </h4>
          <ol className="list-disc list-inside relative text-sm md:text-lg font-semibold mt-2">
            <li className="pl-4 mt-2">
              <a className="font-extrabold dark:font-black">
				Standarization:{' '}
			  </a>
			  Standardized, discrete (non-continuous) scale allows easier result analysis.
            </li>
            <li className="pl-4 mt-2">
              <a className="font-extrabold dark:font-black">
				Versatility:{' '}
			  </a>
			  Suitable for a variety of applications - is also often used in video and image comparison.
			  Could as well be used as a test without reavling the reference sample.
            </li>
          </ol>
          <h5 className="relative text-xl md:text-3xl font-bold mt-6">
		    Applications in Quality Testing
          </h5>
          <h5 className="relative text-sm md:text-lg font-semibold mt-2">
		    ACR is widely used in scenarios such as:
          </h5>
          <ol className="list-disc list-inside relative text-sm md:text-lg font-semibold mt-2">
            <li className="pl-4">
              <a className="font-extrabold dark:font-black">
				Multimedia Content Evaluation:{' '}
			  </a>
			  Assessing user-perceived quality of streaming content, including audio, video, and live broadcasts.
            </li>
            <li className="pl-4 mt-2">
              <a className="font-extrabold dark:font-black">
			    Product Testing:{' '}
			  </a>
			  Evaluating consumer satisfaction with devices like headphones, TVs, and cameras.
            </li>
			<li className="pl-4 mt-2">
			  <a className="font-extrabold dark:font-black">
				Algorithm Benchmarking:{' '}
			  </a>
			  Comparing the effectiveness of encoding, compression, and enhancement algorithms.
			</li>
			<li className="pl-4 mt-2">
              <a className="font-extrabold dark:font-black">
                AI Generated Voice Evaluation:{' '}
              </a>
              Assessing quality of AI generated voice is crucial for developing more precise methods.
            </li>
			
          </ol>
          <h6 className="relative text-sm md:text-lg font-semibold mt-4">
		  ACR testing is a fundamental tool for quality assessment in multimedia research. 
		  Its simplicity and scalability make it ideal for a range of applications
		  , from academic studies to product development. By leveraging ACR, 
		  developers and researchers can gain valuable insights into user preferences 
		  and improve multimedia quality.
          </h6>
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  )
}

export default AboutAcr
