import Selector from '@/app/components/selector/Selector'
import Image from 'next/image'
import { useLengthText } from '@/app/hooks/useLengthText'
import { lengthOptions } from '@/app/components/time-control/LengthSelector'

export const subdivisionOptions: number[] = [2, 3, 4]

type SubdivisionSelectorProps = {
  selectedSubdivisionsOption: number
  setSelectedSubdivisionsOption: (index: number) => void
  selectedLengthOption: number
}

export default function SubdivisionSelector({
  selectedSubdivisionsOption,
  setSelectedSubdivisionsOption,
  selectedLengthOption,
}: SubdivisionSelectorProps) {
  const lengthText = useLengthText()

  const options = subdivisionOptions.map((subdivision) => {
    return {
      label: (
        <div className="flex flex-col items-center gap-1 justify-center">
          <span className="flex gap-2">
            <Image
              src={`/circle-${subdivision}.svg`}
              alt={`${subdivision} subdivisions`}
              width={22}
              height={22}
            />
            {`${subdivision}`}
          </span>
          <span>{`${lengthText(lengthOptions[selectedLengthOption] / subdivision)}`}</span>
        </div>
      ),
      value: subdivision,
    }
  })

  return (
    <Selector
      options={options}
      selectedIndex={selectedSubdivisionsOption}
      setSelectedIndex={setSelectedSubdivisionsOption}
    />
  )
}
