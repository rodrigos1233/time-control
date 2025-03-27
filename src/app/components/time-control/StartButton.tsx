import Button from '@/app/components/button/Button'
import Play from '@/app/assets/svg/play.svg'
import { useTranslations } from 'next-intl'

type StartButtonProps = {
  handleStart: () => void
}

export default function StartButton({ handleStart }: StartButtonProps) {
  const t = useTranslations()
  return (
    <Button
      onClick={handleStart}
      className="flex items-center gap-3 justify-center"
    >
      <Play width={25} height={25} />
      {t('startButton')}
    </Button>
  )
}
