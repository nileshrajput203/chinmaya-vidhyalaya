"use client"

import { useEffect, useRef } from "react"
import { useInView } from "motion/react"

import { TextRotate, TextRotateRef } from "@/components/ui/text-rotate"

const exampleImages = [
  {
    url: "https://cdn.21st.dev/assets/mirror/52/52b151d355aa4cb6cb37f97fbd8ec4220186496e0e2cb63975a2b7756f3430ff.jpg",
    author: "Branislav Rodman",
    link: "https://unsplash.com/photos/a-black-and-white-photo-of-a-woman-brushing-her-teeth-r1SjnJL5tf0",
    title: "A Black and White Photo of a Woman Brushing Her Teeth",
  },
  {
    url: "https://cdn.21st.dev/assets/mirror/63/63536c1429b0897bad2245e153f83b4cd5edb05295ced36f5abd5c42639b6f6e.jpg",
    link: "https://unsplash.com/photos/a-painting-of-a-palm-leaf-on-a-multicolored-background-AaNPwrSNOFE",
    title: "Neon Palm",
    author: "Tim Mossholder",
  },
  {
    url: "https://cdn.21st.dev/assets/mirror/e4/e4889c24cd905daec03b7e1e1b80272a5dc257bdde184b6ab490880302638213.jpg",
    link: "https://unsplash.com/photos/a-blurry-photo-of-a-crowd-of-people-UgbxzloNGsc",
    author: "ANDRII SOLOK",
    title: "A blurry photo of a crowd of people",
  },
  {
    url: "https://cdn.21st.dev/assets/mirror/ef/ef4b3850e919b354ceae8e2ee350f0ba264ee59636ac3dad6413c062baa18584.jpg",
    link: "https://unsplash.com/photos/rippling-crystal-blue-water-9-OCsKoyQlk",
    author: "Wesley Tingey",
    title: "Rippling Crystal Blue Water",
  },
  {
    url: "https://cdn.21st.dev/assets/mirror/0c/0cf551640ccf256e3b0ca6a86d1e35097ef7dadb74db3424380647192a30170d.jpg",
    link: "https://unsplash.com/de/fotos/mann-im-schwarzen-hemd-unter-blauem-himmel-m8RDNiuEXro",
    author: "Serhii Tyaglovsky",
    title: "Mann im schwarzen Hemd unter blauem Himmel",
  },
  {
    url: "https://cdn.21st.dev/assets/mirror/b8/b830e628d8435311cd2a2b055311f44c25684f94c2f7ee06c187f1e3ca24c37d.jpg",
    link: "https://unsplash.com/photos/a-woman-with-a-flower-crown-on-her-head-0S3muIttbsY",
    author: "Vladimir Yelizarov",
    title: "A women with a flower crown on her head",
  },
  {
    url: "https://cdn.21st.dev/assets/mirror/f6/f6c549ea344a0680070bb5afa17dadb44ad3108cf18d1ff2743881741fe8dba5.jpg",
    title: "A blurry photo of white flowers in a field",
    author: "Eugene Golovesov",
    link: "https://unsplash.com/photos/a-blurry-photo-of-white-flowers-in-a-field-6qbx0lzGPyc",
  },
  {
    url: "https://cdn.21st.dev/assets/mirror/de/de33e61d893c390086271e3ff0dbfbe8d6f5684f85909b0cda563ce3b3fcaa27.jpg",
    author: "Mathilde Langevin",
    link: "https://unsplash.com/photos/a-table-topped-with-two-wine-glasses-and-plates-Ig0gRAHspV0",
    title: "A table topped with two wine glasses and plates",
  },
]

function Item({
  index,
  image,
  link,
  onInView,
}: {
  index: number
  image: string
  link: string
  onInView: (inView: boolean) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    margin: "-45% 0px -45% 0px",
  })

  useEffect(() => {
    onInView(isInView)
  }, [isInView, onInView])

  return (
    <section
      ref={ref}
      key={index}
      className="h-full w-1/2 flex justify-center items-center snap-center"
    >
      <div className="w-16 h-16 sm:w-36 sm:h-36 md:w-40 md:h-40">
        <a href={link} target="_blank" rel="noreferrer">
          <img
            src={image}
            alt={`Example ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </a>
      </div>
    </section>
  )
}

export default function TextRotateDemo() {
  const textRotateRef = useRef<TextRotateRef>(null)
  const slicedImages = exampleImages.slice(1)

  const handleInView = (index: number, inView: boolean) => {
    if (inView && textRotateRef.current) {
      textRotateRef.current.jumpTo(index)
    }
  }

  return (
    <div className="w-full h-screen flex">
      <div className="w-full h-full relative">
        <div className="sticky top-0 h-screen w-full flex items-center justify-end bg-white dark:text-muted text-foreground">
          <div className="w-2/3">
            <TextRotate
              ref={textRotateRef}
              texts={slicedImages.map((image) => image.author)}
              mainClassName="text-sm sm:text-3xl md:text-4xl w-full justify-center flex pt-2"
              splitLevelClassName="overflow-hidden pb-2"
              staggerFrom={"first"}
              animatePresenceMode="wait"
              loop={false}
              auto={false}
              staggerDuration={0.005}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: "spring", duration: 0.6, bounce: 0 }}
            />
          </div>
        </div>
        <div className="absolute inset-0 overflow-auto snap-y snap-mandatory">
          {slicedImages.map((image, index) => (
            <Item
              key={index}
              index={index}
              image={image.url}
              link={image.link}
              onInView={(inView) => handleInView(index, inView)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
