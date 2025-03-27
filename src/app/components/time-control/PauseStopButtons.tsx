import Button from '@/app/components/button/Button'
import Play from '@/app/assets/svg/play.svg'
import Pause from '@/app/assets/svg/pause.svg'
import Close from '@/app/assets/svg/close.svg'
import { useTranslations } from 'next-intl'

type PauseStopButtonsProps = {
  isPaused: boolean
  handlePause: () => void
  handleResume: () => void
  handleStop: () => void
}

export default function PauseStopButtons({
  handlePause,
  handleResume,
  handleStop,
  isPaused,
}: PauseStopButtonsProps) {
  const t = useTranslations()
  return (
    <div className={'flex gap-3 absolute bottom-3'}>
      {isPaused ? (
        <Button
          onClick={handleResume}
          buttonType={'primary'}
          className="flex items-center gap-3 justify-center"
        >
          <Play width={25} height={25} />
          {t('resumeButton')}
        </Button>
      ) : (
        <Button
          onClick={handlePause}
          buttonType={'secondary'}
          className="flex items-center gap-3 justify-center"
        >
          <Pause width={25} height={25} />
          {t('pauseButton')}
        </Button>
      )}

      <Button
        onClick={handleStop}
        buttonType={'secondary'}
        color={'red'}
        className="flex items-center gap-3 justify-center"
      >
        <Close width={25} height={25} />
        {t('stopButton')}
      </Button>
    </div>
  )
}
